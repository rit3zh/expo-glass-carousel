import {
  GLASS_CAROUSEL_LENS,
  GLASS_CAROUSEL_MOTION,
} from "@/constants/components/glass-carousel.const";
import type {
  TGlassCarouselLensUniformInput,
  TGlassCarouselLensUniforms,
} from "../interface";

const getLensUniforms = ({
  metrics,
  strength,
  focusScale,
  energy,
  radius,
  scroll,
}: TGlassCarouselLensUniformInput): TGlassCarouselLensUniforms => {
  "worklet";
  const aspect: number = metrics.width / metrics.height;
  const scale: number =
    (1 - GLASS_CAROUSEL_MOTION.shrinkAmount * energy) * focusScale;
  const inset: number = GLASS_CAROUSEL_LENS.clearInset / metrics.height;
  return {
    uResolution: [
      metrics.width * metrics.pixelRatio,
      metrics.height * metrics.pixelRatio,
    ],
    uCenter: [0.5, 0.5],
    uSize: [
      GLASS_CAROUSEL_LENS.sizeX * aspect * 0.5,
      GLASS_CAROUSEL_LENS.sizeY * 0.5,
    ],
    uAspect: aspect,
    uRotation: (GLASS_CAROUSEL_LENS.rotation * Math.PI) / 180,
    uRimStart: GLASS_CAROUSEL_LENS.rimStart,
    uMagnify: GLASS_CAROUSEL_LENS.magnify * strength,
    uRimTangential: GLASS_CAROUSEL_LENS.rimTangential * strength,
    uRimFreq1: GLASS_CAROUSEL_LENS.rimFreq1,
    uRimFreq2: GLASS_CAROUSEL_LENS.rimFreq2,
    uDispersion: GLASS_CAROUSEL_LENS.dispersion,
    uClearCenter: [0.5, 0.5],
    uClearSize: [
      (metrics.cardWidth * scale) / 2 / metrics.height - inset,
      (metrics.cardHeight * scale) / 2 / metrics.height - inset,
    ],
    uClear:
      1 -
      Math.min(
        1,
        Math.abs(scroll - Math.round(scroll)) / GLASS_CAROUSEL_LENS.clearSettle,
      ),
    uClearRadius: Math.max(0, (radius * scale) / metrics.height - inset),
    uClearFeather: GLASS_CAROUSEL_LENS.clearFeather / metrics.height,
  };
};

export { getLensUniforms };
