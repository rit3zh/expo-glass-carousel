import {
  GLASS_CAROUSEL_EASE_POWER4_OUT,
  GLASS_CAROUSEL_FOCUS,
} from "@/constants/components/glass-carousel.const";
import { withDelay, withTiming } from "react-native-reanimated";
import type { TGlassCarouselCardDropInput } from "../interface";

const animateCardDrop = ({
  drop,
  open,
  previous,
  offset,
  reach,
}: TGlassCarouselCardDropInput) => {
  "worklet";
  if (previous === null || open === previous || offset === 0) {
    return;
  }
  const rank: number = Math.abs(offset);
  if (open) {
    drop.set(
      withDelay(
        (rank - 1) * GLASS_CAROUSEL_FOCUS.stagger,
        withTiming(1, {
          duration: GLASS_CAROUSEL_FOCUS.cardDuration,
          easing: GLASS_CAROUSEL_EASE_POWER4_OUT,
        }),
      ),
    );
    return;
  }
  drop.set(
    withDelay(
      Math.max(reach - rank, 0) *
        GLASS_CAROUSEL_FOCUS.stagger *
        GLASS_CAROUSEL_FOCUS.closeStagger,
      withTiming(0, {
        duration:
          GLASS_CAROUSEL_FOCUS.cardDuration *
          GLASS_CAROUSEL_FOCUS.closeDuration,
        easing: GLASS_CAROUSEL_EASE_POWER4_OUT,
      }),
    ),
  );
};

export { animateCardDrop };
