'use client';

import { useEffect, useRef } from 'react';
import { Mesh, Program, Renderer, Triangle } from 'ogl';

type DarkVeilProps = { hueShift?: number; noiseIntensity?: number; scanlineIntensity?: number; speed?: number; scanlineFrequency?: number; warpAmount?: number; className?: string };

const vertex = `attribute vec2 position; attribute vec2 uv; varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position,0.,1.); }`;
const fragment = `precision highp float; varying vec2 vUv; uniform float uTime,uHue,uNoise,uScan,uFrequency,uWarp; float rand(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);} void main(){ vec2 uv=vUv-.5; float wave=(sin(uv.x*5.+uTime*.35)*.10+cos(uv.y*6.-uTime*.22)*.08)*uWarp; uv.x+=wave; float veil=smoothstep(.75,.05,length(uv)); float scan=sin((vUv.y+uTime*.025)*850.*uFrequency)*uScan; float grain=(rand(vUv*300.+uTime)-.5)*uNoise; float hue=clamp(uHue/100.,-1.,1.); vec3 blue=vec3(.035,.16,.46)+vec3(hue*.02,hue*.015,hue*.04); vec3 color=mix(vec3(.004,.008,.018),blue,veil*.68)+scan+grain; float alpha=veil*.82+abs(scan)*.35; gl_FragColor=vec4(color,clamp(alpha,0.,.88)); }`;

export const DarkVeil: React.FC<DarkVeilProps> = ({ hueShift = 31, noiseIntensity = 0, scanlineIntensity = 0.02, speed = 0.35, scanlineFrequency = 0.7, warpAmount = 0.6, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const renderer = new Renderer({ alpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const program = new Program(gl, {
      vertex, fragment, transparent: true, depthTest: false, depthWrite: false,
      uniforms: { uTime: { value: 0 }, uHue: { value: hueShift }, uNoise: { value: noiseIntensity }, uScan: { value: scanlineIntensity }, uFrequency: { value: scanlineFrequency }, uWarp: { value: warpAmount } },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    container.appendChild(gl.canvas);
    Object.assign(gl.canvas.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', pointerEvents: 'none' });
    let frame = 0;
    const resize = () => { if (container.clientWidth && container.clientHeight) renderer.setSize(container.clientWidth, container.clientHeight); };
    const render = (time: number) => { program.uniforms.uTime.value = time * 0.001 * speed; renderer.render({ scene: mesh }); frame = requestAnimationFrame(render); };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();
    frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); if (gl.canvas.parentElement === container) container.removeChild(gl.canvas); gl.getExtension('WEBGL_lose_context')?.loseContext(); };
  }, [hueShift, noiseIntensity, scanlineFrequency, scanlineIntensity, speed, warpAmount]);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
};

export default DarkVeil;
