import type { SkImage } from "@shopify/react-native-skia";
import { useEffect, useEffectEvent } from "react";

import { GLASS_CAROUSEL_CAPTURE_DELAYS } from "@/constants/components/glass-carousel.const";

import type { TViewSnapshotInput } from "../interface";
import { captureView } from "../utils/capture-view.util";

const useViewSnapshot = ({
  ref,
  layoutVersion,
  captureKey,
  ready = true,
  width,
  height,
  delayOffset,
  onCapture,
}: TViewSnapshotInput) => {
  const emit = useEffectEvent((image: SkImage) => {
    onCapture(image);
  });

  useEffect((): (() => void) => {
    let cancelled: boolean = false;
    const timers: ReturnType<typeof setTimeout>[] =
      layoutVersion === 0 || !ready
        ? []
        : GLASS_CAROUSEL_CAPTURE_DELAYS.map(
            (delay: number): ReturnType<typeof setTimeout> =>
              setTimeout(() => {
                captureView(ref).then((image: SkImage | null) => {
                  if (!cancelled && image !== null) {
                    emit(image);
                  }
                });
              }, delay + delayOffset),
          );
    return () => {
      cancelled = true;
      timers.forEach((timer: ReturnType<typeof setTimeout>) =>
        clearTimeout(timer),
      );
    };
  }, [ref, layoutVersion, captureKey, ready, width, height, delayOffset]);
};

export { useViewSnapshot };
