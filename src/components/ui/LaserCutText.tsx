"use client";

import { useEffect, useId, useRef } from "react";
import { nameGlyphs } from "@/data/nameGlyphs";
import { emitSparks, prefersReducedMotion, svgToClient } from "@/lib/sparks";

// Renders the site name laser-cut into the metal plate behind it. The letters
// stay nested in the sheet, so only the kerf shows: the laser spot traces each
// contour throwing sparks, and the glowing cut cools down to a white line.

const START_DELAY = 200; // ms before the laser fires
const CUT_DURATION = 1300; // ms of actual cutting, shared across contours by length
const RAPID = 25; // ms the beam is off while jumping to the next contour
const COOL_DURATION = 800; // ms for a finished kerf to stop glowing

const contourCount = nameGlyphs.glyphs.reduce((n, g) => n + g.contours.length, 0);
/** When the laser finishes the name - anything cut afterwards should start here. */
export const NAME_CUT_MS = START_DELAY + CUT_DURATION + RAPID * contourCount;

interface Segment {
  hot: SVGPathElement;
  kerf: SVGPathElement;
  len: number;
  start: number;
  end: number;
}

export default function LaserCutText() {
  const uid = useId().replace(/:/g, "");
  const glowId = `glow-${uid}`;
  const softId = `soft-${uid}`;
  const { glyphs, viewBox } = nameGlyphs;
  const contours = glyphs.flatMap((g) => g.contours);

  const svgRef = useRef<SVGSVGElement>(null);
  const spotRef = useRef<SVGGElement>(null);
  const hotRefs = useRef<(SVGPathElement | null)[]>([]);
  const kerfRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const svg = svgRef.current;
    const spot = spotRef.current;
    if (!svg || !spot) return;

    if (prefersReducedMotion()) {
      hotRefs.current.forEach((el) => el && (el.style.opacity = "0"));
      kerfRefs.current.forEach((el) => el && (el.style.strokeDasharray = "none"));
      return;
    }

    // Lay out the cut program: each contour in order, time proportional to its length.
    const pairs = hotRefs.current.map((hot, i) => ({ hot, kerf: kerfRefs.current[i] }));
    const lengths = pairs.map(({ hot }) => hot?.getTotalLength() ?? 0);
    const totalLen = lengths.reduce((a, b) => a + b, 0);
    const segments: Segment[] = [];
    let cursor = START_DELAY;
    pairs.forEach(({ hot, kerf }, i) => {
      if (!hot || !kerf) return;
      const len = lengths[i];
      const dur = (len / totalLen) * CUT_DURATION;
      segments.push({ hot, kerf, len, start: cursor, end: cursor + dur });
      cursor += dur + RAPID;
    });
    const programEnd = cursor;

    for (const s of segments) {
      for (const el of [s.hot, s.kerf]) {
        el.style.strokeDasharray = `${s.len} ${s.len}`;
        el.style.strokeDashoffset = String(s.len);
      }
    }

    let raf = 0;
    const t0 = performance.now();
    const frame = (now: number) => {
      const t = now - t0;
      let active: { x: number; y: number } | null = null;

      for (const s of segments) {
        if (t < s.start) continue;
        const f = Math.min((t - s.start) / (s.end - s.start), 1);
        const offset = String(s.len * (1 - f));
        s.hot.style.strokeDashoffset = offset;
        s.kerf.style.strokeDashoffset = offset;
        if (f < 1) {
          active = s.hot.getPointAtLength(s.len * f);
        } else {
          s.hot.style.opacity = String(Math.max(1 - (t - s.end) / COOL_DURATION, 0));
        }
      }

      if (active) {
        const flicker = 0.85 + Math.random() * 0.3;
        spot.setAttribute("transform", `translate(${active.x} ${active.y}) scale(${flicker})`);
        spot.style.opacity = "1";
        const p = svgToClient(svg, active.x, active.y);
        if (p) emitSparks(p.x, p.y);
      } else {
        spot.style.opacity = "0";
      }

      if (t <= programEnd + COOL_DURATION) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      aria-hidden
      overflow="visible"
      className="w-[min(84vw,640px)] h-auto mx-auto block"
    >
      <defs>
        <filter id={softId} x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* The finished kerf: a thin bright cut line around each nested letter */}
      {contours.map((d, i) => (
        <path
          key={`kerf-${i}`}
          ref={(el) => {
            kerfRefs.current[i] = el;
          }}
          d={d}
          fill="none"
          stroke="#f4f4f2"
          strokeWidth={3.2}
          strokeLinejoin="round"
          style={{ strokeDasharray: "0 99999" }}
        />
      ))}

      {/* Glowing edge of the fresh cut, cooling away to leave the black kerf */}
      {contours.map((d, i) => (
        <path
          key={`hot-${i}`}
          ref={(el) => {
            hotRefs.current[i] = el;
          }}
          d={d}
          fill="none"
          stroke="#ff7a1a"
          strokeWidth={2.6}
          strokeLinecap="round"
          filter={`url(#${glowId})`}
          style={{ strokeDasharray: "0 99999" }}
        />
      ))}

      {/* Laser spot - just the light, no head */}
      <g ref={spotRef} style={{ opacity: 0 }}>
        <circle r={22} fill="#ff6a00" opacity={0.35} filter={`url(#${softId})`} />
        <circle r={8} fill="#ffb347" opacity={0.8} filter={`url(#${softId})`} />
        <circle r={3} fill="#fffdf2" filter={`url(#${glowId})`} />
      </g>
    </svg>
  );
}
