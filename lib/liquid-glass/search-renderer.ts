/**
 * Local rounded-rectangle / circle union shader. Curved-rim / Snell model
 * informed by 9und30/glassy-liquid at 2361eb1f03979703db988180028ccc6d5fc23fe5.
 * MIT notice: docs/licenses/glassy-liquid-MIT.txt.
 * Samples the showcase's known glacier ambient, not arbitrary DOM content.
 */
export interface SearchGlassFrame {
  width: number;
  height: number;
  viewportWidth: number;
  viewportHeight: number;
  originX: number;
  originY: number;
  pill: { x: number; y: number; width: number; height: number; radius: number };
  button: { x: number; y: number; radius: number };
  blend: number;
  active: number;
  refraction: number;
  frost: number;
  tint: [number, number, number, number];
  dark: boolean;
}

const fragmentBody = `
precision highp float;
uniform vec2 u_resolution, u_size, u_viewport, u_origin, u_imageSize;
uniform vec4 u_pill, u_tint;
uniform vec3 u_button;
uniform float u_radius, u_blend, u_active, u_refraction, u_frost, u_dark;
uniform sampler2D u_image;
float field(vec2 p) {
  vec2 halfSize = u_pill.zw * 0.5;
  float radius = clamp(u_radius, 0.0, min(halfSize.x, halfSize.y));
  vec2 q = abs(p - u_pill.xy - halfSize) - halfSize + radius;
  float a = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - radius;
  float b = length(p - u_button.xy) - u_button.z;
  if (u_blend <= 0.001) return min(a, b);
  float h = clamp(0.5 + 0.5 * (b - a) / u_blend, 0.0, 1.0);
  return mix(b, a, h) - u_blend * h * (1.0 - h);
}
float surfaceHeight(vec2 p) {
  float rimWidth = max(3.0, min(u_pill.w * 0.30, u_button.z * 0.65));
  float t = clamp(-field(p) / rimWidth, 0.0, 1.0);
  return rimWidth * 0.52 * sqrt(max(0.0, 1.0 - (1.0-t) * (1.0-t)));
}
vec3 background(vec2 world) {
  // CSS background-size: cover; background-position: center.
  float scale = max(u_viewport.x / u_imageSize.x, u_viewport.y / u_imageSize.y);
  vec2 uv = (world - u_viewport * 0.5) / (u_imageSize * scale) + 0.5;
  vec3 photo = SAMPLE(u_image, vec2(clamp(uv.x, 0.0, 1.0), 1.0-clamp(uv.y, 0.0, 1.0))).rgb;
  // CSS 145deg runs down and right; its length includes both viewport axes.
  vec2 direction = vec2(0.57357644, 0.81915204);
  float t = clamp(0.5 + dot(world-u_viewport*0.5, direction) / dot(u_viewport, direction), 0.0, 1.0);
  vec4 start = mix(vec4(20.0,57.0,80.0,122.4), vec4(7.0,23.0,43.0,178.5), u_dark) / 255.0;
  vec4 end = mix(vec4(8.0,32.0,50.0,183.6), vec4(4.0,18.0,34.0,216.75), u_dark) / 255.0;
  // CSS gradients interpolate premultiplied stop colors before compositing.
  float alpha = mix(start.a, end.a, t);
  return photo * (1.0-alpha) + mix(start.rgb*start.a, end.rgb*end.a, t);
}
vec3 frostedBackground(vec2 world) {
  vec2 offset = vec2(u_frost * 0.78);
  return background(world) * 0.4
    + background(world + offset) * 0.15
    + background(world - offset) * 0.15
    + background(world + vec2(offset.x,-offset.y)) * 0.15
    + background(world + vec2(-offset.x,offset.y)) * 0.15;
}
void main() {
  vec2 p = vec2(gl_FragCoord.x / u_resolution.x, 1.0-gl_FragCoord.y / u_resolution.y) * u_size;
  float d = field(p);
  float pixel = max(u_size.x/u_resolution.x, u_size.y/u_resolution.y);
  float inside = 1.0-smoothstep(-pixel*0.75, pixel*0.75, d);
  float shadowDistance = field(p-vec2(0.0,3.0));
  float shadow = exp(-max(shadowDistance,0.0)/4.0) * 0.20 * (1.0-inside);
  if (inside <= 0.0) { OUTPUT = vec4(0.0,0.0,0.0,shadow); return; }
  float e = max(pixel,0.65);
  vec2 gradient = vec2(surfaceHeight(p+vec2(e,0.0))-surfaceHeight(p-vec2(e,0.0)),
                       surfaceHeight(p+vec2(0.0,e))-surfaceHeight(p-vec2(0.0,e))) / (2.0*e);
  vec3 normal = normalize(vec3(-gradient,1.0));
  vec3 ray = refract(vec3(0.0,0.0,-1.0), normal, 1.0/1.47);
  vec2 offset = ray.xy * (surfaceHeight(p)+17.0) / max(0.2,-ray.z) * u_refraction;
  vec3 glass = frostedBackground(u_origin+p+offset);
  glass = mix(glass, u_tint.rgb, u_tint.a);
  vec2 outward = normalize(vec2(field(p+vec2(e,0.0))-field(p-vec2(e,0.0)),
                                field(p+vec2(0.0,e))-field(p-vec2(0.0,e))) + vec2(0.00001));
  float rim = exp(-abs(d) / max(0.6,pixel*0.85));
  float light = 0.20+0.80*max(dot(outward,normalize(vec2(-0.6,-0.8))),0.0);
  float shine = pow(max(dot(normal,normalize(vec3(-0.35,-0.6,1.7))),0.0),55.0)*0.09;
  float fresnel = pow(1.0-normal.z,3.0)*0.12;
  glass += vec3(shine+fresnel+rim*light*(0.44+u_active*0.15));
  // Canvas uses premultiplied alpha: only the material and its shadow cover DOM.
  OUTPUT = vec4(glass*inside, inside+shadow);
}`;

