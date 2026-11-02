import { GLASS_CAROUSEL_MOTION } from "@/constants/components/glass-carousel.const";
import type {
  TGlassCarouselEngine,
  TGlassCarouselMetrics,
  TGlassCarouselNotify,
} from "../interface";
import { closeFocus } from "./close-focus.util";
import { openFocus } from "./open-focus.util";

const handleTap = (
  engine: TGlassCarouselEngine,
  metrics: TGlassCarouselMetrics,
  x: number,
  y: number,
  notify: TGlassCarouselNotify,
): void => {
  "worklet";
  if (engine.focusActive.get()) {
    closeFocus(engine, notify);
    return;
  }
  const scroll: number = engine.scroll.get();
  const shrink: number =
    1 - GLASS_CAROUSEL_MOTION.shrinkAmount * engine.energy.get();
  const dx: number = x - metrics.width / 2;
  const dy: number = y - metrics.height / 2;
  const hit: number = Math.round(scroll + dx / metrics.slot);
  const hitX: number = (hit - scroll) * metrics.slot;
  if (
    Math.abs(dx - hitX) > (metrics.cardWidth * shrink) / 2 ||
    Math.abs(dy) > (metrics.cardHeight * shrink) / 2
  ) {
    return;
  }
  if (hit === Math.round(scroll)) {
    openFocus(engine, notify);
    return;
  }
  engine.velocity.set(0);
  engine.target.set(hit);
  engine.pending.set(hit);
};

export { handleTap };
