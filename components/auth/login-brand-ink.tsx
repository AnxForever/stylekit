"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Premium sign-in backdrop: real fluid ink diffusing on a WHITE ground, drawn
// by a Three.js fullscreen fragment shader. Domain-warped fBm noise pushes a
// few saturated pigments (indigo / rose / teal / amber) into wispy, filamented
// blooms that genuinely churn and spread — the look CSS/canvas blobs can't do.
// Single GPU pass, so it's smooth; pigments subtract from white so overlaps
// darken like real ink on paper.
//
// Motion honours prefers-reduced-motion (renders one static frame). The layer
// is aria-hidden (pure decoration). We hand-roll the GL (ShaderMaterial on a
// full-screen triangle) instead of pulling in R3F — one draw call, no scene.

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform vec2 u_res;
  uniform float u_time;

  // -- value-noise fBm ------------------------------------------------------
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    // 4 octaves — plenty of structure for a soft, blurred ink field, and much
    // cheaper than 6 (this runs per-pixel, several times over).
    for (int i = 0; i < 4; i++) {
      v += amp * noise(p);
      p *= 2.02;
      amp *= 0.5;
    }
    return v;
  }

  // Ink pool: domain-warped fBm around a moving center -> filamented bloom.
  float inkField(vec2 uv, vec2 center, float t, float scale, float seed) {
    vec2 d = uv - center;
    // Slow-swirling warp so the edges writhe like diffusion in water.
    vec2 q = vec2(
      fbm(uv * scale + vec2(seed, seed * 1.7) + t * 0.05),
      fbm(uv * scale + vec2(seed * 2.3, seed) - t * 0.04)
    );
    vec2 r = vec2(
      fbm(uv * scale + q * 2.2 + t * 0.06),
      fbm(uv * scale + q * 2.2 - t * 0.05)
    );
    float dist = length(d) + (r.x - 0.5) * 0.7 + (q.y - 0.5) * 0.4;
    // Soft, long-tailed falloff = feathered ink edge with wispy filaments.
    return smoothstep(0.55, 0.02, dist);
  }

  void main() {
    // Aspect-correct coords so blobs aren't stretched by the tall panel.
    vec2 uv = vUv;
    vec2 p = uv;
    p.x *= u_res.x / u_res.y;

    float t = u_time;

    // Four wandering pigment centers (aspect-corrected space).
    float ar = u_res.x / u_res.y;
    vec2 c1 = vec2(0.30 * ar + sin(t * 0.13) * 0.05, 0.34 + cos(t * 0.11) * 0.05);
    vec2 c2 = vec2(0.58 * ar + cos(t * 0.10) * 0.06, 0.44 + sin(t * 0.14) * 0.05);
    vec2 c3 = vec2(0.42 * ar + sin(t * 0.09) * 0.06, 0.66 + cos(t * 0.12) * 0.06);
    vec2 c4 = vec2(0.64 * ar + cos(t * 0.15) * 0.05, 0.70 + sin(t * 0.08) * 0.05);

    float f1 = inkField(p, c1, t, 2.6, 11.0);
    float f2 = inkField(p, c2, t, 2.8, 41.0);
    float f3 = inkField(p, c3, t, 2.5, 73.0);
    float f4 = inkField(p, c4, t, 3.0, 97.0);

    // Pigments (as absorption: how much each subtracts from white).
    vec3 indigo = vec3(0.31, 0.27, 0.90);
    vec3 rose   = vec3(0.86, 0.15, 0.47);
    vec3 teal   = vec3(0.05, 0.58, 0.53);
    vec3 amber  = vec3(0.85, 0.47, 0.02);

    // Start from white paper; each ink multiplies the paper toward its color.
    vec3 col = vec3(1.0);
    col *= mix(vec3(1.0), indigo, clamp(f1 * 1.05, 0.0, 1.0) * 0.85);
    col *= mix(vec3(1.0), rose,   clamp(f2 * 1.05, 0.0, 1.0) * 0.82);
    col *= mix(vec3(1.0), teal,   clamp(f3 * 1.05, 0.0, 1.0) * 0.78);
    col *= mix(vec3(1.0), amber,  clamp(f4 * 1.05, 0.0, 1.0) * 0.70);

    // Faint paper grain so flats never band.
    float grain = (hash(uv * u_res * 0.5 + t) - 0.5) * 0.02;
    col += grain;

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`;

export function LoginBrandInk() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: "low-power" });
    } catch {
      return; // No WebGL — the white panel background stays as a graceful fallback.
    }
    renderer.setClearColor(0xffffff, 1);
    // Cap DPR at 1.5 — the field is soft, extra pixels are wasted.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    container.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();

    const uniforms = {
      u_res: { value: new THREE.Vector2(1, 1) },
      u_time: { value: 0 },
    };
    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
    });
    // Full-screen triangle.
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3)
    );
    geometry.setAttribute(
      "uv",
      new THREE.BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2)
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    scene.add(mesh);

    const resize = () => {
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);
      renderer.setSize(w, h, false);
      uniforms.u_res.value.set(
        renderer.domElement.width,
        renderer.domElement.height
      );
    };
    resize();

    let raf = 0;
    let start = 0;
    const render = (now: number) => {
      if (!start) start = now;
      uniforms.u_time.value = (now - start) / 1000;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };

    if (prefersReduced) {
      uniforms.u_time.value = 8.0;
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(render);
    }

    // Pause when the tab/panel isn't visible to save power.
    const io = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      if (entry.isIntersecting && !prefersReduced) {
        if (!raf) raf = requestAnimationFrame(render);
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(container);

    const onResize = () => {
      resize();
      if (prefersReduced) renderer.render(scene, camera);
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="absolute inset-0 overflow-hidden bg-white"
    />
  );
}
