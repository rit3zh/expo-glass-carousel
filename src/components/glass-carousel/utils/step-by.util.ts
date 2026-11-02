import type { TGlassCarouselEngine } from "../interface";
import { isCarouselLocked } from "./is-carousel-locked.util";

const stepBy = (engine: TGlassCarouselEngine, direction: number): void => {
  "worklet";
  if (isCarouselLocked(engine)) {
    return;
  }
  engine.velocity.set(0);
  engine.pending.set(null);
  engine.target.set(Math.round(engine.scroll.get()) + direction);
};

export { stepBy };
