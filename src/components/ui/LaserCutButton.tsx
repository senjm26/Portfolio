"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { emitSparks, prefersReducedMotion, svgToClient } from "@/lib/sparks";

// A link cut out of the metal plate it sits on: a bright kerf outlines a
// nested piece of the same sheet around a white label. With a
// `delay`, the laser traces the outline at that time; without one, it renders
// already cut (e.g. in the navbar).

const RADIUS = 6;
const COOL_DURATION = 600;

const sizes = {
  md: "px-8 py-3 text-sm",
  sm: "px-5 py-2 text-xs",
};

export default function LaserCutButton({
  href,
  icon,
  children,
  delay,
  duration = 380,
  size = "md",
  onClick,
}: {
  href: string;
  icon?: ReactNode;
  children: ReactNode;
  delay?: number;
  duration?: number;
  size?: keyof typeof sizes;
  onClick?: () => void;
}) {
  const uid = useId().replace(/:/g, "");
  const glowId = `laser-button-glow-${uid}`;
  const softId = `laser-button-soft-${uid}`;
  const animated = delay !== undefined;
  const newTab = !href.startsWith("#");

  const svgRef = useRef<SVGSVGElement>(null);
  const hotRef = useRef<SVGRectElement>(null);
  const kerfRef = useRef<SVGRectElement>(null);
  const spotRef = useRef<SVGGElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const hot = hotRef.current;
    const kerf = kerfRef.current;
    const spot = spotRef.current;
    const label = labelRef.current;
    if (!animated || !svg || !hot || !kerf || !spot || !label) return;

    const len = hot.getTotalLength();
    const finish = () => {
      // Drop the dashes so the outline keeps up if the button is resized later
      kerf.style.strokeDasharray = "none";
      hot.style.opacity = "0";
      spot.style.opacity = "0";
      label.style.opacity = "1";
    };
    if (prefersReducedMotion() || !len) {
      finish();
      return;
    }

    for (const el of [hot, kerf]) {
      el.style.strokeDasharray = `${len} ${len}`;
      el.style.strokeDashoffset = String(len);
    }

    let raf = 0;
    const t0 = performance.now();
    const frame = (now: number) => {
      const t = now - t0 - delay;
      if (t >= 0) {
        const f = Math.min(t / duration, 1);
        const offset = String(len * (1 - f));
        hot.style.strokeDashoffset = offset;
        kerf.style.strokeDashoffset = offset;
        if (f < 1) {
          const p = hot.getPointAtLength(len * f);
          spot.setAttribute("transform", `translate(${p.x} ${p.y}) scale(${0.85 + Math.random() * 0.3})`);
          spot.style.opacity = "1";
          const c = svgToClient(svg, p.x, p.y);
          if (c) emitSparks(c.x, c.y, 0.6);
        } else {
          spot.style.opacity = "0";
          label.style.opacity = "1";
          hot.style.opacity = String(Math.max(1 - (t - duration) / COOL_DURATION, 0));
          if (t > duration + COOL_DURATION) {
            finish();
            return;
          }
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [animated, delay, duration]);

  // Sized in percentages so the outline always tracks the button's box
  const outline = { x: 0, y: 0, width: "100%", height: "100%", rx: RADIUS };
  const hidden = animated ? { strokeDasharray: "0 99999" } : undefined;

  return (
    <a
      href={href}
      onClick={onClick}
      {...(newTab && { target: "_blank", rel: "noopener noreferrer" })}
      className={`laser-button group relative inline-flex rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-bright ${sizes[size]}`}
    >
      <svg ref={svgRef} aria-hidden overflow="visible" className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <filter id={glowId} x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={softId} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* The finished kerf - the inside stays the same plate as everything around it */}
        <rect ref={kerfRef} {...outline} fill="none" stroke="#f4f4f2" strokeWidth={2} className="laser-groove" style={hidden} />

        {animated && (
          <>
            <rect
              ref={hotRef}
              {...outline}
              fill="none"
              stroke="#ff7a1a"
              strokeWidth={2}
              filter={`url(#${glowId})`}
              style={hidden}
            />
            <g ref={spotRef} style={{ opacity: 0 }}>
              <circle r={12} fill="#ff6a00" opacity={0.4} filter={`url(#${softId})`} />
              <circle r={2.5} fill="#fffdf2" filter={`url(#${glowId})`} />
            </g>
          </>
        )}
      </svg>

      <span
        ref={labelRef}
        style={animated ? { opacity: 0 } : undefined}
        className="laser-label relative flex items-center gap-3 font-mono font-bold tracking-[0.2em] uppercase text-off-white"
      >
        {icon}
        {children}
      </span>
    </a>
  );
}
