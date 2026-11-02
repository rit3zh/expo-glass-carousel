import {
  GLASS_CAROUSEL_EASE_POWER3_IN_OUT,
  GLASS_CAROUSEL_EASE_POWER3_OUT,
  GLASS_CAROUSEL_FOCUS,
} from "@/constants/components/glass-carousel.const";
import { withTiming } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import type {
  TGlassCarouselEngine,
  TGlassCarouselMetrics,
  TGlassCarouselNotify,
} from "../interface";

const closeFocus = (
  engine: TGlassCarouselEngine,
  notify: TGlassCarouselNotify,
) => {
  "worklet";
  const metrics: TGlassCarouselMetrics | null = engine.layout.get();
  if (!engine.focusOpen.get() || metrics === null) {
    return;
  }
  const lensDuration =
    GLASS_CAROUSEL_FOCUS.lensFade * GLASS_CAROUSEL_FOCUS.closeLensFade;
  const scaleDuration =
    GLASS_CAROUSEL_FOCUS.focusDuration * GLASS_CAROUSEL_FOCUS.closeDuration;
  const dropDuration =
    Math.max(metrics.reach - 1, 0) *
      GLASS_CAROUSEL_FOCUS.stagger *
      GLASS_CAROUSEL_FOCUS.closeStagger +
    GLASS_CAROUSEL_FOCUS.cardDuration * GLASS_CAROUSEL_FOCUS.closeDuration;
  engine.focusOpen.set(false);
  engine.lensFx.set(
    withTiming(1, {
      duration: lensDuration,
      easing: GLASS_CAROUSEL_EASE_POWER3_IN_OUT,
    }),
  );
  engine.focusScale.set(
    withTiming(1, {
      duration: scaleDuration,
      easing: GLASS_CAROUSEL_EASE_POWER3_OUT,
    }),
  );
  engine.focusLatch.set(1);
  engine.focusLatch.set(
    withTiming(
      0,
      { duration: Math.max(lensDuration, scaleDuration, dropDuration) },
      (finished?: boolean) => {
        if (finished && !engine.focusOpen.get()) {
          engine.focusActive.set(false);
        }
      },
    ),
  );
  scheduleOnRN(notify, false);
};

export { closeFocus };
