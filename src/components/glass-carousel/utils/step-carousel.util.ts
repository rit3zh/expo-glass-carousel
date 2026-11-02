import { GLASS_CAROUSEL_MOTION } from "@/constants/components/glass-carousel.const";
import type {
  TGlassCarouselEngine,
  TGlassCarouselMetrics,
  TGlassCarouselNotify,
} from "../interface";
import { openFocus } from "./open-focus.util";

const stepSpring = (
  engine: TGlassCarouselEngine,
  metrics: TGlassCarouselMetrics,
  elapsed: number,
  reducedMotion: boolean,
): void => {
  "worklet";
  const target: number = engine.target.get();
  let scroll: number = engine.scroll.get();
  let velocity: number = engine.velocity.get();
  if (scroll === target && velocity === 0) {
    return;
  }
  const stiffness: number = reducedMotion
    ? GLASS_CAROUSEL_MOTION.reducedStiffness
    : GLASS_CAROUSEL_MOTION.stiffness;
  const ratio: number = reducedMotion
    ? GLASS_CAROUSEL_MOTION.reducedDamping
    : GLASS_CAROUSEL_MOTION.damping;
  const damping: number = 2 * Math.sqrt(stiffness) * ratio;
  const steps: number = Math.max(
    1,
    Math.ceil(elapsed / GLASS_CAROUSEL_MOTION.springStepMs),
  );
  const dt: number = elapsed / 1000 / steps;
  for (let step: number = 0; step < steps; step += 1) {
    velocity += (-stiffness * (scroll - target) - damping * velocity) * dt;
    scroll += velocity * dt;
  }
  const resting: boolean =
    Math.abs(target - scroll) * metrics.slot <
      GLASS_CAROUSEL_MOTION.restEpsilon &&
    Math.abs(velocity) * metrics.slot < GLASS_CAROUSEL_MOTION.velocityEpsilon;
  engine.scroll.set(resting ? target : scroll);
  engine.velocity.set(resting ? 0 : velocity);
};

const stepCarousel = (
  engine: TGlassCarouselEngine,
  elapsed: number,
  reducedMotion: boolean,
  notify: TGlassCarouselNotify,
): void => {
  "worklet";
  const metrics: TGlassCarouselMetrics | null = engine.layout.get();
  if (metrics === null) {
    return;
  }
  const clamped: number = Math.min(
    Math.max(elapsed, 0),
    GLASS_CAROUSEL_MOTION.maxFrameMs,
  );
  const frames: number = clamped / GLASS_CAROUSEL_MOTION.frameMs;
  engine.moveIdle.set(engine.moveIdle.get() + elapsed);

  if (!engine.dragging.get()) {
    stepSpring(engine, metrics, clamped, reducedMotion);
  }
  const next: number = engine.scroll.get();

  const speed: number =
    ((next - engine.previousScroll.get()) * metrics.slot) /
    Math.max(frames, 0.001);
  engine.previousScroll.set(next);
  const norm: number = Math.min(
    1,
    Math.abs(speed) / GLASS_CAROUSEL_MOTION.shrinkMax,
  );
  const energy: number = engine.energy.get();
  if (norm !== energy) {
    const rate: number =
      norm > energy
        ? GLASS_CAROUSEL_MOTION.shrinkAttack
        : GLASS_CAROUSEL_MOTION.shrinkDecay;
    const easedEnergy: number =
      energy + (norm - energy) * (1 - Math.pow(1 - rate, frames));
    engine.energy.set(
      Math.abs(norm - easedEnergy) < GLASS_CAROUSEL_MOTION.energyEpsilon
        ? norm
        : easedEnergy,
    );
  }

  const pending: number | null = engine.pending.get();
  if (pending !== null && !engine.focusActive.get()) {
    if (
      Math.abs(engine.target.get() - next) * metrics.slot <
      GLASS_CAROUSEL_MOTION.settleEpsilon
    ) {
      engine.pending.set(null);
      if (Math.round(next) === pending) {
        openFocus(engine, notify);
      }
    }
  }
};

export { stepCarousel };
