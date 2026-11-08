// Shared spark particles for the laser-cut effects. One fixed, click-through
// canvas covers the viewport; it only animates while sparks are alive.

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let raf = 0;
const sparks: Spark[] = [];

function resize() {
  if (!canvas || !ctx) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function ensureCanvas() {
  if (canvas) return;
  canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, { position: "fixed", inset: "0", pointerEvents: "none", zIndex: "40" });
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");
  resize();
  window.addEventListener("resize", resize);
}

function step() {
  if (!ctx) return;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.globalCompositeOperation = "lighter";
  ctx.lineCap = "round";
  for (let i = sparks.length - 1; i >= 0; i--) {
    const s = sparks[i];
    s.vy += 0.25;
    s.vx *= 0.985;
    s.x += s.vx;
    s.y += s.vy;
    s.life -= 1;
    if (s.life <= 0) {
      sparks.splice(i, 1);
      continue;
    }
    // White-yellow when fresh, cooling to deep orange
    const t = s.life / s.maxLife;
    const g = Math.round(110 + 140 * t);
    const b = Math.round(40 + 160 * t * t);
    ctx.strokeStyle = `rgba(255, ${g}, ${b}, ${Math.min(1, t * 1.4)})`;
    ctx.lineWidth = 0.8 + t * 1.2;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.vx * 1.6, s.y - s.vy * 1.6);
    ctx.stroke();
  }
  raf = sparks.length ? requestAnimationFrame(step) : 0;
}

/** Throw a burst of sparks from a point in viewport (client) coordinates. */
export function emitSparks(x: number, y: number, intensity = 1) {
  ensureCanvas();
  const count = Math.round((4 + Math.random() * 4) * intensity);
  for (let i = 0; i < count; i++) {
    // Most of the dross blows down through the cut; some spits back up off the plate.
    const down = Math.random() < 0.7;
    const angle = (down ? 0.15 : -0.85) * Math.PI + Math.random() * Math.PI * 0.7;
    const speed = 2 + Math.random() * 6;
    const maxLife = 20 + Math.random() * 35;
    sparks.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: maxLife, maxLife });
  }
  if (!raf) raf = requestAnimationFrame(step);
}

/** Map a point in an SVG's user space to viewport coordinates. */
export function svgToClient(svg: SVGSVGElement, x: number, y: number) {
  const ctm = svg.getScreenCTM();
  if (!ctm) return null;
  const pt = new DOMPoint(x, y).matrixTransform(ctm);
  return { x: pt.x, y: pt.y };
}

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
