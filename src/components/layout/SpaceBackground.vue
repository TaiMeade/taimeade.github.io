<template>
  <!-- Decorative, non-interactive. All motion is compositor-only
       (opacity / transform) so there is no per-frame repaint. -->
  <div class="space-bg" aria-hidden="true">
    <!-- nebula sits in its own wrapper so the slow drift animation and the
         mouse parallax can live on separate elements without fighting -->
    <div class="nebula-wrap">
      <div class="nebula" />
    </div>

    <div class="stars stars--base" />
    <div class="stars stars--twinkle stars--t1" />
    <div class="stars stars--twinkle stars--t2" />
    <div class="stars stars--twinkle stars--t3" />

    <!-- diffraction glints (4-point spikes). Positions are randomised
         and re-randomised at the end of each pulse — while the glint is
         invisible — so they sparkle all over the screen. -->
    <i
      v-for="glint in glints"
      :key="`${glint.id}-${glint.seq}`"
      class="glint"
      :style="glintStyle(glint)"
      @animationiteration="reposition(glint)"
    />

    <span class="shooting-star shooting-star--1" />
    <span class="shooting-star shooting-star--2" />
    <span class="shooting-star shooting-star--3" />

    <!-- edge vignette (static) deepens the sense of looking into space -->
    <div class="vignette" />
  </div>
</template>

<script setup>
// Background motion is all CSS (compositor opacity/transform) — there is
// no requestAnimationFrame loop. The only JS is the glint repositioning
// below, which fires just once per pulse (on `animationiteration`) to
// scatter the 4-point sparkles to a fresh random spot while invisible.
import { reactive } from 'vue'

const GLINT_COUNT = 3
const rand = (min, max) => min + Math.random() * (max - min)

function randomGlint(id) {
  return {
    id,
    seq: 0,               // bumped on reposition to remount → animation restarts at 0%
    top: rand(6, 94),     // keep clear of the very edges (spikes are ~28px)
    left: rand(5, 95),
    scale: rand(0.7, 1.3),
    duration: rand(5, 9),
    delay: rand(0, 6),    // stagger the first appearance only
  }
}

const glints = reactive(
  Array.from({ length: GLINT_COUNT }, (_, id) => randomGlint(id)),
)

// Called at the end of each pulse (glint is at opacity 0) → no visible jump.
// Changing animation-duration on a running animation does NOT restart it —
// the browser keeps the start time and the phase jumps mid-pulse, flashing
// the glint at its new spot. Bumping `seq` swaps the element's key so the
// animation truly restarts from 0% (invisible) with the new duration.
function reposition(glint) {
  glint.top = rand(6, 94)
  glint.left = rand(5, 95)
  glint.scale = rand(0.7, 1.3)
  glint.duration = rand(5, 9)
  glint.delay = 0
  glint.seq++
}

function glintStyle(glint) {
  return {
    top: `${glint.top.toFixed(2)}%`,
    left: `${glint.left.toFixed(2)}%`,
    '--gs': glint.scale.toFixed(2),
    animationDuration: `${glint.duration.toFixed(2)}s`,
    animationDelay: `${glint.delay.toFixed(2)}s`,
  }
}
</script>

<style scoped>
.space-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  /* fall back to centred when no cursor data is supplied (e.g. touch) */
  --mx: 0;
  --my: 0;
}

/* ─── Nebula glow ─────────────────────────────────────────────
   Soft, very-low-alpha colour clouds that drift slowly via
   transform (GPU compositor only). Feathered with `transparent`
   stops so no blur filter is needed. The wrapper carries the
   mouse-parallax shift; the inner layer carries the drift. */
.nebula-wrap {
  position: absolute;
  inset: 0;
  transform: translate3d(calc(var(--mx) * -6px), calc(var(--my) * -6px), 0);
  transition: transform 0.4s ease-out;
  will-change: transform;
}
.nebula {
  position: absolute;
  inset: -25%;
  background:
    radial-gradient(38% 38% at 28% 30%, rgba(94, 234, 212, 0.05), transparent 70%),
    radial-gradient(44% 44% at 72% 60%, rgba(124, 58, 237, 0.06), transparent 72%),
    radial-gradient(34% 34% at 58% 88%, rgba(56, 120, 220, 0.04), transparent 70%);
  will-change: transform;
  animation: nebula-drift 46s ease-in-out infinite alternate;
}

/* ─── Star field ──────────────────────────────────────────────
   One always-on faint base layer keeps the sky populated, then
   three sparse layers twinkle *out of phase* (different pulse
   shapes, durations and delays) so individual stars sparkle at
   different times instead of the whole field breathing in unison.
   Each layer is one composited element animating opacity only. */
