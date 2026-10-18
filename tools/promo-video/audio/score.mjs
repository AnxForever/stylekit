/**
 * The score, arranged against the same 98-bar cue sheet as the picture.
 *
 *   bars  0- 4  open     a tone and a heartbeat
 *   bars  4-12  slop     dread: maj7 colour, accelerating 16ths
 *   bars 12-19  turn     silence, one note, a riser
 *   bars 19-25  reveal   detonation, full band
 *   bars 25-55  styles   six 5-bar phrases, one per style
 *   bars 55-69  prompts  lighter, curious
 *   bars 69-81  access   mechanical and precise
 *   bars 81-93  features opening out
 *   bars 93-98  close    drums gone, one chord, a bell
 *
 * All synthesised: no samples, no licensing, no drift.
 */
import {
  Bus, SR, barToSec, beatToSec, hz, kick, snare, hat, pluck, pad, bass,
  riser, whoosh, impact, click, pop, bell, reverb, lowpass, DURATION,
} from "./dsp.mjs";

const at = (bar) => Math.round(barToSec(bar) * SR);
const beatAt = (beat) => Math.round(beatToSec(beat) * SR);

const D_MIN = { root: 38, triad: [62, 65, 69] };
const D_MAJ = { root: 38, triad: [62, 66, 69] };
const BB_MAJ = { root: 34, triad: [58, 62, 65] };
const F_MAJ = { root: 41, triad: [57, 60, 65] };
const A_MAJ = { root: 45, triad: [57, 61, 64] };
const PROG = [D_MAJ, BB_MAJ, F_MAJ, A_MAJ];

