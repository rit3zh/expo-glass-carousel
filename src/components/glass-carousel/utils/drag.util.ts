import { GLASS_CAROUSEL_MOTION } from "@/constants/components/glass-carousel.const";
import type { TGlassCarouselEngine } from "../interface";
import { isCarouselLocked } from "./is-carousel-locked.util";

const beginDrag = (engine: TGlassCarouselEngine): void => {
  "worklet";
  if (isCarouselLocked(engine) || engine.dragging.get()) {
    return;
  }
  engine.dragging.set(true);
  engine.velocity.set(0);
  engine.pending.set(null);
  engine.target.set(engine.scroll.get());
  engine.moveIdle.set(0);
};

const updateDrag = (
  engine: TGlassCarouselEngine,
  changeX: number,
  slot: number,
): void => {
  "worklet";
  if (!engine.dragging.get()) {
    return;
  }
  const scroll: number =
    engine.scroll.get() - (changeX * GLASS_CAROUSEL_MOTION.touchDrag) / slot;
  engine.scroll.set(scroll);
  engine.target.set(scroll);
  engine.moveIdle.set(0);
};

const releaseDrag = (
  engine: TGlassCarouselEngine,
  velocityX: number,
  slot: number,
) => {
  "worklet";
  if (!engine.dragging.get()) {
    return;
  }
  const stale: boolean =
    engine.moveIdle.get() > GLASS_CAROUSEL_MOTION.flickIdleMs;
  const velocity: number = stale
    ? 0
    : (-velocityX * GLASS_CAROUSEL_MOTION.touchDrag) / slot;
  const scroll: number = engine.scroll.get();
  const projected: number =
    scroll +
    (velocity * GLASS_CAROUSEL_MOTION.frameMs) /
      1000 /
      (1 - GLASS_CAROUSEL_MOTION.friction);
  const nearest: number = Math.round(projected);
  const flicked: boolean =
    !stale && Math.abs(velocityX) > GLASS_CAROUSEL_MOTION.flickVelocity;
  const target: number = !flicked
    ? nearest
    : velocity > 0
      ? Math.max(nearest, Math.ceil(scroll))
      : Math.min(nearest, Math.floor(scroll));
  engine.target.set(target);
  engine.velocity.set(velocity);
};

const endDrag = <T extends TGlassCarouselEngine>(engine: T) => {
  "worklet";
  engine.dragging.set(false);
  engine.target.set(Math.round(engine.target.get()));
};

export { beginDrag, endDrag, releaseDrag, updateDrag };
