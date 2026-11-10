"use client";

/**
 * Curved-rim / Snell optical model informed by 9und30/glassy-liquid,
 * src/core/optics.ts at 2361eb1f03979703db988180028ccc6d5fc23fe5.
 * MIT notice: docs/licenses/glassy-liquid-MIT.txt. The union shader is local.
 * Glacier texture: existing local CC0 asset; no remote requests or PNG maps.
 */
import { useEffect, useId, useRef, useState } from "react";
import styles from "./liquid-fusion.module.css";

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
const INITIAL_DISTANCE = 68;

const fragmentBody = `
precision highp float;
uniform vec2 u_resolution;
uniform vec2 u_aspect;
uniform vec2 u_main;
uniform vec2 u_drop;
uniform float u_textureAspect;
uniform sampler2D u_image;
float field(vec2 p) {
  float a = length(p - u_main) - 0.235;
  float b = length(p - u_drop) - 0.150;
  float k = 0.145;
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}
float surfaceHeight(vec2 p) {
  float t = clamp(-field(p) / 0.105, 0.0, 1.0);
  return 0.085 * sqrt(max(0.0, 1.0 - (1.0 - t) * (1.0 - t)));
}
vec3 background(vec2 uv) {
  float aspect = u_resolution.x / u_resolution.y;
  if (aspect > u_textureAspect) uv.y = (uv.y - 0.5) * u_textureAspect / aspect + 0.5;
  else uv.x = (uv.x - 0.5) * aspect / u_textureAspect + 0.5;
  return SAMPLE(u_image, clamp(uv, 0.002, 0.998)).rgb * vec3(0.39, 0.59, 0.72);
}
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 p = uv * u_aspect;
  float d = field(p);
  float pixel = min(u_aspect.x / u_resolution.x, u_aspect.y / u_resolution.y);
  vec3 base = background(uv);
  float shadow = exp(-max(d, 0.0) / 0.022) * 0.19;
  vec3 outside = base * (1.0 - shadow);
  float e = max(pixel, 0.001);
  vec2 gradient = vec2(surfaceHeight(p + vec2(e,0.0)) - surfaceHeight(p - vec2(e,0.0)),
                       surfaceHeight(p + vec2(0.0,e)) - surfaceHeight(p - vec2(0.0,e))) / (2.0 * e);
  vec3 normal = normalize(vec3(-gradient, 1.0));
  vec3 ray = refract(vec3(0.0,0.0,-1.0), normal, 1.0 / 1.47);
  vec2 offset = ray.xy * (surfaceHeight(p) + 0.09) / max(0.2, -ray.z);
  vec3 glass = background(uv + offset / u_aspect);
  vec2 outward = normalize(vec2(field(p + vec2(e,0.0)) - field(p - vec2(e,0.0)),
                                field(p + vec2(0.0,e)) - field(p - vec2(0.0,e))) + vec2(0.00001));
  float rim = exp(-abs(d) / (pixel * 1.25));
  float directional = 0.28 + 0.72 * max(dot(outward, normalize(vec2(-0.6,0.8))), 0.0);
  float shine = pow(max(dot(normal, normalize(vec3(-0.35,0.6,1.7))), 0.0), 55.0) * 0.17;
  float fresnel = pow(1.0 - normal.z, 3.0) * 0.14;
  glass = glass * 1.035 + vec3(shine + fresnel + rim * directional * 0.72);
  float inside = 1.0 - smoothstep(-pixel, pixel, d);
  OUTPUT = vec4(mix(outside, glass, inside), 1.0);
}`;

interface Renderer {
  gl: WebGLRenderingContext | WebGL2RenderingContext;
  draw: (width: number, height: number, mainX: number, mainY: number, x: number, y: number) => void;
  dispose: () => void;
}

