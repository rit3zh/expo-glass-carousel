import type { Transforms3d } from "@shopify/react-native-skia";
import type {
  TGlassCarouselCardFrame,
  TGlassCarouselMetrics,
} from "../interface";

const getCardTransform = (
  frame: TGlassCarouselCardFrame,
  metrics: TGlassCarouselMetrics,
): Transforms3d => {
  "worklet";
  return [
    { translateX: frame.x },
    { translateY: frame.y },
    { scale: frame.scale },
    { translateX: -metrics.cardWidth / 2 },
    { translateY: -metrics.cardHeight / 2 },
  ];
};

export { getCardTransform };
