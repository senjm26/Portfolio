"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

// Timeline wrapper whose spine is a TIG weld bead, laid down as you scroll.
// The bead is drawn procedurally onto a canvas: irregular stacked ripples, a
// faint heat tint that wraps round both ends, toe lines, the odd bit of spatter,
// and a round rosette weld at each card as the timeline marker.

const TRACK_W = 48; // CSS px - bead plus heat-affected zone
const NODE_R = 1.55; // rosette radius, in bead half-widths
const HAZ_REACH = 1.7; // how far the heat tint spreads past the toe, in bead half-widths

// Space kept above the first rosette and below the last for their heat tint
const trackPad = (beadW: number) => Math.ceil((beadW / 2) * (NODE_R + HAZ_REACH * 1.25));

type RGBA = [number, number, number, number];
type Stops = [number, RGBA][];

// Heat discoloration in the parent metal, by distance out from the toe (0 → 1):
// a dull straw-grey that fades out, no temper rainbow
const HAZ_STOPS: Stops = [
  [0, [140, 128, 108, 0.34]],
  [0.3, [125, 118, 108, 0.22]],
  [0.7, [115, 115, 120, 0.09]],
  [1, [115, 115, 120, 0]],
];

// Small seeded PRNG so the bead looks the same on every redraw
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Smooth 1D noise in [-1, 1] built from a few out-of-phase sines
function makeNoise(rand: () => number, scale: number) {
  const p = [rand(), rand(), rand()].map((v) => v * Math.PI * 2);
  return (y: number) =>
    0.5 * Math.sin(y / (37 * scale) + p[0]) + 0.3 * Math.sin(y / (13 * scale) + p[1]) + 0.2 * Math.sin(y / (5.3 * scale) + p[2]);
}

// Piecewise-linear lookup into a list of color stops
function sampleStops(stops: Stops, t: number): RGBA {
  if (t <= stops[0][0]) return stops[0][1];
  for (let i = 1; i < stops.length; i++) {
    const [o1, c1] = stops[i];
    if (t <= o1) {
      const [o0, c0] = stops[i - 1];
      const k = (t - o0) / (o1 - o0);
      return c0.map((v, j) => v + (c1[j] - v) * k) as RGBA;
    }
  }
  return stops[stops.length - 1][1];
}

