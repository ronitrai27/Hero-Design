"use client";

import React, { useEffect, useRef } from "react";

export default function Hero2() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const heroEl = containerRef.current;
    const cv = canvasRef.current;
    if (!heroEl || !cv) return;

    // Use hero element style as target for CSS variables
    const root = heroEl.style;
    const docRoot = document.documentElement.style;

    const setM = heroEl.querySelector<HTMLElement>("#setM");
    const setN = heroEl.querySelector<HTMLElement>("#setN");
    const bm = heroEl.querySelector<HTMLButtonElement>("#bm");
    const bn = heroEl.querySelector<HTMLButtonElement>("#bn");

    const calm = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    const SINK = 240,
      RISE = 820,
      DEPTH = 0.27;

    const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
    const smooth = (a: number, b: number, x: number) => {
      x = clamp((x - a) / (b - a));
      return x * x * (3 - 2 * x);
    };

    let night = 1,
      target = 1,
      from = 1,
      start = -1e9,
      queued: number | null = null,
      swapped = true,
      k = 1,
      k2 = 1,
      surge = 0,
      animating = false,
      clock = 0,
      rafId = 0;

    // Initialize WebGL2 context
    const gl = cv.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
    });

    const U: Record<string, WebGLUniformLocation | null> = {};

    if (gl) {
      const vs = `#version 300 es
      void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);gl_Position=vec4(p*2.-1.,0,1);}`;

      const fs = `#version 300 es
      precision highp float;
      uniform vec2 R;uniform float T,S,K;out vec4 O;
      float h(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
        return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
      float fbm(vec2 p){float a=.5,s=0.;mat2 m=mat2(1.6,1.2,-1.2,1.6);p=mat2(.8,.6,-.6,.8)*p+5.3;for(int i=0;i<5;i++){s+=a*n(p);p=m*p;a*=.5;}return s;}
      void main(){
        vec2 uv=gl_FragCoord.xy/R;uv.y=1.-uv.y;
        float asp=R.x/R.y;vec2 p=vec2(uv.x*asp,uv.y);
        float t=T*.05;
        vec2 w=vec2(fbm(p*1.3+vec2(t,-t*.6)),fbm(p*1.3+vec2(-t*.8,t)+7.));
        float d=fbm(p*1.9+w*1.7+vec2(t*1.6,-t*1.1+S*.5));
        float e=fbm(p*.9-w+vec2(-t,t*.5)+3.);
        float low=smoothstep(.70,1.04,uv.y+(d-.5)*.34);
        float side=smoothstep(.2,.0,uv.x+(e-.5)*.28)+smoothstep(.8,1.,uv.x+(e-.5)*.28);
        side*=smoothstep(.25,.6,uv.y)*.2;
        float wisps=smoothstep(.5,.78,d)*smoothstep(.22,.5,uv.y)*smoothstep(.86,.6,uv.y)*.18;
        float rest=clamp(low+side+wisps,0.,1.);
        float front=1.02-S*.68;
        float rise=smoothstep(front-.02,front+.26,uv.y+(d-.5)*.5);
        float haze=S*(.3+.46*d);
        float a=clamp(max(rest,max(rise*.97,haze)),0.,1.);
        vec3 dayA=vec3(.97,.93,.84),dayB=vec3(.79,.78,.71);
        vec3 nitA=vec3(.40,.45,.57),nitB=vec3(.15,.19,.29);
        vec3 c=mix(mix(dayB,dayA,d*1.15),mix(nitB,nitA,d*1.1),K);
        float porch=exp(-dot((uv-vec2(.72,.74))*vec2(1.7,2.6),(uv-vec2(.72,.74))*vec2(1.7,2.6))*3.2);
        c=mix(c,vec3(.86,.55,.27),K*porch*.42*(1.-S));
        O=vec4(c*a,a);
      }`;

      const sh = (type: number, src: string) => {
        const o = gl.createShader(type)!;
        gl.shaderSource(o, src);
        gl.compileShader(o);
        if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) {
          console.error(gl.getShaderInfoLog(o));
        }
        return o;
      };

      const pr = gl.createProgram()!;
      gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs));
      gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(pr);
      gl.useProgram(pr);

      for (const u of ["R", "T", "S", "K"]) {
        U[u] = gl.getUniformLocation(pr, u);
      }
    }

    function size() {
      if (!gl || !cv) return;
      const w = Math.round(Math.min(window.innerWidth, 960));
      const h = Math.round((w * window.innerHeight) / window.innerWidth);
      if (cv.width !== w || cv.height !== h) {
        cv.width = w;
        cv.height = h;
        gl.viewport(0, 0, w, h);
      }
    }

    window.addEventListener("resize", size);
    size();

    function show(n: number) {
      if (setM && setN) {
        setM.classList.toggle("is-on", !n);
        setN.classList.toggle("is-on", !!n);
      }
    }

    function begin(n: number, now: number) {
      target = n;
      from = k;
      start = now;
      swapped = false;
      animating = true;
    }

    function pick(n: number) {
      if (n === target && queued === null) return;
      if (bm && bn) {
        bm.setAttribute("aria-pressed", String(!n));
        bn.setAttribute("aria-pressed", String(!!n));
      }
      if (calm) {
        target = night = n;
        k = k2 = n;
        show(n);
        applyVars(0, k, k2, 0);
        return;
      }
      if (animating) queued = n;
      else begin(n, clock);
    }

    if (bm) bm.onclick = () => pick(0);
    if (bn) bn.onclick = () => pick(1);

    function applyVars(sinkY: number, currentK: number, currentK2: number, currentDip: number) {
      const sinkStr = (sinkY * window.innerHeight).toFixed(1) + "px";
      const kStr = currentK.toFixed(3);
      const k2Str = currentK2.toFixed(3);
      const dipStr = currentDip.toFixed(3);

      root.setProperty("--sink", sinkStr);
      root.setProperty("--k", kStr);
      root.setProperty("--k2", k2Str);
      root.setProperty("--dip", dipStr);

      docRoot.setProperty("--sink", sinkStr);
      docRoot.setProperty("--k", kStr);
      docRoot.setProperty("--k2", k2Str);
      docRoot.setProperty("--dip", dipStr);
    }

    function frame(now: number) {
      clock = now;
      const d = now - start;
      let y = 0,
        s = 0,
        dip = 0;
      k2 = k;

      if (animating) {
        if (d < SINK) {
          const x = d / SINK;
          y = x * x * (3 - 2 * x) * DEPTH;
        } else {
          if (!swapped) {
            swapped = true;
            night = target;
            show(target);
          }
          const x = clamp((d - SINK) / RISE);
          y = Math.pow(1 - x, 3.4) * DEPTH;
        }
        s = smooth(0, SINK * 0.92, d) * (1 - smooth(SINK + 70, SINK + RISE * 0.92, d));
        dip = smooth(30, 190, d) * (1 - smooth(330, 720, d));
        k = from + (target - from) * smooth(120, 520, d);
        k2 = from + (target - from) * smooth(340, 760, d);
        if (d >= SINK + RISE) {
          animating = false;
          k = k2 = target;
          y = s = dip = 0;
          if (queued !== null && queued !== target) {
            const q = queued;
            queued = null;
            begin(q, now);
          } else {
            queued = null;
          }
        }
      }

      applyVars(y, k, k2, dip);

      if (gl && cv) {
        gl.uniform2f(U.R, cv.width, cv.height);
        gl.uniform1f(U.T, now / 1000);
        gl.uniform1f(U.S, s);
        gl.uniform1f(U.K, k);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
    }

    function loop(t: number) {
      frame(t);
      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", size);
      if (bm) bm.onclick = null;
      if (bn) bn.onclick = null;
    };
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&display=swap');

:root {
  --u: min(calc(100vw / 1600), calc(100vh / 900));
  --k: 1;
  --k2: 1;
  --dip: 0;
  --sink: 0px;
  --ink: color-mix(in srgb, #14202f calc((1 - var(--k)) * 100%), #fff);
  --nav: color-mix(in srgb, #1b2736 calc((1 - var(--k)) * 100%), #eef1f6);
  --soft: color-mix(in srgb, #1b2736 calc((1 - var(--k)) * 100%), #dfe5ee);
}

.hero-lumen * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.hero-lumen {
  position: relative;
  height: 100svh;
  min-height: 520px;
  overflow: hidden;
  isolation: isolate;
  background: #0b1426;
  font-family: "Instrument Sans", system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  width: 100%;
}

.hero-lumen a {
  color: inherit;
  text-decoration: none;
}

.hero-lumen button {
  font: inherit;
  color: inherit;
  background: none;
  border: 0;
  cursor: pointer;
}

.hero-lumen .layer,
.hero-lumen .layer img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.hero-lumen .layer img {
  display: block;
  object-fit: cover;
  object-position: 50% 62%;
}

.hero-lumen .sky img {
  filter: blur(calc(7 * var(--u)));
  transform: scale(1.05);
}

.hero-lumen #skyN {
  opacity: var(--k);
}

.hero-lumen .home {
  will-change: transform;
  transform: translate3d(0, var(--sink, 0px), 0);
}

.hero-lumen .home .set {
  position: absolute;
  inset: 0;
  visibility: hidden;
}

.hero-lumen .home .set.is-on {
  visibility: visible;
}

.hero-lumen .ground {
  -webkit-mask-image: linear-gradient(transparent 54%, #000 64%);
  mask-image: linear-gradient(transparent 54%, #000 64%);
}

.hero-lumen .tilt {
  position: absolute;
  inset: 0;
  pointer-events: none;
  -webkit-backdrop-filter: blur(calc(9 * var(--u)));
  backdrop-filter: blur(calc(9 * var(--u)));
  -webkit-mask-image: linear-gradient(transparent 70%, #000 92%);
  mask-image: linear-gradient(transparent 70%, #000 92%);
}

.hero-lumen #fog {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.hero-lumen .ui {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
}

.hero-lumen .ui a,
.hero-lumen .ui button {
  pointer-events: auto;
}

.hero-lumen .bar {
  width: 100%;
  display: flex;
  align-items: center;
  padding: calc(22 * var(--u)) calc(38 * var(--u)) 0;
  color: var(--nav);
}

.hero-lumen .logo {
  display: flex;
  align-items: center;
  gap: calc(9 * var(--u));
  font-size: calc(25 * var(--u));
  font-weight: 500;
  letter-spacing: -0.025em;
  color: var(--ink);
  flex: 1 1 0;
}

.hero-lumen .logo svg {
  width: calc(38 * var(--u));
  height: calc(38 * var(--u));
  flex: none;
}

.hero-lumen .links {
  display: flex;
  gap: calc(42 * var(--u));
  list-style: none;
  font-size: calc(16.5 * var(--u));
  font-weight: 500;
  opacity: calc(1 - var(--dip) * 0.82);
}

.hero-lumen .side {
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: calc(40 * var(--u));
  font-size: calc(16.5 * var(--u));
  font-weight: 500;
}

.hero-lumen .side > a:first-child {
  opacity: calc(1 - var(--dip) * 0.82);
}

.hero-lumen .cta {
  display: inline-flex;
  align-items: center;
  height: calc(46 * var(--u));
  padding: 0 calc(26 * var(--u));
  border-radius: 99px;
  background: color-mix(in srgb, #0d1117 calc((1 - var(--k)) * 100%), #fff);
  color: color-mix(in srgb, #fff calc((1 - var(--k)) * 100%), #0d1117);
  opacity: calc(1 - var(--dip) * 0.62);
  transition: transform 0.25s;
}

.hero-lumen .cta:hover {
  transform: translateY(-1px);
}

.hero-lumen h1 {
  margin-top: calc(58 * var(--u));
  text-align: center;
  font-size: calc(64 * var(--u));
  line-height: 1.09;
  font-weight: 500;
  letter-spacing: -0.022em;
  color: var(--ink);
}

.hero-lumen h1 span {
  display: block;
}

.hero-lumen h1 .l1,
.hero-lumen h1 .y {
  opacity: calc(1 - var(--dip) * 0.8);
}

.hero-lumen h1 i {
  font-style: normal;
  color: color-mix(
    in srgb,
    #14202f calc((1 - var(--k2)) * 42%),
    color-mix(in srgb, #fff calc(var(--k2) * 100%), #7c8794)
  );
}

.hero-lumen h1 .y {
  display: inline;
}

.hero-lumen .dock {
  margin-top: auto;
  padding-bottom: calc(40 * var(--u));
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-lumen .toggle {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: calc(524 * var(--u));
  height: calc(86 * var(--u));
  padding: calc(2 * var(--u));
  border-radius: calc(16 * var(--u));
  overflow: hidden;
  background: rgba(120, 132, 140, 0.34);
  border: 1px solid rgba(255, 255, 255, 0.2);
  -webkit-backdrop-filter: blur(calc(14 * var(--u)));
  backdrop-filter: blur(calc(14 * var(--u)));
}

.hero-lumen .toggle button {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: calc(3 * var(--u));
  border-radius: calc(13 * var(--u));
  color: #fff;
  overflow: hidden;
}

.hero-lumen .toggle button:before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(160deg, #f7f8dc, #e2ee9f 90%);
  box-shadow: inset 0 0 calc(18 * var(--u)) rgba(255, 255, 255, 0.65);
  opacity: var(--on);
}

.hero-lumen .toggle b,
.hero-lumen .toggle small {
  position: relative;
  color: color-mix(in srgb, #1c2316 calc(var(--on) * 100%), #fff);
}

.hero-lumen .toggle b {
  font-size: calc(23 * var(--u));
  font-weight: 500;
  letter-spacing: -0.012em;
}

.hero-lumen .toggle small {
  font-size: calc(15 * var(--u));
  opacity: 0.72;
}

.hero-lumen .toggle button:focus-visible {
  outline: 2px solid #fff;
  outline-offset: -4px;
}

.hero-lumen #bm {
  --on: calc(1 - var(--k));
}

.hero-lumen #bn {
  --on: var(--k);
}

.hero-lumen .cap {
  margin-top: calc(22 * var(--u));
  text-align: center;
  font-size: calc(16.4 * var(--u));
  line-height: 1.3;
  color: var(--soft);
}

@media (max-width: 820px) {
  :root {
    --u: 1px;
  }
  .hero-lumen .bar {
    padding: 16px 16px 0;
  }
  .hero-lumen .logo {
    font-size: 21px;
  }
  .hero-lumen .logo svg {
    width: 32px;
    height: 32px;
  }
  .hero-lumen .links,
  .hero-lumen .side > a:first-child {
    display: none;
  }
  .hero-lumen .cta {
    height: 40px;
    padding: 0 16px;
    font-size: 14px;
  }
  .hero-lumen h1 {
    margin-top: 34px;
    padding: 0 16px;
    font-size: clamp(34px, 10.4vw, 56px);
  }
  .hero-lumen .layer img,
  .hero-lumen .home .cut {
    object-position: 72% 62% !important;
  }
  .hero-lumen .dock {
    width: 100%;
    padding: 0 16px 24px;
  }
  .hero-lumen .toggle {
    width: 100%;
    max-width: 440px;
    height: 74px;
  }
  .hero-lumen .toggle b {
    font-size: 19px;
  }
  .hero-lumen .toggle small {
    font-size: 13px;
  }
  .hero-lumen .cap {
    font-size: 14px;
    max-width: 360px;
  }
  .hero-lumen .cap br {
    display: none;
  }
}
`,
        }}
      />
      <main ref={containerRef} className="hero hero-lumen">
        {/* Layer 1: Blurred Sky (Morning + Night) */}
        <div className="layer sky">
          <img
            id="skyM"
            alt=""
            src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_040343_a73684b4-3f71-4613-a843-c8be80fb1211.png&w=1600&q=80"
          />
          <img
            id="skyN"
            alt=""
            src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_040308_f31964ab-ed8e-4ea4-90eb-3226c0859936.png&w=1600&q=80"
          />
        </div>

        {/* Layer 2: Moving Home & Grounds */}
        <div className="layer home">
          {/* Morning Set */}
          <div className="set" id="setM">
            <div className="layer ground">
              <img
                alt=""
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_040259_1be34093-835e-4de4-b3a8-f875e6a74591.png&w=2560&q=85"
              />
            </div>
            <img
              className="cut"
              alt="A charcoal farmhouse with solar panels in soft morning light"
              src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_040416_e3b05fa4-cc80-4a43-afde-8a0a053933e9.png&w=2560&q=85"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "50% 62%",
              }}
            />
          </div>

          {/* Night Set (Active Initially) */}
          <div className="set is-on" id="setN">
            <div className="layer ground">
              <img
                alt=""
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_040211_c8fd4865-285e-4c1f-8a37-4bfe0771357b.png&w=2560&q=85"
              />
            </div>
            <img
              className="cut"
              alt="The same farmhouse at dusk with warm amber windows"
              src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_040415_2ab95096-8c39-449f-b36c-17c2813815a4.png&w=2560&q=85"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "50% 62%",
              }}
            />
          </div>
        </div>

        {/* Layer 3: Tilt-shift foreground blur */}
        <div className="tilt" />

        {/* Layer 4: WebGL2 Live Fog Shader Canvas */}
        <canvas id="fog" ref={canvasRef} aria-hidden="true" />

        {/* Layer 5: UI Overlay */}
        <div className="ui">
          {/* Header Bar */}
          <header className="bar">
            <a className="logo" href="#" aria-label="Lumen Roof">
              <svg viewBox="0 0 40 40" aria-hidden="true">
                <g fill="color-mix(in srgb,#6d8f2a calc((1 - var(--k))*100%),#d8ee8e)">
                  <circle cx="20" cy="20" r="0" />
                  <path id="ray" d="M18.3 3.5h3.4l.9 8.4h-5.2Z" />
                  <use href="#ray" transform="rotate(30 20 20)" />
                  <use href="#ray" transform="rotate(60 20 20)" />
                  <use href="#ray" transform="rotate(90 20 20)" />
                  <use href="#ray" transform="rotate(120 20 20)" />
                  <use href="#ray" transform="rotate(150 20 20)" />
                  <use href="#ray" transform="rotate(180 20 20)" />
                  <use href="#ray" transform="rotate(210 20 20)" />
                  <use href="#ray" transform="rotate(240 20 20)" />
                  <use href="#ray" transform="rotate(270 20 20)" />
                  <use href="#ray" transform="rotate(300 20 20)" />
                  <use href="#ray" transform="rotate(330 20 20)" />
                </g>
              </svg>
              Lumen Roof
            </a>
            <ul className="links">
              <li>
                <a href="#">How It Works</a>
              </li>
              <li>
                <a href="#">Our Cases</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Resources</a>
              </li>
            </ul>
            <div className="side">
              <a href="#">Customers</a>
              <a className="cta" href="#">
                Get an Instant Quote
              </a>
            </div>
          </header>

          {/* Centered Headline */}
          <h1>
            <span className="l1">$0 Electricity Bills</span>
            <span>
              <i>for the next</i> <span className="y">7 Years</span>
            </span>
          </h1>

          {/* Bottom Dock: Toggle & Caption */}
          <div className="dock">
            <div className="toggle" role="group" aria-label="Time of day">
              <button id="bm" aria-pressed={false}>
                <b>Morning</b>
                <small>$0 for Electricity</small>
              </button>
              <button id="bn" aria-pressed={true}>
                <b>Night</b>
                <small>$0 for Electricity</small>
              </button>
            </div>
            <p className="cap">
              Forget the energy market, weather conditions and seasons. Our Smart
              <br />
              Controller guarantees you get no electricity bill for seven years.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

