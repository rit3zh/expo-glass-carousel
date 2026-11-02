import {
  GLASS_CAROUSEL_EASE_POWER3_OUT,
  GLASS_CAROUSEL_FOCUS,
} from "@/constants/components/glass-carousel.const";
import { withTiming } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import type { TGlassCarouselEngine, TGlassCarouselNotify } from "../interface";
import { isCarouselLocked } from "./is-carousel-locked.util";

const openFocus = (
  engine: TGlassCarouselEngine,
  notify: TGlassCarouselNotify,
): void => {
  "worklet";
  if (isCarouselLocked(engine)) {
    return;
  }
  engine.focusActive.set(true);
  engine.focusOpen.set(true);
  engine.pending.set(null);
  engine.velocity.set(0);
  engine.target.set(Math.round(engine.scroll.get()));
  engine.lensFx.set(
    withTiming(0, {
      duration: GLASS_CAROUSEL_FOCUS.lensFade,
      easing: GLASS_CAROUSEL_EASE_POWER3_OUT,
    }),
  );
  engine.focusScale.set(
    withTiming(GLASS_CAROUSEL_FOCUS.centerScale, {
      duration: GLASS_CAROUSEL_FOCUS.focusDuration,
      easing: GLASS_CAROUSEL_EASE_POWER3_OUT,
    }),
  );
  scheduleOnRN(notify, true);
};

export { openFocus };