// Round rosette weld: concentric ripples spiralling in to a crater, lit from the top left
function drawRosette(ctx: CanvasRenderingContext2D, nx: number, ny: number, R: number, rand: () => number) {
  const disc = new Path2D();
  disc.arc(nx, ny, R, 0, Math.PI * 2);

  const body = ctx.createRadialGradient(nx - R * 0.35, ny - R * 0.4, R * 0.1, nx, ny, R);
  body.addColorStop(0, "#f2f3f4");
  body.addColorStop(0.45, "#b8bcc1");
  body.addColorStop(0.85, "#7c8187");
  body.addColorStop(1, "#5b5f65");
  ctx.fillStyle = body;
  ctx.fill(disc);

  ctx.save();
  ctx.clip(disc);
  const rings = 5;
  const spin = rand() * Math.PI * 2;
  for (let k = 0; k < rings; k++) {
    const r = R * (1 - (k + 0.4) / (rings + 0.8)) * (0.96 + rand() * 0.08);
    const a = spin + k * 1.3;
    const ox = nx + Math.cos(a) * k * 0.22;
    const oy = ny + Math.sin(a) * k * 0.22;

    ctx.beginPath();
    ctx.arc(ox, oy, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(20,22,26,${0.3 + rand() * 0.2})`;
    ctx.lineWidth = 0.6;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(ox, oy, r - 0.8, Math.PI * (1.02 + rand() * 0.1), Math.PI * (1.5 + rand() * 0.12));
    ctx.strokeStyle = `rgba(255,255,255,${0.4 + rand() * 0.3})`;
    ctx.lineWidth = 0.6;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(ox, oy, r - 0.9, Math.PI * 0.05, Math.PI * 0.6);
    ctx.strokeStyle = "rgba(20,22,26,0.18)";
    ctx.lineWidth = 0.9;
    ctx.stroke();
  }

  // Crater in the middle, lit on its far rim
  const crater = ctx.createRadialGradient(nx, ny - R * 0.05, 0, nx, ny, R * 0.22);
  crater.addColorStop(0, "rgba(25,27,31,0.55)");
  crater.addColorStop(1, "rgba(25,27,31,0)");
  ctx.fillStyle = crater;
  ctx.beginPath();
  ctx.arc(nx, ny, R * 0.22, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(nx, ny, R * 0.18, Math.PI * 0.15, Math.PI * 0.85);
  ctx.strokeStyle = "rgba(255,255,255,0.6)";
  ctx.lineWidth = 0.5;
  ctx.stroke();

  // Soft inner shadow so the disc reads as domed
  ctx.strokeStyle = "rgba(20,22,26,0.08)";
  for (let k = 1; k <= 3; k++) {
    ctx.lineWidth = R * 0.18 * k;
    ctx.stroke(disc);
  }
  ctx.restore();

  ctx.strokeStyle = "rgba(30,30,34,0.45)";
  ctx.lineWidth = 0.6;
  ctx.stroke(disc);
}

function drawBead(canvas: HTMLCanvasElement, height: number, beadW: number, seed: number, nodeYs: number[]) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = TRACK_W * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${TRACK_W}px`;
  canvas.style.height = `${height}px`;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, TRACK_W, height);

  const rand = mulberry32(seed);
  const widthNoise = makeNoise(rand, 1);
  const wander = makeNoise(rand, 3);
  const hazNoise = makeNoise(rand, 2);
  const speedNoise = makeNoise(rand, 2.5);
  const dullNoise = makeNoise(rand, 1.6);
  const cx0 = TRACK_W / 2;
  const hw = beadW / 2;

  const reach = hw * HAZ_REACH;
  const nodeR = hw * NODE_R;
  const centerAt = (y: number) => cx0 + wander(y) * 0.9;
  const nodes = nodeYs.map((ny) => ({ x: centerAt(ny), y: ny }));

  // The bead runs from the first rosette to the last, its ends tucked under them.
  // Without markers it fills the track, leaving room for the tint to wrap round.
  const pad = trackPad(beadW);
  const bridged = nodes.length > 1;
  const beadStart = bridged ? nodes[0].y : pad;
  const beadEnd = bridged ? nodes[nodes.length - 1].y : height - pad;
  const taper = hw * (bridged ? 0.9 : 1.6);

  const halfWidthAt = (y: number) => {
    // Domed start, and pulls in to the crater at the end
    const d = Math.min(y - beadStart, beadEnd - y);
    if (d <= 0) return 0;
    let w = hw * (1 + 0.07 * widthNoise(y));
    if (d < taper) w *= Math.sqrt(1 - ((taper - d) / taper) ** 2);
    return w;
  };

  // Outline of the bead as one smooth path, so its edges and ends anti-alias cleanly
  const beadPath = new Path2D();
  const STEP = 0.5;
  beadPath.moveTo(centerAt(beadStart), beadStart);
  for (let y = beadStart; y <= beadEnd; y += STEP) beadPath.lineTo(centerAt(y) - halfWidthAt(y), y);
  beadPath.lineTo(centerAt(beadEnd), beadEnd);
  for (let y = beadEnd; y >= beadStart; y -= STEP) beadPath.lineTo(centerAt(y) + halfWidthAt(y), y);
  beadPath.closePath();

  const cs = new Float32Array(height + 1);
  const rs = new Float32Array(height + 1);
  for (let y = 0; y <= height; y++) {
    cs[y] = centerAt(y);
    rs[y] = halfWidthAt(y);
  }

  // Heat-affected zone, as a distance field from the bead and rosette outlines so
  // the tint wraps round the ends and the markers instead of stopping square.
  // Drawn at CSS resolution and scaled up; it's soft anyway.
  const haz = document.createElement("canvas");
  haz.width = TRACK_W;
  haz.height = height;
  const hctx = haz.getContext("2d");
  if (hctx) {
    const img = hctx.createImageData(TRACK_W, height);
    const win = Math.ceil(hw + reach);
    for (let y = 0; y < height; y++) {
      const r = reach * (1 + 0.22 * hazNoise(y));
      const y0 = Math.max(y - win, beadStart);
      const y1 = Math.min(y + win, beadEnd);
      const near = nodes.filter((n) => Math.abs(n.y - y) < nodeR + r);
      for (let x = 0; x < TRACK_W; x++) {
        let d = Infinity;
        for (let yy = y0; yy <= y1; yy++) {
          if (rs[yy] <= 0) continue;
          const dd = Math.hypot(x + 0.5 - cs[yy], y + 0.5 - yy) - rs[yy];
          if (dd < d) d = dd;
        }
        for (const n of near) d = Math.min(d, Math.hypot(x + 0.5 - n.x, y + 0.5 - n.y) - nodeR);
        if (d >= r) continue;
        const c = sampleStops(HAZ_STOPS, Math.max(d, 0) / r);
        const i = (y * TRACK_W + x) * 4;
        img.data[i] = c[0];
        img.data[i + 1] = c[1];
        img.data[i + 2] = c[2];
        img.data[i + 3] = c[3] * 255;
      }
    }
    hctx.putImageData(img, 0, 0);
    ctx.drawImage(haz, 0, 0, TRACK_W, height);
  }

  // Bead body: rounded crown shading across the width
  const crown = ctx.createLinearGradient(cx0 - hw, 0, cx0 + hw, 0);
  crown.addColorStop(0, "#55595f");
  crown.addColorStop(0.16, "#8f949a");
  crown.addColorStop(0.36, "#d3d6da");
  crown.addColorStop(0.45, "#f8f9fa");
  crown.addColorStop(0.56, "#cdd0d4");
  crown.addColorStop(0.84, "#8a8f95");
  crown.addColorStop(1, "#565a60");
  ctx.fillStyle = crown;
  ctx.fill(beadPath);

  // Everything on the bead's surface stays inside its outline
  ctx.save();
  ctx.clip(beadPath);

  // Ripples: overlapping crescents ("stack of dimes"), convex back toward where
  // the weld started. Each later puddle laps over the one before it. Travel
  // speed drifts and every dab differs a little, so no two runs look alike.
  let y = beadStart - hw * 0.2;
  while (y < beadEnd - hw * 0.5) {
    const pitch = hw * Math.max(0.45, 0.72 + 0.2 * speedNoise(y) + (rand() - 0.5) * 0.3);
    const cx = centerAt(y) + (rand() - 0.5) * 0.7;
    const w = Math.max(halfWidthAt(y), halfWidthAt(y + pitch), hw * 0.35) * (1 + rand() * 0.05);
    const ry = w * (0.75 + rand() * 0.4);
    const tilt = (rand() - 0.5) * 0.16;
    const lit = 0.7 + rand() * 0.55;
    const arc = (dy: number, sw: number, a0: number, a1: number) => {
      ctx.beginPath();
      ctx.ellipse(cx, y + ry + dy, w * sw, ry, tilt, Math.PI * a0, Math.PI * a1);
    };

    // Puddle surface: bright just behind the crest, falling into shadow
    const shade = ctx.createLinearGradient(0, y, 0, y + ry);
    shade.addColorStop(0, `rgba(255,255,255,${0.42 * lit})`);
    shade.addColorStop(0.3, `rgba(255,255,255,${0.1 * lit})`);
    shade.addColorStop(0.7, "rgba(15,17,20,0.12)");
    shade.addColorStop(1, `rgba(15,17,20,${0.2 + rand() * 0.15})`);
    arc(0, 1, 1, 2);
    ctx.closePath();
    ctx.fillStyle = shade;
    ctx.fill();

    // Fine solidification lines following the crest
    ctx.lineWidth = 0.35;
    const lines = 2 + Math.floor(rand() * 3);
    for (let k = 1; k <= lines; k++) {
      arc(pitch * (0.18 + rand() * 0.1) * k, 1 - 0.04 * k, 1.04, 1.96);
      ctx.strokeStyle = k % 2 ? "rgba(20,22,26,0.14)" : "rgba(255,255,255,0.18)";
      ctx.stroke();
    }

    // Dark lap line where this puddle meets the previous one
    arc(0, 1, 1.02, 1.98);
    ctx.strokeStyle = `rgba(20,22,26,${0.3 + rand() * 0.3})`;
    ctx.lineWidth = 0.6;
    ctx.stroke();

    // Specular glint on the crest, offset toward the light
    arc(0.6, 0.78, 1.1 + rand() * 0.12, 1.42 + rand() * 0.18);
    ctx.strokeStyle = `rgba(255,255,255,${0.35 + rand() * 0.4})`;
    ctx.lineWidth = 0.6;
    ctx.stroke();

    y += pitch;
  }

  // Duller and brighter patches along the length, like real oxide and polish
  for (let yy = beadStart; yy < beadEnd; yy++) {
    const n = dullNoise(yy);
    if (n > 0.2) ctx.fillStyle = `rgba(45,47,52,${(n - 0.2) * 0.3})`;
    else if (n < -0.35) ctx.fillStyle = `rgba(255,255,255,${(-n - 0.35) * 0.3})`;
    else continue;
    ctx.fillRect(cs[yy] - hw * 1.2, yy, hw * 2.4, 1);
  }

  // Crater where the arc was broken at the end of the pass, lit on its far rim
  const craterY = beadEnd - hw * 0.75;
  const craterX = centerAt(craterY);
  const crater = ctx.createRadialGradient(craterX, craterY - hw * 0.1, 0, craterX, craterY, hw * 0.6);
  crater.addColorStop(0, "rgba(25,27,31,0.5)");
  crater.addColorStop(0.7, "rgba(25,27,31,0.18)");
  crater.addColorStop(1, "rgba(25,27,31,0)");
  ctx.fillStyle = crater;
  ctx.beginPath();
  ctx.arc(craterX, craterY, hw * 0.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(craterX, craterY, hw * 0.5, Math.PI * 0.15, Math.PI * 0.85);
  ctx.strokeStyle = "rgba(255,255,255,0.6)";
  ctx.lineWidth = 0.6;
  ctx.stroke();

  // Soft inner shadow round the outline, so the sides and both ends read as domed
  ctx.strokeStyle = "rgba(20,22,26,0.09)";
  for (let k = 1; k <= 4; k++) {
    ctx.lineWidth = hw * 0.32 * k;
    ctx.stroke(beadPath);
  }

  ctx.restore();

  // Toe lines where the bead wets into the parent metal
  ctx.strokeStyle = "rgba(30,30,34,0.4)";
  ctx.lineWidth = 0.6;
  ctx.stroke(beadPath);

  for (const n of nodes) drawRosette(ctx, n.x, n.y, nodeR, rand);

  // A few spatter balls off to the sides
  const spatter = Math.floor(height / 120);
  for (let i = 0; i < spatter; i++) {
    const sy = beadStart + rand() * (beadEnd - beadStart);
    const side = rand() < 0.5 ? -1 : 1;
    const sx = centerAt(sy) + side * (hw + 3 + rand() * hw * 1.4);
    const r = 0.45 + rand() * 0.7;
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.fillStyle = "#5a5e65";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(sx - r * 0.3, sy - r * 0.3, r * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(240,242,245,0.8)";
    ctx.fill();
  }
}

export default function WeldTimeline({
  children,
  className = "",
  seed = 7,
}: {
  children: ReactNode;
  className?: string;
  seed?: number;
}) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 75%"],
  });
  // The weld only ever advances: scrolling back up leaves the bead in place,
  // and once the pass reaches the end it stays finished
  const progress = useMotionValue(0);
  const [done, setDone] = useState(false);
  const advance = (v: number) => {
    if (v <= progress.get()) return;
    progress.set(v);
    if (v >= 0.995) setDone(true);
  };
  useMotionValueEvent(scrollYProgress, "change", advance);
  useEffect(() => advance(scrollYProgress.get()));

  const beadHeight = useTransform(progress, (v) => `${v * 100}%`);
  // The torch and its glow stop on the last rosette rather than running on into
  // the margin below it that's only there for the heat tint
  const trackH = useMotionValue(0);
  const endPad = useMotionValue(0);
  const torchY = useTransform([progress, trackH, endPad], ([v, h, p]: number[]) => Math.min(v * h, h - p));
  const lastNodeY = useTransform([trackH, endPad], ([h, p]: number[]) => h - p);
  const torchOn = useTransform(progress, [0, 0.01], [0, 1]);
  // Feather the leading edge so the bead and its heat tint don't stop on a hard
  // horizontal cut under the torch; sharpens up once the pass is finished
  const feather = useTransform(progress, [0.95, 1], [28, 0]);
  const leadMask = useMotionTemplate`linear-gradient(to bottom, #000 calc(100% - ${feather}px), transparent)`;

  useEffect(() => {
    const timeline = timelineRef.current;
    const track = trackRef.current;
    const canvas = canvasRef.current;
    if (!timeline || !track || !canvas) return;

    let lastKey = "";
    const redraw = () => {
      const md = window.innerWidth >= 768;
      const beadW = md ? 13 : 10;
      const pad = trackPad(beadW);
      // One rosette per card, level with its title (offsetTop ignores the cards' entrance transforms)
      const titleY = md ? 46 : 32;
      const titles = Array.from(timeline.children)
        .filter((el): el is HTMLElement => el instanceof HTMLElement && el !== track)
        .map((el) => Math.round(el.offsetTop + titleY));
      if (!titles.length) return;
      // Track spans first title to last, plus room for the tint round the end rosettes
      const top = titles[0] - pad;
      const height = titles[titles.length - 1] - titles[0] + pad * 2;
      const key = `${top}-${height}-${beadW}-${window.devicePixelRatio}-${titles.join(",")}`;
      if (key === lastKey) return;
      lastKey = key;
      track.style.top = `${top}px`;
      track.style.height = `${height}px`;
      trackH.set(height);
      endPad.set(pad);
      drawBead(
        canvas,
        height,
        beadW,
        seed,
        titles.map((t) => t - top),
      );
    };
    // Drawing the bead is a fair bit of work, so hold off until the timeline is
    // about a screen away instead of spending it during page load
    const ro = new ResizeObserver(redraw);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        redraw();
        ro.observe(timeline);
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(timeline);
    return () => {
      io.disconnect();
      ro.disconnect();
    };
  }, [seed, trackH, endPad]);

  const animate = !reduceMotion;

  return (
    <div ref={timelineRef} className={`relative ${className}`}>
      <div
        ref={trackRef}
        aria-hidden
        className="absolute left-3 md:left-6 -translate-x-1/2 top-0 pointer-events-none"
        style={{ width: TRACK_W }}
      >
        <motion.div style={{ height: animate ? beadHeight : "100%" }} className="relative">
          <motion.div
            style={animate ? { maskImage: leadMask, WebkitMaskImage: leadMask } : undefined}
            className="absolute inset-0 overflow-hidden"
          >
            <canvas ref={canvasRef} className="absolute top-0 left-0" />
          </motion.div>
        </motion.div>
        {/* Glow from the freshly laid metal; cools off slowly once the pass is done */}
        {animate && (
          <motion.div
            style={{ height: torchY }}
            animate={{ opacity: done ? 0 : 1 }}
            transition={{ duration: done ? 4 : 0.3, ease: "easeOut" }}
            className="absolute inset-x-0 top-0"
          >
            <motion.div
              style={{ opacity: torchOn }}
              className="weld-hot absolute bottom-0 left-1/2 -translate-x-1/2 h-72 max-h-full w-[10px] md:w-[13px] rounded-full"
            />
          </motion.div>
        )}
        {/* The closing rosette is the last metal laid, so it holds its heat longest */}
        {animate && (
          <motion.div
            style={{ top: lastNodeY }}
            initial={false}
            animate={done ? { opacity: [1, 1, 0] } : { opacity: 0 }}
            transition={done ? { duration: 7, times: [0, 0.3, 1], ease: "easeIn" } : { duration: 0 }}
            className="weld-hot-spot absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[22px] h-[22px] md:w-[27px] md:h-[27px] rounded-full"
          />
        )}
        {animate && (
          <motion.div
            style={{ top: torchY }}
            animate={{ opacity: done ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className="absolute left-1/2 w-0 h-0"
          >
            <motion.div style={{ opacity: torchOn }} className="weld-arc absolute w-12 h-12 rounded-full" />
          </motion.div>
        )}
      </div>

      {children}
    </div>
  );
}