function createRenderer(canvas: HTMLCanvasElement, image: HTMLImageElement): Renderer | null {
  const options = { alpha: false, antialias: false, depth: false, stencil: false, preserveDrawingBuffer: false };
  const gl2 = canvas.getContext("webgl2", options) as WebGL2RenderingContext | null;
  const gl = gl2 ?? canvas.getContext("webgl", options) as WebGLRenderingContext | null;
  if (!gl) return null;
  const vertexSource = gl2
    ? "#version 300 es\nin vec2 a_position;void main(){gl_Position=vec4(a_position,0.0,1.0);}"
    : "attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0.0,1.0);}";
  const fragmentSource = gl2
    ? "#version 300 es\n" + fragmentBody.replace("precision highp float;", "precision highp float;\nout vec4 outColor;").replaceAll("SAMPLE", "texture").replaceAll("OUTPUT", "outColor")
    : fragmentBody.replaceAll("SAMPLE", "texture2D").replaceAll("OUTPUT", "gl_FragColor");
  const shaders: WebGLShader[] = [];
  let program: WebGLProgram | null = null;
  let buffer: WebGLBuffer | null = null;
  let texture: WebGLTexture | null = null;
  const dispose = () => {
    shaders.forEach((shader) => gl.deleteShader(shader));
    if (buffer) gl.deleteBuffer(buffer);
    if (texture) gl.deleteTexture(texture);
    if (program) gl.deleteProgram(program);
  };
  for (const [type, source] of [[gl.VERTEX_SHADER, vertexSource], [gl.FRAGMENT_SHADER, fragmentSource]] as const) {
    const shader = gl.createShader(type);
    if (!shader) { dispose(); return null; }
    shaders.push(shader);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { dispose(); return null; }
  }
  program = gl.createProgram();
  if (!program) { dispose(); return null; }
  shaders.forEach((shader) => gl.attachShader(program!, shader));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { dispose(); return null; }
  buffer = gl.createBuffer();
  texture = gl.createTexture();
  if (!buffer || !texture) { dispose(); return null; }
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image); }
  catch { dispose(); return null; }
  gl.uniform1i(gl.getUniformLocation(program, "u_image"), 0);
  gl.uniform1f(gl.getUniformLocation(program, "u_textureAspect"), image.naturalWidth / image.naturalHeight);
  const uniforms = Object.fromEntries(["u_resolution", "u_aspect", "u_main", "u_drop"].map((name) => [name, gl.getUniformLocation(program!, name)]));
  return {
    gl,
    draw(width, height, mainX, mainY, x, y) {
      const unit = Math.min(width, height);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
      gl.uniform2f(uniforms.u_aspect, width / unit, height / unit);
      gl.uniform2f(uniforms.u_main, mainX / unit, (height - mainY) / unit);
      gl.uniform2f(uniforms.u_drop, x / unit, (height - y) / unit);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    },
    dispose,
  };
}

