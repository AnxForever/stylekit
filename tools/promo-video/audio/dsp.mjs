/**
 * The film's score, synthesised from scratch.
 *
 * Why not a library track: the whole point of this project is rhythm, and a
 * score that is generated from the same cue sheet as the picture cannot drift
 * by a single frame. Every sample below is original and royalty-free by
 * construction - no licence to clear, no attribution to carry.
 *
 * Signal chain: voices -> bus (sub / drums / music / fx) -> sidechain-free
 * master soft-clip -> normalise. Output is 48kHz stereo 16-bit WAV.
 *
 * Run: node video/scripts/make-audio.mjs   (see that file for the build step)
 */
export const SR = 48000;
export const BPM = 120;
export const SEC_PER_BEAT = 60 / BPM;

/** Total length in seconds; kept in sync with TOTAL_FRAMES / FPS. */
// 98 bars at 120 BPM = 196s, matching the film cue sheet exactly.
export const DURATION = 98 * 4 * SEC_PER_BEAT;

/* ------------------------------------------------------------------ */
/* Utilities                                                           */
/* ------------------------------------------------------------------ */

export const barToSec = (bar) => bar * 4 * SEC_PER_BEAT;
export const beatToSec = (beat) => beat * SEC_PER_BEAT;

/** Equal-temperament pitch from a MIDI note number. */
export const hz = (midi) => 440 * Math.pow(2, (midi - 69) / 12);

const clamp = (v, a = -1, b = 1) => Math.min(b, Math.max(a, v));

/** Deterministic noise so repeated builds produce identical audio. */
export const makeRng = (seed) => {
  let s = seed >>> 0;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };
};

export class Bus {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.buf = [new Float32Array(length), new Float32Array(length)];
  }

  /** Accumulate a mono voice into the bus at a sample offset, with pan -1..1. */
  add(offset, data, gain = 1, pan = 0) {
    const [L, R] = this.buf;
    // Constant-power pan: keeps perceived loudness stable as elements move.
    const theta = ((clamp(pan, -1, 1) + 1) * Math.PI) / 4;
    const gl = Math.cos(theta) * gain;
    const gr = Math.sin(theta) * gain;
    const start = Math.max(0, Math.floor(offset));
    const n = Math.min(data.length, this.length - start);
    for (let i = 0; i < n; i++) {
      const v = data[i];
      L[start + i] += v * gl;
      R[start + i] += v * gr;
    }
  }

  /** Mix another bus in at a gain. */
  mix(other, gain = 1) {
    for (let c = 0; c < 2; c++) {
      const a = this.buf[c];
      const b = other.buf[c];
      for (let i = 0; i < this.length; i++) a[i] += b[i] * gain;
    }
  }
}

/* ------------------------------------------------------------------ */
/* Filters & envelopes                                                 */
/* ------------------------------------------------------------------ */

/** One-pole low-pass. Cheaper than biquad and smooth enough for pads/noise. */
export const lowpass = (data, cutoff, sr = SR) => {
  const a = Math.exp((-2 * Math.PI * cutoff) / sr);
  let y = 0;
  for (let i = 0; i < data.length; i++) {
    y = (1 - a) * data[i] + a * y;
    data[i] = y;
  }
  return data;
};

/** One-pole high-pass, implemented as input minus low-passed input. */
export const highpass = (data, cutoff, sr = SR) => {
  const a = Math.exp((-2 * Math.PI * cutoff) / sr);
  let y = 0;
  for (let i = 0; i < data.length; i++) {
    y = (1 - a) * data[i] + a * y;
    data[i] -= y;
  }
  return data;
};

/** RBJ band-pass. Used for whooshes, risers and the "air" of impacts. */
export const bandpass = (data, center, q = 1, sr = SR) => {
  const w0 = (2 * Math.PI * center) / sr;
  const alpha = Math.sin(w0) / (2 * q);
  const b0 = alpha;
  const b1 = 0;
  const b2 = -alpha;
  const a0 = 1 + alpha;
  const a1 = -2 * Math.cos(w0);
  const a2 = 1 - alpha;
  let x1 = 0;
  let x2 = 0;
  let y1 = 0;
  let y2 = 0;
  for (let i = 0; i < data.length; i++) {
    const x0 = data[i];
    const y0 = (b0 * x0 + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2) / a0;
    data[i] = y0;
    x2 = x1;
    x1 = x0;
    y2 = y1;
    y1 = y0;
  }
  return data;
};

/** Exponential decay envelope value at sample i. */
export const decay = (i, sr, tau) => Math.exp(-i / (tau * sr));

