"use client";

import * as THREE from "three";
import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

import styles from "./shader-field.module.css";

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
  uniform float uSpeed;
  uniform float uIntensity;

  varying vec2 vUv;

  float hash(vec2 point) {
    return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 point) {
    vec2 cell = floor(point);
    vec2 local = fract(point);
    local = local * local * (3.0 - 2.0 * local);
    return mix(
      mix(hash(cell), hash(cell + vec2(1.0, 0.0)), local.x),
      mix(hash(cell + vec2(0.0, 1.0)), hash(cell + vec2(1.0, 1.0)), local.x),
      local.y
    );
  }

  float fbm(vec2 point) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int index = 0; index < 5; index++) {
      value += amplitude * noise(point);
      point = point * 2.02 + vec2(17.3, 9.2);
      amplitude *= 0.5;
    }
    return value;
  }

  mat2 rotation(float angle) {
    float sine = sin(angle);
    float cosine = cos(angle);
    return mat2(cosine, -sine, sine, cosine);
  }

  void main() {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 point = vUv - 0.5;
    point.x *= aspect;

    vec2 pointer = (uPointer - 0.5) * vec2(aspect, 1.0);
    float time = uTime * uSpeed;
    vec2 flow = rotation(-0.24) * point;
    // Pointer input is a quiet bias, not a cursor-following spotlight.
    flow += pointer * 0.018;
    flow += vec2(time * 0.045, -time * 0.025);

    float cloud = fbm(flow * 1.5);
    float ribbon = 0.5 + 0.5 * sin((flow.x + cloud * 0.75) * 5.4 + sin(flow.y * 3.0 + time * 0.3));
    float grain = noise(flow * 7.0 + time * 0.015);
    float edge = smoothstep(0.92, 0.18, length(point / vec2(max(aspect, 1.0), 1.0)));
    float focus = exp(-length(point - pointer * 0.08) * 4.2);

    vec3 color = mix(uColorA, uColorB, smoothstep(0.18, 0.78, cloud));
    color = mix(color, uColorC, smoothstep(0.48, 0.96, ribbon) * 0.62);
    color += uColorC * focus * 0.045;

    float alpha = (0.22 + cloud * 0.3 + ribbon * 0.14 + grain * 0.06 + focus * 0.025) * edge * uIntensity;
    gl_FragColor = vec4(color, alpha);
  }
`;

type ShaderFieldSpeed = "slow" | "medium" | "fast";

export interface ShaderFieldProps {
  children?: ReactNode;
  className?: string;
  accent?: readonly [string, string, string];
  speed?: ShaderFieldSpeed;
  intensity?: "subtle" | "medium" | "bold";
  interactive?: boolean;
  reducedMotionFallback?: boolean;
  label?: string;
}

const SPEED_VALUES: Record<ShaderFieldSpeed, number> = {
  slow: 0.55,
  medium: 1,
  fast: 1.7,
};

const INTENSITY_VALUES: Record<NonNullable<ShaderFieldProps["intensity"]>, number> = {
  subtle: 0.7,
  medium: 1,
  bold: 1.35,
};

function toRgb(value: string): THREE.Color {
  return new THREE.Color(value);
}

export function ShaderField({
  children,
  className,
  accent = ["#ff6b6b", "#0a0a0a", "#00d9ff"],
  speed = "slow",
  intensity = "medium",
  interactive = false,
  reducedMotionFallback = true,
  label = "GLSL shader field",
}: ShaderFieldProps) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [colorA, colorB, colorC] = accent;

  useEffect(() => {
    const field = fieldRef.current;
    const canvas = canvasRef.current;
    if (!field || !canvas) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotionFallback && prefersReducedMotion.matches) return;

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
        uColorA: { value: toRgb(colorA) },
        uColorB: { value: toRgb(colorB) },
        uColorC: { value: toRgb(colorC) },
        uSpeed: { value: SPEED_VALUES[speed] },
        uIntensity: { value: INTENSITY_VALUES[intensity] },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
    });
    scene.add(new THREE.Mesh(geometry, material));

    const pointerTarget = new THREE.Vector2(0.5, 0.5);
    const pointerCurrent = new THREE.Vector2(0.5, 0.5);
    let animationFrame = 0;
    let isVisible = true;
    let isDocumentVisible = !document.hidden;
    const startedAt = performance.now();

    const resize = () => {
      const bounds = field.getBoundingClientRect();
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
      const bounds = field.getBoundingClientRect();
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

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        resize();
        scheduleRender();
      } else if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    });
    const resizeObserver = new ResizeObserver(resize);

    resizeObserver.observe(field);
    observer.observe(field);
    field.addEventListener("pointermove", onPointerMove);
    field.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    resize();
    scheduleRender();

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      observer.disconnect();
      field.removeEventListener("pointermove", onPointerMove);
      field.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [colorA, colorB, colorC, intensity, interactive, reducedMotionFallback, speed]);

  const fieldStyle = {
    "--field-a": colorA,
    "--field-b": colorB,
    "--field-c": colorC,
  } as CSSProperties;

  return (
    <div
      ref={fieldRef}
      className={`${styles.field} ${className ?? ""}`}
      style={fieldStyle}
      aria-label={label}
    >
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />
      {children ? <div className={styles.content}>{children}</div> : null}
    </div>
  );
}
