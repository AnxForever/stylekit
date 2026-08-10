"use client";

import * as THREE from "three";
import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

import styles from "./editorial-aura-frame.module.css";

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uIntensity;

  varying vec2 vUv;

  float glow(vec2 point, vec2 center, float radius) {
    return exp(-dot(point - center, point - center) / radius);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 point = uv - 0.5;
    point.x *= aspect;

    vec2 pointer = uPointer - 0.5;
    pointer.x *= aspect;

    float time = uTime * 0.045;
    vec2 colorAOrigin = vec2(-0.34, 0.22);
    vec2 colorBOrigin = vec2(0.33, 0.12);
    vec2 colorCOrigin = vec2(0.04, -0.34);

    vec2 colorAPoint = colorAOrigin + vec2(sin(time * 1.2), cos(time * 0.8)) * 0.055 + pointer * 0.09;
    vec2 colorBPoint = colorBOrigin + vec2(cos(time * 0.7), sin(time * 1.1)) * 0.06 + pointer * 0.05;
    vec2 colorCPoint = colorCOrigin + vec2(sin(time * 0.9), cos(time * 1.3)) * 0.05 - pointer * 0.07;

    float colorA = glow(point, colorAPoint, 0.13);
    float colorB = glow(point, colorBPoint, 0.15);
    float colorC = glow(point, colorCPoint, 0.12);

    float edgeDistance = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
    float edgeMask = 1.0 - smoothstep(0.02, 0.24, edgeDistance);
    float vignette = smoothstep(0.88, 0.2, length(point / vec2(aspect, 1.0)));

    vec3 color = uColorA * colorA + uColorB * colorB + uColorC * colorC;
    float alpha = (colorA + colorB + colorC) * edgeMask * vignette * uIntensity;

    gl_FragColor = vec4(color, alpha);
  }
`;

type Intensity = "subtle" | "medium" | "bold";

export interface EditorialAuraFrameProps {
  children: ReactNode;
  className?: string;
  accent?: readonly [string, string, string];
  intensity?: Intensity;
  interactive?: boolean;
  reducedMotionFallback?: boolean;
  label?: string;
}

const INTENSITY_VALUES: Record<Intensity, number> = {
  subtle: 0.14,
  medium: 0.22,
  bold: 0.32,
};

function toRgb(value: string): THREE.Color {
  const color = new THREE.Color();
  color.set(value);
  return color;
}

export function EditorialAuraFrame({
  children,
  className,
  accent = ["#6366f1", "#fb7185", "#2dd4bf"],
  intensity = "subtle",
  interactive = true,
  reducedMotionFallback = true,
  label = "Editorial aura frame",
}: EditorialAuraFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!frame || !canvas) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotionFallback && prefersReducedMotion.matches) {
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        canvas,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uPointer: { value: new THREE.Vector2(0.5, 0.5) },
        uColorA: { value: toRgb(accent[0]) },
        uColorB: { value: toRgb(accent[1]) },
        uColorC: { value: toRgb(accent[2]) },
        uIntensity: { value: INTENSITY_VALUES[intensity] },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const pointerTarget = new THREE.Vector2(0.5, 0.5);
    const pointerCurrent = new THREE.Vector2(0.5, 0.5);
    let animationFrame = 0;
    let isVisible = true;
    let isDocumentVisible = !document.hidden;
    const startedAt = performance.now();

    const resize = () => {
      const bounds = frame.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(Math.max(bounds.width, 1), Math.max(bounds.height, 1), false);
      material.uniforms.uResolution.value.set(
        Math.max(bounds.width * pixelRatio, 1),
        Math.max(bounds.height * pixelRatio, 1),
      );
    };

    const render = (now: number) => {
      animationFrame = 0;
      if (!isVisible || !isDocumentVisible) return;

      pointerCurrent.lerp(pointerTarget, 0.045);
      material.uniforms.uTime.value = (now - startedAt) * 0.001;
      material.uniforms.uPointer.value.copy(pointerCurrent);
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(render);
    };

    const scheduleRender = () => {
      if (!animationFrame && isVisible && isDocumentVisible) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!interactive) return;
      const bounds = frame.getBoundingClientRect();
      pointerTarget.set(
        THREE.MathUtils.clamp((event.clientX - bounds.left) / Math.max(bounds.width, 1), 0, 1),
        THREE.MathUtils.clamp(1 - (event.clientY - bounds.top) / Math.max(bounds.height, 1), 0, 1),
      );
      scheduleRender();
    };

    const onPointerLeave = () => {
      pointerTarget.set(0.5, 0.5);
      scheduleRender();
    };

    const onVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
      scheduleRender();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          resize();
          scheduleRender();
        } else if (animationFrame) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = 0;
        }
      },
      { threshold: 0 },
    );

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(frame);
    observer.observe(frame);
    frame.addEventListener("pointermove", onPointerMove);
    frame.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    resize();
    scheduleRender();

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      observer.disconnect();
      frame.removeEventListener("pointermove", onPointerMove);
      frame.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [accent, intensity, interactive, reducedMotionFallback]);

  const frameStyle = {
    "--aura-line": accent[0],
    "--aura-accent": accent[1],
  } as CSSProperties;

  return (
    <div
      ref={frameRef}
      className={`${styles.frame} ${className ?? ""}`}
      style={frameStyle}
      aria-label={label}
    >
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <svg
        className={styles.railSvg}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect className={styles.railFrame} x="0.5" y="0.5" width="99" height="99" />
        <path className={styles.railScan} d="M 8 0.5 H 28 M 72 99.5 H 92" />
        <circle className={styles.railDot} cx="8" cy="0.5" r="0.9" />
      </svg>
      <div className={styles.frameLines} aria-hidden="true">
        <span className={`${styles.corner} ${styles.topLeft}`} />
        <span className={`${styles.corner} ${styles.topRight}`} />
        <span className={`${styles.corner} ${styles.bottomLeft}`} />
        <span className={`${styles.corner} ${styles.bottomRight}`} />
        <span className={styles.tickRail} />
        <span className={styles.marker} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