export const renderScore = () => {
  const out = new Bus("master", Math.ceil(DURATION * SR) + SR);
  const drums = new Bus("drums", out.length);
  const music = new Bus("music", out.length);
  const sub = new Bus("sub", out.length);
  const fx = new Bus("fx", out.length);

  const K = kick();
  const S = snare();
  const HC = hat(SR, 0.07, false, 11);
  const HO = hat(SR, 0.22, true, 12);

  // ---- 0-4 open ----
  music.add(0, reverb(pad(26, barToSec(4.2), SR, 300), SR, 0.35, 1.6), 0.26, 0);
  sub.add(0, lowpass(pad(26, barToSec(4.2), SR, 180), 140), 0.42, 0);
  for (let b = 0; b < 8; b++) {
    sub.add(beatAt(b), lowpass(pad(38, beatToSec(1.4), SR, 200), 180), 0.22, 0);
    if (b >= 4) music.add(beatAt(b), reverb(pluck(hz([62, 69, 65, 64][b % 4]), SR, 2.2, 0.7), SR, 0.3, 1.2), 0.34, 0);
  }

  // ---- 4-12 slop ----
  const nasty = [58, 62, 64, 66];
  for (let bar = 4; bar < 12; bar++) {
    const prog = bar % 2 === 0 ? D_MIN : F_MAJ;
    music.add(at(bar), reverb(pad(prog.root + 12, barToSec(1), SR, 900 + (bar - 4) * 220), SR, 0.24, 1.2), 0.28, 0);
    sub.add(at(bar), bass(prog.root, beatToSec(1.4), SR), 0.58, 0);
    sub.add(at(bar + 0.5), bass(prog.root, beatToSec(1.4), SR), 0.48, 0);
    for (let s = 0; s < 16; s++) {
      const t = at(bar + s / 16);
      if (s % 4 === 0) drums.add(t, K, 0.7);
      if (s === 4 || s === 12) drums.add(t, S, 0.46, -0.1);
      if (s % 2 === 1) drums.add(t, HC, 0.16 + (bar - 4) * 0.04, 0.3);
      if (bar >= 7 && s % 2 === 0) music.add(t, pluck(hz(nasty[(s / 2) % 4]), SR, 0.3, 1.2), 0.12 + (bar - 4) * 0.03, s % 4 === 0 ? -0.4 : 0.4);
    }
  }
  for (const n of [61, 66, 70]) music.add(at(11), reverb(pad(n, barToSec(1), SR, 2400), SR, 0.2, 1.4), 0.14, 0.2);

  // ---- 12-19 turn ----
  music.add(at(13), reverb(pluck(hz(62), SR, 2.6, 0.6), SR, 0.35, 1.6), 0.42, 0);
  music.add(at(14), reverb(pluck(hz(69), SR, 2.4, 0.6), SR, 0.35, 1.6), 0.28, 0.1);
  fx.add(at(16), riser(beatToSec(8), SR), 0.42, 0);
  fx.add(at(17.5), whoosh(beatToSec(2), SR, 31, 700), 0.5, 0);

  // ---- 19-25 reveal ----
  fx.add(at(19), impact(3.0), 0.95, 0);
  const answer = [74, 76, 78, 81, 78, 76];
  for (let bar = 19; bar < 25; bar++) {
    const chord = PROG[(bar - 19) % 4];
    const i = bar - 19;
    music.add(at(bar), reverb(pad(chord.root + 12, barToSec(1.02), SR, 1300 + i * 260), SR, 0.26, 1.3), 0.28, 0);
    for (let s = 0; s < 16; s++) {
      const t = at(bar + s / 16);
      if (s % 4 === 0) drums.add(t, K, 0.82);
      if (s === 4 || s === 12) drums.add(t, S, 0.52, -0.08);
      if (s % 4 === 2) drums.add(t, HO, 0.18, 0.28);
      if (s % 2 === 1 && i >= 2) drums.add(t, HC, 0.12, 0.32);
    }
    sub.add(at(bar), bass(chord.root, beatToSec(0.9), SR), 0.74, 0);
    music.add(beatAt(bar * 4), reverb(pluck(hz(answer[i % answer.length]), SR, 1.6, 1.1), SR, 0.3, 1.1), 0.36, 0);
  }

  // ---- 25-55 styles: six 5-bar phrases ----
  for (let phrase = 0; phrase < 6; phrase++) {
    const start = 25 + phrase * 5;
    fx.add(at(start) - Math.round(0.1 * SR), whoosh(0.45, SR, 60 + phrase, 1000 + phrase * 120), 0.3, 0.2);
    for (let bar = start; bar < start + 5; bar++) {
      const chord = PROG[(bar - 25) % 4];
      const inPhrase = bar - start;
      const dense = phrase === 1 || phrase === 4;
      music.add(at(bar), reverb(pad(chord.root + 12, barToSec(1.02), SR, 1500 + phrase * 220), SR, 0.26, 1.3), 0.24, 0);
      for (let s = 0; s < 16; s++) {
        const t = at(bar + s / 16);
        if (s % 4 === 0) drums.add(t, K, 0.72);
        if (s === 4 || s === 12) drums.add(t, S, 0.4, 0.1);
        if (dense && s % 4 === 2) drums.add(t, HO, 0.16, 0.3);
        if (s % 2 === 0 && (dense || inPhrase > 1)) {
          const n = chord.triad[(s / 2) % 3] + 12;
          music.add(t, pluck(hz(n), SR, 0.28, 1), 0.13, s % 4 === 0 ? -0.4 : 0.4);
        }
      }
      sub.add(at(bar), bass(chord.root, beatToSec(0.8), SR), 0.62, 0);
    }
    if (phrase > 0) fx.add(at(start + 4.5), pop(1200 + phrase * 90, SR, 0.2), 0.1, 0.2);
  }

  // ---- 55-69 prompts ----
  for (let bar = 55; bar < 69; bar++) {
    const chord = PROG[(bar - 55) % 4];
    music.add(at(bar), reverb(pad(chord.root + 12, barToSec(1.02), SR, 2200), SR, 0.26, 1.2), 0.2, 0);
    for (let s = 0; s < 16; s++) {
      const t = at(bar + s / 16);
      if (s % 4 === 0) drums.add(t, K, 0.62);
      if (s === 4 || s === 12) drums.add(t, S, 0.32, 0.12);
      if (s % 4 === 2) drums.add(t, HC, 0.12, -0.3);
      if (s % 2 === 0) music.add(t, pluck(hz(chord.triad[s % 3] + 24), SR, 0.22, 1), 0.09, Math.sin(s) * 0.5);
    }
    sub.add(at(bar), bass(chord.root, beatToSec(0.7), SR), 0.52, 0);
  }
  for (let k = 0; k < 220; k++) {
    const t = at(55) + k * Math.round(0.05 * SR);
    if (t < at(63)) fx.add(t, click(SR, 1700 + (k % 6) * 200, 50 + k), 0.09, ((k % 3) - 1) * 0.3);
  }

  // ---- 69-81 access ----
  for (let bar = 69; bar < 81; bar++) {
    const chord = PROG[(bar - 69) % 4];
    for (let s = 0; s < 16; s++) {
      const t = at(bar + s / 16);
      if (s % 4 === 0) drums.add(t, K, 0.78);
      if (s % 4 === 2) drums.add(t, HC, 0.14, 0.2);
      if (s === 8) drums.add(t, S, 0.34, -0.1);
      if (s % 4 === 0) music.add(t, pluck(hz(chord.triad[0] + 12), SR, 0.2, 1.3), 0.1, -0.3);
    }
    sub.add(at(bar), bass(chord.root, beatToSec(0.6), SR), 0.6, 0);
    music.add(at(bar), reverb(pad(chord.root + 12, barToSec(1), SR, 1800), SR, 0.24, 1.1), 0.16, 0);
  }
  for (let k = 0; k < 200; k++) {
    const t = at(69) + k * Math.round(0.048 * SR);
    if (t < at(76)) fx.add(t, click(SR, 1500 + (k % 7) * 190, 30 + k), 0.1, ((k % 4) - 1.5) * 0.3);
  }

  // ---- 81-93 features ----
  for (let bar = 81; bar < 93; bar++) {
    const chord = PROG[(bar - 81) % 4];
    music.add(at(bar), reverb(pad(chord.root + 12, barToSec(1.02), SR, 2600), SR, 0.3, 1.4), 0.2, 0);
    for (const n of chord.triad) music.add(at(bar), reverb(pad(n, barToSec(1.02), SR, 2400), SR, 0.24, 1.5), 0.08, ((n % 3) - 1) * 0.3);
    for (let s = 0; s < 16; s++) {
      const t = at(bar + s / 16);
      if (s % 4 === 0) drums.add(t, K, 0.66);
      if (s === 4 || s === 12) drums.add(t, S, 0.34, 0.1);
      if (s % 4 === 2) drums.add(t, HO, 0.13, 0.3);
    }
    sub.add(at(bar), bass(chord.root, beatToSec(0.8), SR), 0.55, 0);
  }

  // ---- 93-98 close ----
  const closeLen = barToSec(5);
  [50, 57, 62, 66, 69].forEach((n, i) => {
    music.add(at(93), reverb(pad(n, closeLen, SR, 2800 - i * 220), SR, 0.4, 1.8), 0.2 - i * 0.02, (i - 2) * 0.22);
  });
  music.add(at(94), reverb(pluck(hz(69), SR, 2.4, 0.7), SR, 0.4, 1.4), 0.3, 0);
  music.add(at(95), reverb(pluck(hz(74), SR, 2.6, 0.7), SR, 0.4, 1.4), 0.26, 0.1);
  fx.add(at(96), reverb(bell(hz(74), SR, 3.6), SR, 0.42, 1.4), 0.26, 0.15);
  music.add(at(97), reverb(pad(50, barToSec(1.4), SR, 3200), SR, 0.45, 1.8), 0.28, 0);
  fx.add(at(97), reverb(bell(hz(62), SR, 4.2), SR, 0.45, 1.6), 0.22, -0.1);

  // ---- mix ----
  out.mix(drums, 0.86);
  out.mix(music, 0.84);
  out.mix(sub, 0.6);
  out.mix(fx, 0.78);

  const Lc = out.buf[0];
  let peak = 0;
  for (let c = 0; c < 2; c++) for (let i = 0; i < Lc.length; i++) peak = Math.max(peak, Math.abs(out.buf[c][i]));
  const target = Math.pow(10, -1 / 20);
  const g = peak > 0 ? target / peak : 1;
  for (let c = 0; c < 2; c++) {
    const b = out.buf[c];
    for (let i = 0; i < b.length; i++) b[i] = Math.tanh(b[i] * g * 1.15) / Math.tanh(1.15);
  }
  const fadeN = Math.round(1.2 * SR);
  for (let c = 0; c < 2; c++) {
    const b = out.buf[c];
    for (let i = 0; i < fadeN; i++) b[b.length - 1 - i] *= i / fadeN;
  }
  return out;
};