/** Attack-then-release envelope, all times in seconds. */
export const adsr = (i, n, sr, a = 0.005, d = 0.1, s = 0.7, r = 0.3) => {
  const t = i / sr;
  const total = n / sr;
  const relStart = Math.max(a + d, total - r);
  const attack = a <= 0 ? 1 : Math.min(1, t / a);
  const dec = t <= a ? 1 : s + (1 - s) * Math.exp(-(t - a) / Math.max(0.001, d / 3));
  const release = t <= relStart ? 1 : Math.max(0, 1 - (t - relStart) / Math.max(0.001, r));
  return attack * dec * release;
};

/* ------------------------------------------------------------------ */
/* Instruments                                                         */
/* ------------------------------------------------------------------ */

/** Kick: pitch-swept sine with a click transient. The spine of the groove. */
export const kick = (sr = SR, dur = 0.6) => {
  const n = Math.floor(dur * sr);
  const out = new Float32Array(n);
  let phase = 0;
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    const f = 48 + 120 * Math.exp(-t * 34);
    phase += (2 * Math.PI * f) / sr;
    const body = Math.sin(phase) * Math.exp(-t * 7.5);
    const click = Math.exp(-t * 320) * 0.35;
    out[i] = Math.tanh((body + click) * 1.5) * 0.85;
  }
  return out;
};

/** Snare/clap: band-passed noise with a short pitched body. */
export const snare = (sr = SR, dur = 0.35, seed = 7) => {
  const n = Math.floor(dur * sr);
  const rng = makeRng(seed);
  const noise = new Float32Array(n);
  for (let i = 0; i < n; i++) noise[i] = rng() * 2 - 1;
  bandpass(noise, 1900, 0.9, sr);
  const body = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    body[i] = Math.sin(2 * Math.PI * 185 * t) * Math.exp(-t * 32) * 0.5;
    noise[i] *= Math.exp(-t * 16) * 0.9;
  }
  return noise.map((v, i) => Math.tanh((v + body[i]) * 1.6) * 0.8);
};

/** Hi-hat: high-passed noise, very short. */
export const hat = (sr = SR, dur = 0.09, open = false, seed = 11) => {
  const n = Math.floor(dur * sr);
  const rng = makeRng(seed);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) out[i] = rng() * 2 - 1;
  highpass(out, 7200, sr);
  const tau = open ? 26 : 70;
  for (let i = 0; i < n; i++) out[i] *= Math.exp(-(i / sr) * tau) * 0.55;
  return out;
};

/**
 * Pluck: a triangle-ish tone with a fast decay. Its odd harmonics give the
 * "curated" motif a slightly bell-like edge that survives heavy layering.
 */
export const pluck = (freq, sr = SR, dur = 1.6, bright = 1) => {
  const n = Math.floor(dur * sr);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    const env = Math.exp(-t * 4.2);
    let v = 0;
    v += Math.sin(2 * Math.PI * freq * t) * 1;
    v += Math.sin(2 * Math.PI * freq * 2 * t) * 0.32 * bright;
    v += Math.sin(2 * Math.PI * freq * 3 * t) * 0.17 * bright * Math.exp(-t * 3);
    v += Math.sin(2 * Math.PI * freq * 4.01 * t) * 0.09 * bright;
    out[i] = v * env * 0.42;
  }
  return out;
};

/**
 * Pad: detuned saw stack through a slow filter. Detune spread is deliberately
 * wide (+/-9 cents) - it is what stops a synthetic pad sounding like one.
 */
export const pad = (midi, dur, sr = SR, cutoff = 1400) => {
  const n = Math.floor(dur * sr);
  const out = new Float32Array(n);
  const voices = [-9, 0, 7.5].map((cents) => hz(midi) * Math.pow(2, cents / 1200));
  const phases = voices.map(() => 0);
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    let v = 0;
    for (let k = 0; k < voices.length; k++) {
      phases[k] += voices[k] / sr;
      if (phases[k] > 1) phases[k] -= 1;
      // Band-limited-ish saw: 6 harmonics is plenty under a filter.
      for (let h = 1; h <= 6; h++) v += Math.sin(2 * Math.PI * phases[k] * h) / h;
    }
    const env = Math.min(1, t / 0.6) * Math.min(1, Math.max(0, (dur - t) / 0.9));
    out[i] = (v / 9) * env;
  }
  return lowpass(out, cutoff, sr);
};

/** Sub bass: sine with a touch of saturation so it reads on laptop speakers. */
export const bass = (midi, dur, sr = SR) => {
  const n = Math.floor(dur * sr);
  const out = new Float32Array(n);
  const f = hz(midi);
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    const env = Math.min(1, t / 0.008) * Math.exp(-t * 1.6);
    const v = Math.sin(2 * Math.PI * f * t) + 0.25 * Math.sin(4 * Math.PI * f * t);
    out[i] = Math.tanh(v * 1.4) * env * 0.7;
  }
  return out;
};