.stars {
  position: absolute;
  inset: -60px;             /* overscan so parallax never reveals an edge */
  background-repeat: repeat;
  transition: transform 0.35s ease-out;
  will-change: transform;   /* parallax shift — promoted to its own layer */
}

.stars--twinkle {
  will-change: transform, opacity;
}

/* Dense, dim, never fully off — the steady background sky. */
.stars--base {
  background-image:
    radial-gradient(1px 1px at 25px 30px,   rgba(255, 255, 255, 0.55), transparent),
    radial-gradient(1px 1px at 70px 160px,  rgba(255, 255, 255, 0.40), transparent),
    radial-gradient(1px 1px at 120px 60px,  rgba(255, 255, 255, 0.50), transparent),
    radial-gradient(1px 1px at 175px 120px, rgba(255, 255, 255, 0.35), transparent),
    radial-gradient(1px 1px at 40px 105px,  rgba(255, 255, 255, 0.45), transparent),
    radial-gradient(1px 1px at 95px 20px,   rgba(255, 255, 255, 0.38), transparent),
    radial-gradient(1px 1px at 150px 180px, rgba(255, 255, 255, 0.52), transparent),
    radial-gradient(1px 1px at 190px 45px,  rgba(255, 255, 255, 0.42), transparent);
  background-size: 200px 200px;
  opacity: 0.6;
  transform: translate3d(calc(var(--mx) * -4px), calc(var(--my) * -4px), 0);
}

/* Twinkle set 1 — small, quick sparkle. */
.stars--t1 {
  background-image:
    radial-gradient(1.2px 1.2px at 50px 40px,   #ffffff, transparent),
    radial-gradient(1.2px 1.2px at 210px 150px, rgba(255, 255, 255, 0.9), transparent),
    radial-gradient(1.2px 1.2px at 130px 240px, #ffffff, transparent),
    radial-gradient(1.2px 1.2px at 260px 70px,  rgba(255, 255, 255, 0.85), transparent);
  background-size: 290px 290px;
  transform: translate3d(calc(var(--mx) * -8px), calc(var(--my) * -8px), 0);
  animation: twinkle-a 3.4s ease-in-out infinite;
}

/* Twinkle set 2 — offset positions, slower, delayed, double-blink. */
.stars--t2 {
  background-image:
    radial-gradient(1.5px 1.5px at 90px 120px,  #ffffff, transparent),
    radial-gradient(1.5px 1.5px at 300px 60px,  rgba(214, 240, 255, 0.95), transparent),
    radial-gradient(1.5px 1.5px at 180px 300px, rgba(255, 255, 255, 0.9), transparent),
    radial-gradient(1.5px 1.5px at 360px 220px, #ffffff, transparent);
  background-size: 380px 380px;
  transform: translate3d(calc(var(--mx) * -13px), calc(var(--my) * -13px), 0);
  animation: twinkle-b 5.2s ease-in-out infinite 1.1s;
}

/* Twinkle set 3 — a few larger, brighter, warm/cool tinted stars. */
.stars--t3 {
  background-image:
    radial-gradient(2px 2px at 140px 90px,   rgba(214, 240, 255, 0.95), transparent),
    radial-gradient(2px 2px at 420px 260px,  rgba(255, 245, 224, 0.95), transparent),
    radial-gradient(1.8px 1.8px at 300px 400px, #ffffff, transparent);
  background-size: 520px 520px;
  transform: translate3d(calc(var(--mx) * -20px), calc(var(--my) * -20px), 0);
  animation: twinkle-c 7.3s ease-in-out infinite 2.7s;
}

/* ─── Diffraction glints ──────────────────────────────────────
   A few "bright" stars get 4-point spikes (a horizontal + vertical
   streak through a glowing core) for a telescope-like sparkle. The
   spikes are pseudo-elements; the whole glint pulses via opacity +
   scale (compositor only). `--gs` sets each glint's relative size. */
.glint {
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 0 6px 1px rgba(255, 255, 255, 0.8);
  opacity: 0;
  will-change: transform, opacity;
  /* duration + delay are supplied per-glint via inline style */
  animation-name: glint-twinkle;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
.glint::before,
.glint::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.glint::before {        /* horizontal spike */
  width: 28px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent);
}
.glint::after {         /* vertical spike */
  width: 1px;
  height: 28px;
  background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.9), transparent);
}
/* ─── Edge vignette ───────────────────────────────────────────
   One static radial gradient that darkens the corners, drawing the
   eye inward and adding depth. No animation → no runtime cost. */
.vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 100% 100% at 50% 42%, transparent 55%, rgba(3, 5, 12, 0.55) 100%);
}

/* ─── Shooting stars ──────────────────────────────────────────
   A thin streak with a bright head. `rotate()` sets the angle and
   the same-angle `translate()` moves it along that line, so it
   points the way it travels. Long cycles with most of the time
   spent invisible → they appear only occasionally. Sizes, glow and
   timing vary so they don't feel repetitive. */
.shooting-star {
  position: absolute;
  width: 150px;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.7) 75%, #ffffff 100%);
  /* static glow — painted once, not animated */
  box-shadow: 0 0 6px 1px rgba(255, 255, 255, 0.35);
  opacity: 0;
  will-change: transform, opacity;
}

