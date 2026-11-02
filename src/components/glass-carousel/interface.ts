import type { SkImage } from "@shopify/react-native-skia";
import type { ComponentRef, ReactElement, ReactNode, RefObject } from "react";
import type { StyleProp, View, ViewStyle } from "react-native";
import type { SharedValue } from "react-native-reanimated";

import type { TPalette, TScheme } from "@/constants/interface";

interface IGlassCarousel {
  defaultIndex?: number;
  cardHeight?: number;
  aspect?: number;
  gap?: number;
  radius?: number;
  accessibilityLabel?: string;
  onIndexChange?: (index: number) => void;
  onFocusChange?: (focused: boolean) => void;
  background?: ReactNode;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

interface IGlassCarouselItem {
  label?: string;
  captureKey?: string | number;
  ready?: boolean;
  backdrop?: ReactNode;
  children?: ReactNode;
}

interface IGlassCarouselCapture {
  index: number;
  metrics: TGlassCarouselMetrics;
  captureKey?: string | number;
  ready?: boolean;
  backdrop?: ReactNode;
  onCapture: (index: number, image: SkImage) => void;
  children?: ReactNode;
}

interface IGlassCarouselViewport {
  accessibilityLabel?: string;
}

interface IGlassCarouselStage extends IGlassCarouselViewport {
  metrics: TGlassCarouselMetrics;
}

interface IGlassCarouselCard {
  offset: number;
  metrics: TGlassCarouselMetrics;
  images: SharedValue<TGlassCarouselImages>;
  engine: TGlassCarouselEngine;
  itemCount: number;
  radius: number;
  placeholderColor: string;
}

interface IGlassCarouselContext {
  itemCount: number;
  hasBackground: boolean;
  labels: readonly string[];
  images: SharedValue<TGlassCarouselImages>;
  reveal: SharedValue<number>;
  metrics: TGlassCarouselMetrics | null;
  radius: number;
  palette: TPalette;
  scheme: TScheme;
  engine: TGlassCarouselEngine;
  index: number;
  focused: boolean;
  reducedMotion: boolean;
  next: () => void;
  previous: () => void;
  open: () => void;
  close: () => void;
  notifyFocus: TGlassCarouselNotify;
}

type TGlassCarouselImages = readonly (SkImage | null)[];

type TGlassCarouselChildren = {
  slides: readonly ReactElement<IGlassCarouselItem>[];
  overlays: readonly ReactNode[];
};

type TViewSnapshotInput = {
  ref: RefObject<ComponentRef<typeof View> | null>;
  layoutVersion: number;
  captureKey?: string | number;
  ready?: boolean;
  width: number;
  height: number;
  delayOffset: number;
  onCapture: (image: SkImage) => void;
};

type TGlassCarouselSnapshotInput = {
  images: SharedValue<TGlassCarouselImages>;
  reveal: SharedValue<number>;
  slot: number;
  image: SkImage;
  itemCount: number;
};

type TGlassCarouselSize = {
  width: number;
  height: number;
};

type TGlassCarouselMetricsInput = {
  size: TGlassCarouselSize;
  cardHeight: number;
  aspect: number;
  gap: number;
  pixelRatio: number;
};

type TGlassCarouselMetrics = {
  width: number;
  height: number;
  cardWidth: number;
  cardHeight: number;
  gap: number;
  slot: number;
  reach: number;
  pixelRatio: number;
  offsets: readonly number[];
};

type TGlassCarouselEngine = {
  layout: SharedValue<TGlassCarouselMetrics | null>;
  scroll: SharedValue<number>;
  target: SharedValue<number>;
  velocity: SharedValue<number>;
  previousScroll: SharedValue<number>;
  energy: SharedValue<number>;
  moveIdle: SharedValue<number>;
  dragging: SharedValue<boolean>;
  pending: SharedValue<number | null>;
  focusActive: SharedValue<boolean>;
  focusOpen: SharedValue<boolean>;
  focusLatch: SharedValue<number>;
  lensFx: SharedValue<number>;
  focusScale: SharedValue<number>;
};

type TGlassCarouselEngineInput = {
  itemCount: number;
  defaultIndex: number;
  metrics: TGlassCarouselMetrics | null;
  onIndexChange?: (index: number) => void;
  onFocusChange?: (focused: boolean) => void;
};

type TGlassCarouselEngineResult = {
  engine: TGlassCarouselEngine;
  index: number;
  focused: boolean;
  reducedMotion: boolean;
  next: () => void;
  previous: () => void;
  open: () => void;
  close: () => void;
  notifyFocus: TGlassCarouselNotify;
};

type TGlassCarouselGesturesInput = {
  engine: TGlassCarouselEngine;
  metrics: TGlassCarouselMetrics;
  notifyFocus: TGlassCarouselNotify;
};

type TGlassCarouselNotify = (focused: boolean) => void;

type TGlassCarouselCardFrame = {
  x: number;
  y: number;
  scale: number;
  index: number;
};

type TGlassCarouselCardFrameInput = {
  offset: number;
  metrics: TGlassCarouselMetrics;
  scroll: number;
  energy: number;
  focusScale: number;
  drop: number;
};

type TGlassCarouselCardDropInput = {
  drop: SharedValue<number>;
  open: boolean;
  previous: boolean | null;
  offset: number;
  reach: number;
};

type TGlassCarouselLens = {
  sizeX: number;
  sizeY: number;
  rotation: number;
  rimStart: number;
  magnify: number;
  rimTangential: number;
  rimFreq1: number;
  rimFreq2: number;
  dispersion: number;
  clearSettle: number;
  clearInset: number;
  clearFeather: number;
};

type TGlassCarouselLensUniformInput = {
  metrics: TGlassCarouselMetrics;
  strength: number;
  focusScale: number;
  energy: number;
  radius: number;
  scroll: number;
};

type TGlassCarouselLensUniforms = {
  uResolution: readonly [number, number];
  uCenter: readonly [number, number];
  uSize: readonly [number, number];
  uAspect: number;
  uRotation: number;
  uRimStart: number;
  uMagnify: number;
  uRimTangential: number;
  uRimFreq1: number;
  uRimFreq2: number;
  uDispersion: number;
  uClearCenter: readonly [number, number];
  uClearSize: readonly [number, number];
  uClear: number;
  uClearRadius: number;
  uClearFeather: number;
};

type TGlassCarouselBackdropBlur = {
  radius: number;
  start: number;
  end: number;
  composeDelay: number;
};

type TGlassCarouselFocus = {
  cardDuration: number;
  focusDuration: number;
  stagger: number;
  dropDistance: number;
  centerScale: number;
  lensFade: number;
  closeDuration: number;
  closeStagger: number;
  closeLensFade: number;
};

type TGlassCarouselMotion = {
  touchDrag: number;
  friction: number;
  frameMs: number;
  maxFrameMs: number;
  springStepMs: number;
  stiffness: number;
  damping: number;
  reducedStiffness: number;
  reducedDamping: number;
  flickVelocity: number;
  flickIdleMs: number;
  shrinkMax: number;
  shrinkAttack: number;
  shrinkDecay: number;
  shrinkAmount: number;
  velocityEpsilon: number;
  settleEpsilon: number;
  restEpsilon: number;
  energyEpsilon: number;
};

export {
  type IGlassCarousel,
  type IGlassCarouselCapture,
  type IGlassCarouselCard,
  type IGlassCarouselContext,
  type IGlassCarouselItem,
  type IGlassCarouselStage,
  type IGlassCarouselViewport,
  type TGlassCarouselBackdropBlur,
  type TGlassCarouselCardDropInput,
  type TGlassCarouselCardFrame,
  type TGlassCarouselCardFrameInput,
  type TGlassCarouselChildren,
  type TGlassCarouselEngine,
  type TGlassCarouselEngineInput,
  type TGlassCarouselEngineResult,
  type TGlassCarouselFocus,
  type TGlassCarouselGesturesInput,
  type TGlassCarouselImages,
  type TGlassCarouselLens,
  type TGlassCarouselLensUniformInput,
  type TGlassCarouselLensUniforms,
  type TGlassCarouselMetrics,
  type TGlassCarouselMetricsInput,
  type TGlassCarouselMotion,
  type TGlassCarouselNotify,
  type TGlassCarouselSize,
  type TGlassCarouselSnapshotInput,
  type TViewSnapshotInput,
};