/** CSS-pixel geometry; caller owns backing size, image loading and scheduling. */
export function createSearchGlassRenderer(canvas: HTMLCanvasElement, image: HTMLImageElement): {
  draw(frame: SearchGlassFrame): void;
  dispose(): void;
} | null {
  if (!image.naturalWidth || !image.naturalHeight) return null;
  const options = { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, preserveDrawingBuffer: false };
  let gl2: WebGL2RenderingContext | null;
  let gl: WebGLRenderingContext | WebGL2RenderingContext | null;
  try {
    gl2 = canvas.getContext("webgl2", options) as WebGL2RenderingContext | null;
    gl = gl2 ?? canvas.getContext("webgl", options) as WebGLRenderingContext | null;
  } catch { return null; }
  if (!gl) return null;
  const context = gl;
  const shaders: WebGLShader[] = [];
  let program: WebGLProgram | null = null;
  let buffer: WebGLBuffer | null = null;
  let texture: WebGLTexture | null = null;
  let disposed = false;
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    shaders.forEach((shader) => context.deleteShader(shader));
    if (buffer) context.deleteBuffer(buffer);
    if (texture) context.deleteTexture(texture);
    if (program) context.deleteProgram(program);
  };
  const vertexSource = gl2
    ? "#version 300 es\nin vec2 a_position;void main(){gl_Position=vec4(a_position,0.0,1.0);}"
    : "attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0.0,1.0);}";
  const fragmentSource = gl2
    ? "#version 300 es\n" + fragmentBody.replace("precision highp float;", "precision highp float;\nout vec4 outColor;").replaceAll("SAMPLE", "texture").replaceAll("OUTPUT", "outColor")
    : fragmentBody.replaceAll("SAMPLE", "texture2D").replaceAll("OUTPUT", "gl_FragColor");
  try {
    for (const [type, source] of [[context.VERTEX_SHADER, vertexSource], [context.FRAGMENT_SHADER, fragmentSource]] as const) {
      const shader = context.createShader(type);
      if (!shader) { dispose(); return null; }
      shaders.push(shader);
      context.shaderSource(shader, source);
      context.compileShader(shader);
      if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) { dispose(); return null; }
    }
    program = context.createProgram();
    if (!program) { dispose(); return null; }
    shaders.forEach((shader) => context.attachShader(program!, shader));
    context.linkProgram(program);
    if (!context.getProgramParameter(program, context.LINK_STATUS)) { dispose(); return null; }
    buffer = context.createBuffer();
    texture = context.createTexture();
    if (!buffer || !texture) { dispose(); return null; }
    context.useProgram(program);
    context.bindBuffer(context.ARRAY_BUFFER, buffer);
    context.bufferData(context.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), context.STATIC_DRAW);
    const position = context.getAttribLocation(program, "a_position");
    if (position < 0) { dispose(); return null; }
    context.enableVertexAttribArray(position);
    context.vertexAttribPointer(position, 2, context.FLOAT, false, 0, 0);
    context.activeTexture(context.TEXTURE0);
    context.bindTexture(context.TEXTURE_2D, texture);
    context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, true);
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.LINEAR);
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.LINEAR);
    context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, context.RGBA, context.UNSIGNED_BYTE, image);
    context.uniform1i(context.getUniformLocation(program, "u_image"), 0);
    context.uniform2f(context.getUniformLocation(program, "u_imageSize"), image.naturalWidth, image.naturalHeight);
    if (context.getError() !== context.NO_ERROR) { dispose(); return null; }
    const names = ["u_resolution", "u_size", "u_viewport", "u_origin", "u_pill", "u_radius", "u_button", "u_blend", "u_active", "u_refraction", "u_frost", "u_tint", "u_dark"] as const;
    const uniforms = Object.fromEntries(names.map((name) => [name, context.getUniformLocation(program!, name)]));
    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
    return {
      draw(frame) {
        if (disposed || context.isContextLost() || frame.width <= 0 || frame.height <= 0 || !canvas.width || !canvas.height) return;
        context.viewport(0, 0, canvas.width, canvas.height);
        context.useProgram(program);
        context.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
        context.uniform2f(uniforms.u_size, frame.width, frame.height);
        context.uniform2f(uniforms.u_viewport, Math.max(1, frame.viewportWidth), Math.max(1, frame.viewportHeight));
        context.uniform2f(uniforms.u_origin, frame.originX, frame.originY);
        context.uniform4f(uniforms.u_pill, frame.pill.x, frame.pill.y, Math.max(0.01, frame.pill.width), Math.max(0.01, frame.pill.height));
        context.uniform1f(uniforms.u_radius, Math.max(0, frame.pill.radius));
        context.uniform3f(uniforms.u_button, frame.button.x, frame.button.y, Math.max(0.01, frame.button.radius));
        context.uniform1f(uniforms.u_blend, Math.max(0, frame.blend));
        context.uniform1f(uniforms.u_active, clamp(frame.active, 0, 1));
        context.uniform1f(uniforms.u_refraction, clamp(frame.refraction, 0, 100) / 100);
        context.uniform1f(uniforms.u_frost, clamp(frame.frost, 0, 12));
        context.uniform4f(uniforms.u_tint, ...frame.tint.map((value) => clamp(value, 0, 1)) as [number, number, number, number]);
        context.uniform1f(uniforms.u_dark, frame.dark ? 1 : 0);
        context.drawArrays(context.TRIANGLES, 0, 6);
      },
      dispose,
    };
  } catch { dispose(); return null; }
}
