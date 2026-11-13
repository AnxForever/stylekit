/**
 * Adapted from 9und30/glassy-liquid core/spring.ts at
 * 2361eb1f03979703db988180028ccc6d5fc23fe5. MIT, copyright 2026 thirtynine.
 * Full notice: docs/licenses/glassy-liquid-MIT.txt.
 */
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

/** Analytic damped spring. Retargeting deliberately preserves velocity. */
export class LiquidSpring {
  value: number;
  target: number;
  velocity = 0;

  constructor(value = 0, private duration = 0.42, private bounce = 0.24) {
    this.value = this.target = value;
  }

  to(target: number, duration = this.duration, bounce = this.bounce) {
    this.target = target;
    this.duration = duration;
    this.bounce = bounce;
  }

  set(value: number) {
    this.value = this.target = value;
    this.velocity = 0;
  }

  get settled() {
    return this.value === this.target && this.velocity === 0;
  }

  step(dt: number) {
    if (this.settled || dt <= 0) return;
    const omega = 2 * Math.PI / Math.max(0.001, this.duration);
    const damping = 1 - clamp(this.bounce, 0, 0.99);
    const start = this.value - this.target;
    const velocity = this.velocity;
    const decay = Math.exp(-damping * omega * dt);
    let offset: number;
    let nextVelocity: number;
    if (damping < 1) {
      const frequency = omega * Math.sqrt(1 - damping * damping);
      const b = (velocity + damping * omega * start) / frequency;
      const cosine = Math.cos(frequency * dt);
      const sine = Math.sin(frequency * dt);
      offset = decay * (start * cosine + b * sine);
      nextVelocity = decay * ((b * frequency - damping * omega * start) * cosine
        - (start * frequency + damping * omega * b) * sine);
    } else {
      const b = velocity + omega * start;
      offset = decay * (start + b * dt);
      nextVelocity = decay * (b - omega * (start + b * dt));
    }
    if (Math.abs(offset) < 0.001 && Math.abs(nextVelocity) < 0.01) {
      this.set(this.target);
    } else {
      this.value = this.target + offset;
      this.velocity = nextVelocity;
    }
  }
}
