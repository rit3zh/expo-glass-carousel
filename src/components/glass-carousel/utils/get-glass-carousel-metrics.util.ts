import {
  GLASS_CAROUSEL_CARD_HEIGHT_RATIO,
  GLASS_CAROUSEL_CARD_MIN_HEIGHT,
  GLASS_CAROUSEL_CARD_WIDTH_RATIO,
} from "@/constants/components/glass-carousel.const";

import type { TGlassCarouselMetrics, TGlassCarouselMetricsInput } from "../interface";

const getGlassCarouselMetrics = ({
  size,
  cardHeight,
  aspect,
  gap,
  pixelRatio,
}: TGlassCarouselMetricsInput): TGlassCarouselMetrics => {
  const width: number = Math.max(1, size.width);
  const height: number = Math.max(1, size.height);
  const fittedHeight: number = Math.max(
    GLASS_CAROUSEL_CARD_MIN_HEIGHT,
    Math.min(cardHeight, Math.round(height * GLASS_CAROUSEL_CARD_HEIGHT_RATIO)),
  );
  const cardWidth: number = Math.min(fittedHeight * aspect, width * GLASS_CAROUSEL_CARD_WIDTH_RATIO);
  const finalHeight: number = cardWidth / aspect;
  const slot: number = cardWidth + gap;
  const reach: number = Math.ceil((width / 2 + finalHeight) / slot);
  const offsets: number[] = Array.from(
    { length: reach * 2 + 1 },
    (_: unknown, position: number): number => position - reach,
  );
  return {
    width,
    height,
    cardWidth,
    cardHeight: finalHeight,
    gap,
    slot,
    reach,
    pixelRatio,
    offsets,
  };
};

export { getGlassCarouselMetrics };
