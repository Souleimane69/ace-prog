"use client";

import { useEffect, useRef } from "react";

interface Segment {
  x1: number; y1: number;
  x2: number; y2: number;
  length: number;
}

interface Circuit {
  segments: Segment[];
  totalLength: number;
  traveled: number;   // distance parcourue par le signal
  alpha: number;
  fadingOut: boolean;
  speed: number;
  trailLength: number; // longueur de la traîne lumineuse
}

function buildCircuit(cw: number, ch: number, grid: number): Circuit {
  const maxSegs = 3 + Math.floor(Math.random() * 4); // 3 à 6 segments
  const segments: Segment[] = [];

  // Point de départ aléatoire sur la grille
  let x = Math.floor(Math.random() * (cw / grid)) * grid;
  let y = Math.floor(Math.random() * (ch / grid)) * grid;

  // Direction initiale : 0=droite, 1=gauche, 2=bas, 3=haut
  let dir = Math.floor(Math.random() * 4);

  for (let s = 0; s < maxSegs; s++) {
    const len = (2 + Math.floor(Math.random() * 6)) * grid; // 2 à 7 cellules
    let nx = x;
    let ny = y;

    if (dir === 0) nx = x + len;
    else if (dir === 1) nx = x - len;
    else if (dir === 2) ny = y + len;
    else ny = y - len;

    // Reste dans l'écran (avec marge)
    if (nx < -grid * 2 || nx > cw + grid * 2 || ny < -grid * 2 || ny > ch + grid * 2) break;

    segments.push({ x1: x, y1: y, x2: nx, y2: ny, length: len });
    x = nx;
    y = ny;

    // Tourner à 90° (jamais demi-tour)
    const turns = dir < 2 ? [2, 3] : [0, 1];
    dir = turns[Math.floor(Math.random() * 2)];
  }

  if (segments.length === 0) {
    // fallback : segment horizontal simple
    const len = grid * 4;
    segments.push({ x1: x, y1: y, x2: x + len, y2: y, length: len });
  }

  const totalLength = segments.reduce((a, s) => a + s.length, 0);

  return {
    segments,
    totalLength,
    traveled: 0,
    alpha: 0,
    fadingOut: false,
    speed: 1.2 + Math.random() * 2.5,
    trailLength: grid * (3 + Math.random() * 4),
  };
}

function getPointAt(segments: Segment[], dist: number): { x: number; y: number } {
  let remaining = dist;
  for (const seg of segments) {
    if (remaining <= seg.length) {
      const t = remaining / seg.length;
      return { x: seg.x1 + (seg.x2 - seg.x1) * t, y: seg.y1 + (seg.y2 - seg.y1) * t };
    }
    remaining -= seg.length;
  }
  const last = segments[segments.length - 1];
  return { x: last.x2, y: last.y2 };
}

export default function CircuitCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const GRID = isMobile ? 36 : 48;
    const MAX_CIRCUITS = isMobile ? 8 : 16;
    const SPAWN_INTERVAL = 18; // frames entre chaque spawn

    let frameCount = 0;
    const circuits: Circuit[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let raf: number;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn
      frameCount++;
      if (frameCount % SPAWN_INTERVAL === 0 && circuits.length < MAX_CIRCUITS) {
        circuits.push(buildCircuit(canvas.width, canvas.height, GRID));
      }

      for (let i = circuits.length - 1; i >= 0; i--) {
        const c = circuits[i];

        // Fade in
        if (!c.fadingOut && c.alpha < 1) {
          c.alpha = Math.min(1, c.alpha + 0.04);
        }

        // Avancer le signal
        c.traveled += c.speed;

        // Début du fade out quand le signal dépasse la fin
        if (c.traveled > c.totalLength + c.trailLength) {
          c.fadingOut = true;
        }
        if (c.fadingOut) {
          c.alpha -= 0.025;
          if (c.alpha <= 0) {
            circuits.splice(i, 1);
            continue;
          }
        }

        const baseAlpha = c.alpha;

        // ── Dessiner les segments ─────────────────────────────────────────
        let distDrawn = 0;
        for (const seg of c.segments) {
          const segStart = distDrawn;
          const segEnd = distDrawn + seg.length;

          // Partie illuminée (entre tête - trailLength et tête)
          const head = c.traveled;
          const tail = c.traveled - c.trailLength;

          const visStart = Math.max(segStart, tail);
          const visEnd = Math.min(segEnd, head);

          if (visEnd > visStart) {
            const p1 = getPointAt(c.segments, visStart);
            const p2 = getPointAt(c.segments, visEnd);

            // Gradient le long du segment illuminé
            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(0, `rgba(230,57,70,0)`);
            grad.addColorStop(0.6, `rgba(230,57,70,${0.5 * baseAlpha})`);
            grad.addColorStop(1, `rgba(230,57,70,${baseAlpha})`);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }

          // Trace de base (très subtile) : toujours visible pour le fil déjà parcouru
          const passedEnd = Math.min(segEnd, c.traveled - c.trailLength);
          if (passedEnd > segStart) {
            const p1 = getPointAt(c.segments, segStart);
            const p2 = getPointAt(c.segments, passedEnd);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(230,57,70,${0.12 * baseAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          distDrawn += seg.length;
        }

        // ── Point de jonction aux angles ──────────────────────────────────
        for (let s = 0; s < c.segments.length - 1; s++) {
          const jx = c.segments[s].x2;
          const jy = c.segments[s].y2;
          const jDist = c.segments.slice(0, s + 1).reduce((a, seg) => a + seg.length, 0);
          if (jDist < c.traveled) {
            const jAlpha = Math.min(1, (c.traveled - jDist) / 20) * baseAlpha;
            ctx.beginPath();
            ctx.arc(jx, jy, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(230,57,70,${0.6 * jAlpha})`;
            ctx.fill();
          }
        }

        // ── Signal (tête lumineuse) ───────────────────────────────────────
        if (c.traveled <= c.totalLength) {
          const head = getPointAt(c.segments, Math.min(c.traveled, c.totalLength));

          // Halo
          const glow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 10);
          glow.addColorStop(0, `rgba(255,255,255,${0.9 * baseAlpha})`);
          glow.addColorStop(0.4, `rgba(230,57,70,${0.5 * baseAlpha})`);
          glow.addColorStop(1, `rgba(230,57,70,0)`);
          ctx.beginPath();
          ctx.arc(head.x, head.y, 10, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          // Point central
          ctx.beginPath();
          ctx.arc(head.x, head.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${baseAlpha})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