/** Riser: noise swept upward through a resonant band-pass. */
export const riser = (dur, sr = SR, seed = 5) => {
  const n = Math.floor(dur * sr);
  const rng = makeRng(seed);
  const out = new Float32Array(n);
  const chunk = 512;
  for (let i = 0; i < n; i++) out[i] = rng() * 2 - 1;
  // Sweep the band-pass by processing overlapping chunks.
  const tmp = new Float32Array(n);
  for (let off = 0; off + chunk <= n; off += chunk / 2) {
    const seg = out.slice(off, Math.min(n, off + chunk * 2));
    const p = off / n;
    bandpass(seg, 320 + 6200 * p * p, 3.5, sr);
    for (let i = 0; i < seg.length; i++) tmp[off + i] += seg[i];
  }
  for (let i = 0; i < n; i++) {
    const p = i / n;
    tmp[i] *= Math.pow(p, 2.2) * 0.5;
  }
  return tmp;
};

/** Whoosh: noise with a fast bell-shaped amplitude, used on whip pans. */
export const whoosh = (dur = 0.5, sr = SR, seed = 3, center = 900) => {
  const n = Math.floor(dur * sr);
  const rng = makeRng(seed);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) out[i] = rng() * 2 - 1;
  bandpass(out, center, 1.2, sr);
  for (let i = 0; i < n; i++) {
    const p = i / n;
    out[i] *= Math.sin(Math.PI * Math.pow(p, 0.7)) ** 2 * 0.7;
  }
  return out;
};

/** Impact: a sub drop plus a bright transient. The "reveal" punctuation. */
export const impact = (dur = 2.4, sr = SR) => {
  const n = Math.floor(dur * sr);
  const out = new Float32Array(n);
  const rng = makeRng(17);
  let phase = 0;
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    const f = 34 + 60 * Math.exp(-t * 6);
    phase += (2 * Math.PI * f) / sr;
    const sub = Math.sin(phase) * Math.exp(-t * 2.1);
    const air = (rng() * 2 - 1) * Math.exp(-t * 9) * 0.22;
    out[i] = Math.tanh((sub + air) * 1.8) * 0.9;
  }
  return out;
};

/** Key click: 6ms of band-passed noise. Marks typed characters on screen. */
export const click = (sr = SR, freq = 2400, seed = 23) => {
  const n = Math.floor(0.02 * sr);
  const rng = makeRng(seed);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    out[i] = (rng() * 2 - 1) * Math.exp(-(i / sr) * 420) * 0.5;
  }
  bandpass(out, freq, 2.2, sr);
  return out;
};

/** UI pop: a short sine chirp for state changes and counter landings. */
export const pop = (freq = 880, sr = SR, dur = 0.14) => {
  const n = Math.floor(dur * sr);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    const f = freq * (1 + 0.35 * Math.exp(-t * 60));
    out[i] = Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 26) * 0.4;
  }
  return out;
};

/** Bell-ish tone for the outro. More partials, slower decay. */
export const bell = (freq, sr = SR, dur = 3.2) => {
  const n = Math.floor(dur * sr);
  const out = new Float32Array(n);
  const partials = [1, 2.01, 2.98, 4.02, 5.4];
  const gains = [1, 0.5, 0.3, 0.16, 0.09];
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    let v = 0;
    for (let k = 0; k < partials.length; k++) {
      v += Math.sin(2 * Math.PI * freq * partials[k] * t) * gains[k] * Math.exp(-t * (1.3 + k * 0.9));
    }
    out[i] = v * 0.3;
  }
  return out;
};

/* ------------------------------------------------------------------ */
/* Space                                                               */
/* ------------------------------------------------------------------ */

/**
 * Tiny Schroeder-ish reverb: four comb filters in parallel into two allpasses.
 * Not a convolution reverb, but it is deterministic, cheap, and gives pads a
 * room so the mix does not sound dry and glued to the front.
 */
export const reverb = (data, sr = SR, mix = 0.28, size = 1) => {
  const combs = [1687, 1601, 2053, 2251].map((d) => Math.round(d * size));
  const aps = [347, 113].map((d) => Math.round(d * size));
  const wet = new Float32Array(data.length);
  for (const d of combs) {
    const buf = new Float32Array(d);
    let idx = 0;
    const fb = 0.79;
    for (let i = 0; i < data.length; i++) {
      const y = buf[idx];
      buf[idx] = data[i] + y * fb;
      wet[i] += y * 0.25;
      idx = (idx + 1) % d;
    }
  }
  let sig = wet;
  for (const d of aps) {
    const buf = new Float32Array(d);
    let idx = 0;
    const out = new Float32Array(sig.length);
    for (let i = 0; i < sig.length; i++) {
      const b = buf[idx];
      const y = -sig[i] + b;
      buf[idx] = sig[i] + b * 0.5;
      out[i] = y;
      idx = (idx + 1) % d;
    }
    sig = out;
  }
  const result = new Float32Array(data.length);
  for (let i = 0; i < data.length; i++) result[i] = data[i] * (1 - mix) + sig[i] * mix;
  return result;
};