/* Short & quick, enters top-left. */
.shooting-star--1 {
  top: 12%;
  left: -160px;
  width: 120px;
  animation: shoot-1 13s ease-in infinite 4s;
}

/* Enters from the right, travels down-left (rotate ~160° points the
   bright head along the direction of travel). */
.shooting-star--2 {
  top: 8%;
  right: -180px;
  width: 165px;
  animation: shoot-2 19s ease-in infinite 11s;
}

/* Rare "fireball" — longer, thicker, brighter, warm-tinted glow. */
.shooting-star--3 {
  top: 27%;
  left: -240px;
  width: 230px;
  height: 3px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 236, 200, 0.7) 70%, #ffffff 100%);
  box-shadow: 0 0 14px 2px rgba(255, 240, 214, 0.55);
  animation: shoot-3 31s ease-in infinite 18s;
}

/* ─── Keyframes ───────────────────────────────────────────────
   Only opacity & transform animate — no layout/paint properties. */
@keyframes nebula-drift {
  from { transform: translate3d(-1.5%, -1%, 0) scale(1); }
  to   { transform: translate3d(1.5%, 1.5%, 0) scale(1.08); }
}

/* Three different pulse shapes; combined with the per-layer delays
   they stay out of sync so stars sparkle individually. */
@keyframes twinkle-a {
  0%, 100% { opacity: 0.15; }
  50%      { opacity: 1; }
}

@keyframes twinkle-b {
  0%, 100% { opacity: 0.2; }
  35%      { opacity: 0.95; }
  60%      { opacity: 0.35; }
  80%      { opacity: 0.8; }
}

@keyframes twinkle-c {
  0%, 100% { opacity: 0.25; }
  45%      { opacity: 1; }
}

/* ~1.6s of visible streak, then a long dark gap before repeating. */
@keyframes shoot-1 {
  0%   { opacity: 0; transform: rotate(14deg) translate3d(0, 0, 0); }
  3%   { opacity: 1; }
  14%  { opacity: 0; transform: rotate(14deg) translate3d(125vw, 0, 0); }
  100% { opacity: 0; transform: rotate(14deg) translate3d(125vw, 0, 0); }
}

@keyframes shoot-2 {
  0%   { opacity: 0; transform: rotate(160deg) translate3d(0, 0, 0); }
  2%   { opacity: 1; }
  11%  { opacity: 0; transform: rotate(160deg) translate3d(130vw, 0, 0); }
  100% { opacity: 0; transform: rotate(160deg) translate3d(130vw, 0, 0); }
}

/* Fireball — shallow angle, travels the full width, mostly idle. */
@keyframes shoot-3 {
  0%   { opacity: 0; transform: rotate(10deg) translate3d(0, 0, 0); }
  1.5% { opacity: 1; }
  9%   { opacity: 0; transform: rotate(10deg) translate3d(135vw, 0, 0); }
  100% { opacity: 0; transform: rotate(10deg) translate3d(135vw, 0, 0); }
}

/* Glint sparkle — fades in while growing from a point to full size. */
@keyframes glint-twinkle {
  0%, 100% { opacity: 0; transform: scale(calc(var(--gs, 1) * 0.4)); }
  50%      { opacity: 1; transform: scale(var(--gs, 1)); }
}

/* ─── Respect reduced-motion: keep a still starfield, stop motion ─ */
@media (prefers-reduced-motion: reduce) {
  .nebula,
  .stars--twinkle,
  .glint {
    animation: none;
  }
  /* hold the twinkle layers at a steady, visible brightness */
  .stars--twinkle { opacity: 0.8; }
  /* keep glints visible as plain bright stars (full size, no pulse) */
  .glint { opacity: 0.85; transform: scale(var(--gs, 1)); }
  /* neutralise the mouse parallax shift as well */
  .stars--base,
  .stars--t1,
  .stars--t2,
  .stars--t3,
  .nebula-wrap {
    transform: none;
    transition: none;
  }
  .shooting-star { display: none; }
}
</style>
