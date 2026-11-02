import { GLASS_CAROUSEL_MOTION } from "@/constants/components/glass-carousel.const";
import { useEffect, useState } from "react";
import {
  type FrameInfo,
  type SharedValue,
  useAnimatedReaction,
  useFrameCallback,
  useReducedMotion,
  useSharedValue,
} from "react-native-reanimated";
import { scheduleOnRN, scheduleOnUI } from "react-native-worklets";
import type {
  TGlassCarouselEngine,
  TGlassCarouselEngineInput,
  TGlassCarouselEngineResult,
  TGlassCarouselMetrics,
} from "../interface";
import { closeFocus } from "../utils/close-focus.util";
import { openFocus } from "../utils/open-focus.util";
import { stepBy } from "../utils/step-by.util";
import { stepCarousel } from "../utils/step-carousel.util";
import { wrapIndex } from "../utils/wrap-index.util";

const useGlassCarouselEngine = ({
  itemCount,
  defaultIndex,
  metrics,
  onIndexChange,
  onFocusChange,
}: TGlassCarouselEngineInput): TGlassCarouselEngineResult => {
  const reducedMotion: boolean = useReducedMotion();
  const [index, setIndex] = useState<number>(
    wrapIndex(defaultIndex, itemCount),
  );
  const [focused, setFocused] = useState<boolean>(false);

  const layout: SharedValue<TGlassCarouselMetrics | null> =
    useSharedValue<TGlassCarouselMetrics | null>(null);
  const scroll = useSharedValue<number>(defaultIndex);
  const target = useSharedValue<number>(defaultIndex);
  const velocity = useSharedValue<number>(0);
  const previousScroll = useSharedValue<number>(defaultIndex);
  const energy = useSharedValue<number>(0);
  const moveIdle = useSharedValue<number>(0);
  const dragging = useSharedValue<boolean>(false);
  const pending: SharedValue<number | null> = useSharedValue<number | null>(
    null,
  );
  const focusActive = useSharedValue<boolean>(false);
  const focusOpen = useSharedValue<boolean>(false);
  const focusLatch = useSharedValue<number>(0);
  const lensFx = useSharedValue<number>(1);
  const focusScale = useSharedValue<number>(1);

  const engine: TGlassCarouselEngine = {
    layout,
    scroll,
    target,
    velocity,
    previousScroll,
    energy,
    moveIdle,
    dragging,
    pending,
    focusActive,
    focusOpen,
    focusLatch,
    lensFx,
    focusScale,
  };

  const notifyFocus = (next: boolean) => {
    setFocused(next);
    onFocusChange?.(next);
  };

  const notifyIndex = (next: number) => {
    setIndex(next);
    onIndexChange?.(next);
  };

  useEffect(() => {
    layout.set(metrics);
  }, [layout, metrics]);

  useFrameCallback((frame: FrameInfo) => {
    stepCarousel(
      engine,
      frame.timeSincePreviousFrame ?? GLASS_CAROUSEL_MOTION.frameMs,
      reducedMotion,
      notifyFocus,
    );
  });

  useAnimatedReaction<number>(
    (): number => wrapIndex(Math.round(scroll.get()), itemCount),
    (current: number, previous: number | null) => {
      if (previous !== null && current !== previous) {
        scheduleOnRN(notifyIndex, current);
      }
    },
  );

  return {
    engine,
    index,
    focused,
    reducedMotion,
    next: () => scheduleOnUI(stepBy, engine, 1),
    previous: () => scheduleOnUI(stepBy, engine, -1),
    open: () => scheduleOnUI(openFocus, engine, notifyFocus),
    close: () => scheduleOnUI(closeFocus, engine, notifyFocus),
    notifyFocus,
  };
};

export { useGlassCarouselEngine };
