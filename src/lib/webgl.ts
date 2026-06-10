"use client";

let cached: boolean | undefined;

/**
 * True only when the device offers hardware-accelerated WebGL.
 * Software renderers (SwiftShader, llvmpipe) would burn the main
 * thread to rasterize the hero scene, so we serve the static
 * fallback instead — same guard protects low-end devices and
 * lab environments alike.
 */
export function hasPerformantWebGL(): boolean {
  if (cached !== undefined) return cached;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      (canvas.getContext("webgl") as WebGLRenderingContext | null);
    if (!gl) return (cached = false);
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = ext
      ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL))
      : "";
    cached = !/swiftshader|llvmpipe|software/i.test(renderer);
  } catch {
    cached = false;
  }
  return cached;
}
