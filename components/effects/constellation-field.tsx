"use client";

import * as THREE from "three";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import styles from "./constellation-field.module.css";

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform vec2 uPointer;

  attribute float aScale;
  attribute float aTwinkle;

  varying float vTwinkle;

  void main() {
    vec3 animatedPosition = position;
    animatedPosition.x += sin(uTime * 0.18 + position.y * 2.4) * 0.055;
    animatedPosition.y += cos(uTime * 0.14 + position.x * 1.8) * 0.04;
    // Keep the constellation anchored; pointer input only adds a near-imperceptible drift.
    animatedPosition.x += uPointer.x * 0.018 * (1.0 - abs(position.z));
    animatedPosition.y += uPointer.y * 0.012 * (1.0 - abs(position.z));

    vec4 modelPosition = modelMatrix * vec4(animatedPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = uSize * aScale * uPixelRatio * (3.2 / max(-viewPosition.z, 0.5));
    vTwinkle = aTwinkle;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform vec3 uColor;
  uniform float uTime;

  varying float vTwinkle;

  void main() {
    vec2 point = gl_PointCoord - 0.5;
    float distanceToCenter = length(point);
    float disc = 1.0 - smoothstep(0.18, 0.5, distanceToCenter);
    float pulse = 0.72 + 0.28 * sin(uTime * 0.8 + vTwinkle * 18.0);
    gl_FragColor = vec4(uColor, disc * pulse);
  }
`;

type Density = "sparse" | "dense" | number;

export interface ConstellationFieldProps {
  children?: ReactNode;
  className?: string;
  color?: string;
  density?: Density;
  speed?: number;
  pointSize?: number;
  interactive?: boolean;
  reducedMotionFallback?: boolean;
  label?: string;
}

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function getParticleCount(density: Density) {
  if (typeof density === "number") return THREE.MathUtils.clamp(Math.round(density), 32, 900);
  return density === "dense" ? 420 : 220;
}

export function ConstellationField({
  children,
  className,
  color = "#ccff00",
  density = "sparse",
  speed = 1,
  pointSize = 2.2,
  interactive = false,
  reducedMotionFallback = true,
  label = "Three.js constellation field",
}: ConstellationFieldProps) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleCount = getParticleCount(density);

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
        powerPreference: "low-power",
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.z = 3.2;

    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const twinkles = new Float32Array(particleCount);
    for (let index = 0; index < particleCount; index += 1) {
      const seed = index + 1;
      const angle = seededRandom(seed) * Math.PI * 2;
      const radius = Math.sqrt(seededRandom(seed + 1000)) * 1.45;
      const depth = (seededRandom(seed + 2000) - 0.5) * 1.15;
      positions[index * 3] = Math.cos(angle) * radius * 1.22;
      positions[index * 3 + 1] = Math.sin(angle) * radius * 0.72;
      positions[index * 3 + 2] = depth;
      scales[index] = 0.55 + seededRandom(seed + 3000) * 1.25;
      twinkles[index] = seededRandom(seed + 4000);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute("aTwinkle", new THREE.BufferAttribute(twinkles, 1));
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: 1 },
        uSize: { value: pointSize },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uColor: { value: new THREE.Color(color) },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const pointerTarget = new THREE.Vector2(0, 0);
    const pointerCurrent = new THREE.Vector2(0, 0);
    let animationFrame = 0;
    let isVisible = true;
    let isDocumentVisible = !document.hidden;
    const startedAt = performance.now();

    const resize = () => {
      const bounds = field.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(Math.max(bounds.width, 1), Math.max(bounds.height, 1), false);
      camera.aspect = Math.max(bounds.width, 1) / Math.max(bounds.height, 1);
      camera.updateProjectionMatrix();
      material.uniforms.uPixelRatio.value = pixelRatio;
    };

    const render = (now: number) => {
      animationFrame = 0;
      if (!isVisible || !isDocumentVisible) return;
      pointerCurrent.lerp(pointerTarget, 0.022);
      points.rotation.z = Math.sin((now - startedAt) * 0.00008 * speed) * 0.025;
      material.uniforms.uTime.value = (now - startedAt) * 0.001 * speed;
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
        THREE.MathUtils.clamp(((event.clientX - bounds.left) / Math.max(bounds.width, 1)) * 2 - 1, -1, 1),
        THREE.MathUtils.clamp(1 - ((event.clientY - bounds.top) / Math.max(bounds.height, 1)) * 2, -1, 1),
      );
      scheduleRender();
    };

    const onPointerLeave = () => {
      pointerTarget.set(0, 0);
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
  }, [color, interactive, particleCount, pointSize, reducedMotionFallback, speed]);

  const fieldStyle = { "--constellation-color": color } as CSSProperties;

  return (
    <div
      ref={fieldRef}
      className={`${styles.field} ${className ?? ""}`}
      style={fieldStyle}
      aria-label={label}
    >
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.horizon} aria-hidden="true" />
      {children ? <div className={styles.content}>{children}</div> : null}
    </div>
  );
}
