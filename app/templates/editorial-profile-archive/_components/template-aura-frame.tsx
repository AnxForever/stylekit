"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import styles from "./template-aura-frame.module.css";

const VERTEX_SHADER = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying vec2 vUv;

  float glow(vec2 point, vec2 center, float radius) {
    return exp(-dot(point - center, point - center) / radius);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 point = (uv - 0.5) * vec2(aspect, 1.0);
    vec2 pointer = (uPointer - 0.5) * vec2(aspect, 1.0);
    float time = uTime * 0.045;
    vec2 a = vec2(-0.34, 0.22) + vec2(sin(time * 1.2), cos(time * 0.8)) * 0.055 + pointer * 0.09;
    vec2 b = vec2(0.33, 0.12) + vec2(cos(time * 0.7), sin(time * 1.1)) * 0.06 + pointer * 0.05;
    vec2 c = vec2(0.04, -0.34) + vec2(sin(time * 0.9), cos(time * 1.3)) * 0.05 - pointer * 0.07;
    float ga = glow(point, a, 0.13);
    float gb = glow(point, b, 0.15);
    float gc = glow(point, c, 0.12);
    float edgeDistance = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
    float edgeMask = 1.0 - smoothstep(0.02, 0.24, edgeDistance);
    vec3 color = uColorA * ga + uColorB * gb + uColorC * gc;
    float alpha = (ga + gb + gc) * edgeMask * 0.19;
    gl_FragColor = vec4(color, alpha);
  }
`;

export interface TemplateAuraFrameProps {
  children: ReactNode;
  accent?: readonly [string, string, string];
  className?: string;
  intensity?: "subtle" | "medium" | "strong" | string;
  label?: string;
}

function hexToRgb(value: string): [number, number, number] {
  const normalized = value.replace("#", "");
  const red = Number.parseInt(normalized.slice(0, 2), 16) / 255;
  const green = Number.parseInt(normalized.slice(2, 4), 16) / 255;
  const blue = Number.parseInt(normalized.slice(4, 6), 16) / 255;
  return [red || 0, green || 0, blue || 0];
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function TemplateAuraFrame({
  children,
  accent = ["#5149cf", "#ef6b7a", "#65b9aa"],
  className,
  label = "Editorial aura frame",
}: TemplateAuraFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!frame || !canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const gl = canvas.getContext("webgl", { alpha: true, antialias: false });
    if (!gl) return;

    const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertex || !fragment) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const buffer = gl.createBuffer();
    if (!buffer) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.useProgram(program);

    const position = gl.getAttribLocation(program, "aPosition");
    const time = gl.getUniformLocation(program, "uTime");
    const resolution = gl.getUniformLocation(program, "uResolution");
    const pointer = gl.getUniformLocation(program, "uPointer");
    const colors = ["uColorA", "uColorB", "uColorC"].map((name) => gl.getUniformLocation(program, name));
    const colorValues = accent.map(hexToRgb);
    const target = [0.5, 0.5];
    const current = [0.5, 0.5];
    let frameId = 0;
    let visible = true;
    let pageVisible = !document.hidden;
    const startedAt = performance.now();

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resize = () => {
      const bounds = frame.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(bounds.width * ratio));
      canvas.height = Math.max(1, Math.floor(bounds.height * ratio));
      canvas.style.width = `${bounds.width}px`;
      canvas.style.height = `${bounds.height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolution, canvas.width, canvas.height);
    };

    const render = (now: number) => {
      frameId = 0;
      if (!visible || !pageVisible) return;
      current[0] += (target[0] - current[0]) * 0.045;
      current[1] += (target[1] - current[1]) * 0.045;
      gl.uniform1f(time, (now - startedAt) * 0.001);
      gl.uniform2f(pointer, current[0], current[1]);
      colorValues.forEach((color, index) => gl.uniform3f(colors[index], color[0], color[1], color[2]));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frameId = window.requestAnimationFrame(render);
    };
    const schedule = () => { if (!frameId && visible && pageVisible) frameId = window.requestAnimationFrame(render); };
    const onPointerMove = (event: PointerEvent) => {
      const bounds = frame.getBoundingClientRect();
      target[0] = Math.max(0, Math.min(1, (event.clientX - bounds.left) / Math.max(bounds.width, 1)));
      target[1] = Math.max(0, Math.min(1, 1 - (event.clientY - bounds.top) / Math.max(bounds.height, 1)));
      schedule();
    };
    const onPointerLeave = () => { target[0] = 0.5; target[1] = 0.5; schedule(); };
    const onVisibility = () => { pageVisible = !document.hidden; schedule(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) { resize(); schedule(); } else if (frameId) window.cancelAnimationFrame(frameId); });
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(frame);
    observer.observe(frame);
    frame.addEventListener("pointermove", onPointerMove);
    frame.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    resize();
    schedule();

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      observer.disconnect();
      frame.removeEventListener("pointermove", onPointerMove);
      frame.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [accent]);

  const frameStyle = { "--aura-line": accent[0], "--aura-accent": accent[1] } as CSSProperties;

  return (
    <div ref={frameRef} className={`${styles.frame} ${className ?? ""}`} style={frameStyle} aria-label={label}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.frameLines} aria-hidden="true"><span className={`${styles.corner} ${styles.topLeft}`} /><span className={`${styles.corner} ${styles.topRight}`} /><span className={`${styles.corner} ${styles.bottomLeft}`} /><span className={`${styles.corner} ${styles.bottomRight}`} /><span className={styles.tickRail} /><span className={styles.marker} /></div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
