import { useContext } from "react";

import { GlassCarouselContext } from "../glass-carousel-context";
import type { IGlassCarouselContext } from "../interface";

const useGlassCarousel = (): IGlassCarouselContext => {
  const context = useContext<IGlassCarouselContext | null>(
    GlassCarouselContext,
  );
  if (context === null) {
    throw new Error(
      "GlassCarousel parts must be rendered inside <GlassCarousel.Root>.",
    );
  }
  return context;
};

export { useGlassCarousel };
