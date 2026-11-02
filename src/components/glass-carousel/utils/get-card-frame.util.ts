import {
  GLASS_CAROUSEL_FOCUS,
  GLASS_CAROUSEL_MOTION,
} from "@/constants/components/glass-carousel.const";
import type {
  TGlassCarouselCardFrame,
  TGlassCarouselCardFrameInput,
} from "../interface";

const getCardFrame = ({
  offset,
  metrics,
  scroll,
  energy,
  focusScale,
  drop,
}: TGlassCarouselCardFrameInput): TGlassCarouselCardFrame => {
  "worklet";
  const index: number = Math.round(scroll) + offset;
  const shrink: number = 1 - GLASS_CAROUSEL_MOTION.shrinkAmount * energy;
  return {
    x: metrics.width / 2 + (index - scroll) * metrics.slot,
    y:
      metrics.height / 2 +
      drop * metrics.height * GLASS_CAROUSEL_FOCUS.dropDistance,
    scale: shrink * (offset === 0 ? focusScale : 1),
    index,
  };
};

export { getCardFrame };
