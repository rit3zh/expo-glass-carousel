import {
  GLASS_CAROUSEL_EASE_POWER3_OUT,
  GLASS_CAROUSEL_REVEAL_DURATION,
} from "@/constants/components/glass-carousel.const";
import { type SharedValue, withTiming } from "react-native-reanimated";

const revealCarousel = <T extends SharedValue<number>>(reveal: T) => {
  "worklet";
  if (reveal.get() > 0) {
    return;
  }
  reveal.set(
    withTiming(1, {
      duration: GLASS_CAROUSEL_REVEAL_DURATION,
      easing: GLASS_CAROUSEL_EASE_POWER3_OUT,
    }),
  );
};

export { revealCarousel };