export function LiquidFusion({ locale }: { locale: "en" | "zh" }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const fallbackMainRef = useRef<SVGCircleElement>(null);
  const fallbackDropRef = useRef<SVGCircleElement>(null);
  const [mode, setMode] = useState<"loading" | "webgl" | "fallback">("loading");
  const [generation, setGeneration] = useState(0);
  const id = useId();
  const zh = locale === "zh";

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const handle = handleRef.current;
    const range = rangeRef.current;
    if (!root || !canvas || !handle || !range) return;
    let renderer: Renderer | null = null;
    let frame = 0;
    let disposed = false;
    let lost = false;
    let width = 1;
    let height = 420;
    let main = { x: 0, y: 0 };
    let drop = { x: 0, y: 0 };
    let radius = 1;
    let minDistance = 1;
    let maxDistance = 1;
    let initialized = false;
    let pointer: { id: number; x: number; y: number; offsetX: number; offsetY: number } | null = null;
    const image = new window.Image();

    function fromDistance(value: number) {
      drop = { x: main.x + minDistance + value / 100 * (maxDistance - minDistance), y: main.y };
      schedule();
    }

    function draw() {
      frame = 0;
      if (disposed) return;
      handle!.style.left = `${drop.x}px`;
      handle!.style.top = `${drop.y}px`;
      handle!.style.width = handle!.style.height = `${radius * 2}px`;
      range!.value = String(Math.round(clamp((Math.hypot(drop.x - main.x, drop.y - main.y) - minDistance) / Math.max(1, maxDistance - minDistance), 0, 1) * 100));
      fallbackMainRef.current?.setAttribute("cx", String(main.x));
      fallbackMainRef.current?.setAttribute("cy", String(main.y));
      fallbackMainRef.current?.setAttribute("r", String(Math.min(width, height) * 0.235));
      fallbackDropRef.current?.setAttribute("cx", String(drop.x));
      fallbackDropRef.current?.setAttribute("cy", String(drop.y));
      fallbackDropRef.current?.setAttribute("r", String(radius));
      if (!lost) renderer?.draw(width, height, main.x, main.y, drop.x, drop.y);
    }

    function schedule() { if (!disposed && !frame) frame = requestAnimationFrame(draw); }

    function resize() {
      if (pointer) end(true);
      const oldWidth = width;
      const oldHeight = height;
      width = Math.max(1, Math.min(640, root!.clientWidth));
      height = Math.max(1, root!.clientHeight);
      const unit = Math.min(width, height);
      radius = unit * 0.15;
      main = { x: width * 0.34, y: height * 0.5 };
      minDistance = unit * 0.13;
      maxDistance = Math.max(minDistance, Math.min(unit * 0.57, width - radius - 12 - main.x));
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas!.width = Math.max(1, Math.round(width * dpr));
      canvas!.height = Math.max(1, Math.round(height * dpr));
      if (initialized) {
        drop = { x: clamp(drop.x / oldWidth * width, radius + 8, width - radius - 8),
          y: clamp(drop.y / oldHeight * height, radius + 56, height - radius - 66) };
      } else fromDistance(INITIAL_DISTANCE);
      initialized = true;
      schedule();
    }

    function down(event: PointerEvent) {
      if (event.button !== 0 || pointer) return;
      event.preventDefault();
      const rect = canvas!.getBoundingClientRect();
      pointer = { id: event.pointerId, x: drop.x, y: drop.y,
        offsetX: event.clientX - rect.left - drop.x, offsetY: event.clientY - rect.top - drop.y };
      handle!.focus({ preventScroll: true });
      handle!.setPointerCapture(event.pointerId);
      handle!.setAttribute("data-held", "");
    }
    function move(event: PointerEvent) {
      if (!pointer || pointer.id !== event.pointerId) return;
      event.preventDefault();
      const rect = canvas!.getBoundingClientRect();
      drop = { x: clamp(event.clientX - rect.left - pointer.offsetX, radius + 8, width - radius - 8),
        y: clamp(event.clientY - rect.top - pointer.offsetY, radius + 56, height - radius - 66) };
      schedule();
    }
    function end(cancelled: boolean) {
      const held = pointer;
      pointer = null;
      if (held && cancelled) drop = { x: held.x, y: held.y };
      if (held && handle!.hasPointerCapture(held.id)) handle!.releasePointerCapture(held.id);
      handle!.removeAttribute("data-held");
      schedule();
    }
    function up(event: PointerEvent) { if (pointer?.id === event.pointerId) end(event.type === "pointercancel"); }
    function captureLost(event: PointerEvent) { if (pointer?.id === event.pointerId) end(true); }
    function keydown(event: KeyboardEvent) {
      const step = event.shiftKey ? 24 : 8;
      const offsets: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
      const offset = offsets[event.key];
      if (offset) {
        event.preventDefault();
        drop = { x: clamp(drop.x + offset[0], radius + 8, width - radius - 8),
          y: clamp(drop.y + offset[1], radius + 56, height - radius - 66) };
        schedule();
      } else if (event.key === "Home") { event.preventDefault(); end(false); fromDistance(INITIAL_DISTANCE); }
      else if (event.key === "Escape") { event.preventDefault(); end(true); }
    }
    function input() { end(false); fromDistance(Number(range!.value)); }
    function blur() { if (pointer) end(true); }
    function contextLost(event: Event) { event.preventDefault(); lost = true; end(true); setMode("fallback"); }
    function contextRestored() { if (!disposed) setGeneration((previous) => previous + 1); }

    image.onload = () => {
      if (disposed) return;
      try { renderer = createRenderer(canvas, image); } catch { renderer = null; }
      setMode(renderer ? "webgl" : "fallback");
      schedule();
    };
    image.onerror = () => { if (!disposed) setMode("fallback"); };
    image.src = "/styles/liquid-glass/glacier.webp";
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resize);
    observer?.observe(root);
    handle.addEventListener("pointerdown", down);
    handle.addEventListener("pointermove", move, { passive: false });
    handle.addEventListener("pointerup", up);
    handle.addEventListener("pointercancel", up);
    handle.addEventListener("lostpointercapture", captureLost);
    handle.addEventListener("keydown", keydown);
    handle.addEventListener("blur", blur);
    range.addEventListener("input", input);
    canvas.addEventListener("webglcontextlost", contextLost);
    canvas.addEventListener("webglcontextrestored", contextRestored);
    window.addEventListener("resize", resize);
    window.addEventListener("blur", blur);
    resize();
    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      if (pointer && handle.hasPointerCapture(pointer.id)) handle.releasePointerCapture(pointer.id);
      observer?.disconnect();
      renderer?.dispose();
      image.onload = image.onerror = null;
      handle.removeEventListener("pointerdown", down);
      handle.removeEventListener("pointermove", move);
      handle.removeEventListener("pointerup", up);
      handle.removeEventListener("pointercancel", up);
      handle.removeEventListener("lostpointercapture", captureLost);
      handle.removeEventListener("keydown", keydown);
      handle.removeEventListener("blur", blur);
      range.removeEventListener("input", input);
      canvas.removeEventListener("webglcontextlost", contextLost);
      canvas.removeEventListener("webglcontextrestored", contextRestored);
      window.removeEventListener("resize", resize);
      window.removeEventListener("blur", blur);
    };
  }, [locale, generation]);

  return (
    <div ref={rootRef} className={styles.root} data-liquid-fusion={mode} data-fusion-renderer={mode === "webgl" ? "webgl" : "fallback"}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <svg className={styles.fallback} width="100%" height="100%" aria-hidden="true">
        <circle ref={fallbackMainRef} className={styles.fallbackCircle} />
        <circle ref={fallbackDropRef} className={styles.fallbackCircle} />
      </svg>
      <p className={styles.heading} id={`${id}-hint`}>{zh ? "靠近，融合。分开，成形。" : "Closer, together. Apart, a new shape."}</p>
      <button ref={handleRef} type="button" className={styles.handle}
        aria-label={zh ? "拖动小滴；方向键移动，Home 复位，Escape 取消" : "Move the small drop. Arrow keys move; Home resets; Escape cancels."}
        aria-describedby={`${id}-hint`}>
        <span>{zh ? "拖动" : "Drag"}</span>
      </button>
      <div className={styles.controls}>
        <label htmlFor={`${id}-distance`}>{zh ? "间距" : "Distance"}</label>
        <input ref={rangeRef} id={`${id}-distance`} type="range" min="0" max="100" step="1" defaultValue={INITIAL_DISTANCE}
          aria-label={zh ? "两滴间距" : "Distance between the drops"} />
        <span>{zh ? "分开" : "Apart"}</span>
      </div>
      {mode === "fallback" ? <p className={styles.notice} role="status">{zh ? "当前显示静态玻璃示意，浏览器未启用 WebGL 折射。" : "Glass outline preview: WebGL refraction is unavailable."}</p> : null}
    </div>
  );
}
