"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";

/* Original node layout (viewBox 800 × 500): a few hubs with thin connecting lines */
const nodes: readonly [number, number, number][] = [
  [90, 260, 6], [210, 110, 4], [250, 230, 3.5], [190, 400, 5], [60, 60, 3], [40, 440, 3.5],
  [390, 70, 4.5], [470, 250, 5], [420, 420, 3.5], [610, 150, 6.5], [690, 320, 4.5], [760, 60, 3], [740, 460, 4],
];
const links: readonly [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 6], [2, 7], [3, 8], [6, 9], [7, 10], [1, 2], [7, 9], [9, 11], [10, 12], [8, 10], [2, 3],
];

/* How the mesh answers the pointer (viewBox units). Kept gentle: it should feel alive, not busy. */
const RADIUS = 190; // nodes within this distance react
const PULL = 0.16; // how far a node drifts towards the pointer, as a share of the distance
const EASE = 0.16; // per-frame easing towards the target
const PEAK = 0.5; // the brightest a line or node gets (base opacity is set per use)
const PROBES = 3; // faint lines from the pointer to the nearest nodes

type NetworkMeshProps = {
  className?: string;
  /** Resting opacity of lines and nodes */
  base?: number;
};

/**
 * A decorative network of nodes and lines for dark panels, echoing connected
 * records without claiming any integration. Hidden from assistive technology;
 * colour comes from currentColor (e.g. text-teal-on-dark).
 *
 * With a mouse or pen, and motion allowed, it answers the pointer anywhere over
 * its parent: nearby nodes drift towards it and brighten, their lines light up,
 * faint lines join the pointer to the nearest nodes and a soft glow follows.
 * Work happens only while the pointer moves or the mesh is settling (no idle
 * animation loop). With touch, reduced motion or no JavaScript it is static.
 */
export function NetworkMesh({ className, base = 0.13 }: NetworkMeshProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  // React's generated ids can contain characters that break url(#…) references, so keep only safe ones
  const glowId = `mesh-glow-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  useEffect(() => {
    const svg = svgRef.current;
    const host = svg?.parentElement;
    if (!svg || !host) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    const circles = [...svg.querySelectorAll<SVGCircleElement>("[data-node]")];
    const lines = [...svg.querySelectorAll<SVGLineElement>("[data-link]")];
    const probes = [...svg.querySelectorAll<SVGLineElement>("[data-probe]")];
    const glow = svg.querySelector<SVGCircleElement>("[data-glow]");
    const state = nodes.map(([x, y]) => ({ x, y, w: 0 }));
    let pointer: { x: number; y: number } | null = null;
    let last = { x: 0, y: 0 };
    let glowW = 0;
    let raf = 0;

    const frame = () => {
      raf = 0;
      let settling = false;
      nodes.forEach(([x0, y0, r], i) => {
        let tx = x0;
        let ty = y0;
        let tw = 0;
        if (pointer) {
          const dx = pointer.x - x0;
          const dy = pointer.y - y0;
          const d = Math.hypot(dx, dy);
          if (d < RADIUS) {
            tw = 1 - d / RADIUS;
            tx = x0 + dx * PULL * tw;
            ty = y0 + dy * PULL * tw;
          }
        }
        const s = state[i];
        s.x += (tx - s.x) * EASE;
        s.y += (ty - s.y) * EASE;
        s.w += (tw - s.w) * EASE;
        if (Math.abs(tx - s.x) > 0.05 || Math.abs(ty - s.y) > 0.05 || Math.abs(tw - s.w) > 0.004) settling = true;
        const c = circles[i];
        c.setAttribute("cx", s.x.toFixed(1));
        c.setAttribute("cy", s.y.toFixed(1));
        c.setAttribute("r", (r * (1 + 0.5 * s.w)).toFixed(2));
        c.setAttribute("opacity", (base + (PEAK - base) * s.w).toFixed(3));
      });

      links.forEach(([a, b], k) => {
        const line = lines[k];
        line.setAttribute("x1", state[a].x.toFixed(1));
        line.setAttribute("y1", state[a].y.toFixed(1));
        line.setAttribute("x2", state[b].x.toFixed(1));
        line.setAttribute("y2", state[b].y.toFixed(1));
        line.setAttribute("stroke-opacity", (base + (PEAK - base) * Math.max(state[a].w, state[b].w)).toFixed(3));
      });

      // Faint lines from the pointer to the nearest reacting nodes
      const nearest = state.map((s, i) => [s.w, i] as const).sort((p, q) => q[0] - p[0]).slice(0, PROBES);
      probes.forEach((probe, k) => {
        const [w, i] = nearest[k];
        probe.setAttribute("x1", last.x.toFixed(1));
        probe.setAttribute("y1", last.y.toFixed(1));
        probe.setAttribute("x2", state[i].x.toFixed(1));
        probe.setAttribute("y2", state[i].y.toFixed(1));
        probe.setAttribute("stroke-opacity", (w * 0.4).toFixed(3));
      });

      const glowTarget = pointer ? 1 : 0;
      glowW += (glowTarget - glowW) * EASE;
      if (Math.abs(glowTarget - glowW) > 0.004) settling = true;
      glow?.setAttribute("cx", last.x.toFixed(1));
      glow?.setAttribute("cy", last.y.toFixed(1));
      glow?.setAttribute("opacity", (glowW * 0.16).toFixed(3));

      if (settling) raf = requestAnimationFrame(frame);
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const matrix = svg.getScreenCTM();
      if (!matrix) return;
      const p = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
      pointer = { x: p.x, y: p.y };
      last = pointer;
      schedule();
    };
    const onLeave = () => {
      pointer = null;
      schedule();
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [base]);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
    >
      <defs>
        <radialGradient id={glowId}>
          <stop offset="0" stopColor="currentColor" stopOpacity="1" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle data-glow="" cx="0" cy="0" r="170" fill={`url(#${glowId})`} opacity="0" />
      <g stroke="currentColor" strokeWidth="1.2">
        {links.map(([a, b]) => (
          <line key={`${a}-${b}`} data-link="" x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} strokeOpacity={base} />
        ))}
        {Array.from({ length: PROBES }, (_, k) => (
          <line key={`probe-${k}`} data-probe="" x1="0" y1="0" x2="0" y2="0" strokeOpacity="0" strokeDasharray="2 4" />
        ))}
      </g>
      <g fill="currentColor">
        {nodes.map(([x, y, r]) => (
          <circle key={`${x}-${y}`} data-node="" cx={x} cy={y} r={r} opacity={base} />
        ))}
      </g>
    </svg>
  );
}
