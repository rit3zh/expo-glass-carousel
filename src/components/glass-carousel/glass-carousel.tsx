import {
  GLASS_CAROUSEL_CARD_ASPECT,
  GLASS_CAROUSEL_CARD_HEIGHT,
  GLASS_CAROUSEL_CARD_RADIUS,
  GLASS_CAROUSEL_GAP,
  GLASS_CAROUSEL_REVEAL_FALLBACK_MS,
} from "@/constants/components/glass-carousel.const";
import type { TPaletteState } from "@/hooks/interface";
import { usePalette } from "@/hooks/use-palette";
import { createCompoundComponent } from "@/utils/create-compound-component.util";
import type { SkImage } from "@shopify/react-native-skia";
import {
  type FC,
  type ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  type LayoutChangeEvent,
  PixelRatio,
  StyleSheet,
  View,
} from "react-native";
import { type SharedValue, useSharedValue } from "react-native-reanimated";
import { scheduleOnUI } from "react-native-worklets";
import { GlassCarouselCapture } from "./glass-carousel-capture";
import { GlassCarouselContext } from "./glass-carousel-context";
import { GlassCarouselItem } from "./glass-carousel-item";
import { GlassCarouselViewport } from "./glass-carousel-viewport";
import { useGlassCarouselEngine } from "./hooks/use-glass-carousel-engine";
import type {
  IGlassCarousel,
  IGlassCarouselContext,
  IGlassCarouselItem,
  TGlassCarouselChildren,
  TGlassCarouselEngineResult,
  TGlassCarouselImages,
  TGlassCarouselMetrics,
  TGlassCarouselSize,
} from "./interface";
import { getGlassCarouselMetrics } from "./utils/get-glass-carousel-metrics.util";
import { revealCarousel } from "./utils/reveal-carousel.util";
import { splitCarouselChildren } from "./utils/split-carousel-children.util";
import { storeSnapshot } from "./utils/store-snapshot.util";

const GlassCarouselRootBase: FC<IGlassCarousel> = ({
  defaultIndex = 0,
  cardHeight = GLASS_CAROUSEL_CARD_HEIGHT,
  aspect = GLASS_CAROUSEL_CARD_ASPECT,
  gap = GLASS_CAROUSEL_GAP,
  radius = GLASS_CAROUSEL_CARD_RADIUS,
  accessibilityLabel = "Liquid glass carousel",
  onIndexChange,
  onFocusChange,
  style,
  background,
  children,
}: IGlassCarousel &
  React.ComponentProps<typeof GlassCarouselRootBase>): React.ReactNode &
  React.JSX.Element => {
  const { palette, scheme }: TPaletteState = usePalette();
  const [size, setSize] = useState<TGlassCarouselSize | null>(null);
  const images: SharedValue<TGlassCarouselImages> =
    useSharedValue<TGlassCarouselImages>([]);
  const reveal: SharedValue<number> = useSharedValue<number>(0);
  const { slides, overlays }: TGlassCarouselChildren =
    splitCarouselChildren(children);
  const metrics: TGlassCarouselMetrics | null =
    useMemo<TGlassCarouselMetrics | null>(
      (): TGlassCarouselMetrics | null =>
        size === null
          ? null
          : getGlassCarouselMetrics({
              size,
              cardHeight,
              aspect,
              gap,
              pixelRatio: PixelRatio.get(),
            }),
      [size, cardHeight, aspect, gap],
    );
  const labels: readonly string[] = slides.map(
    (slide: ReactElement<IGlassCarouselItem>, position: number): string =>
      slide.props.label ?? `Item ${position + 1}`,
  );
  const state: TGlassCarouselEngineResult = useGlassCarouselEngine({
    itemCount: slides.length,
    defaultIndex,
    metrics,
    onIndexChange,
    onFocusChange,
  });
  const context: IGlassCarouselContext = {
    ...state,
    itemCount: slides.length,
    hasBackground: background !== undefined,
    labels,
    images,
    reveal,
    metrics,
    radius,
    palette,
    scheme,
  };

  useEffect((): (() => void) => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(
      (): void => scheduleOnUI(revealCarousel, reveal),
      GLASS_CAROUSEL_REVEAL_FALLBACK_MS,
    );
    return (): void => clearTimeout(timer);
  }, [reveal]);

  return (
    <GlassCarouselContext value={context}>
      <View
        style={[styles.root, { backgroundColor: palette.background }, style]}
        onLayout={(event: LayoutChangeEvent): void => {
          const { width, height } = event.nativeEvent.layout;
          setSize(
            (current: TGlassCarouselSize | null): TGlassCarouselSize =>
              current !== null &&
              current.width === width &&
              current.height === height
                ? current
                : { width, height },
          );
        }}
      >
        {metrics === null
          ? null
          : slides.map(
              (
                slide: ReactElement<IGlassCarouselItem>,
                position: number,
              ): React.JSX.Element => (
                <GlassCarouselCapture
                  key={slide.key ?? position}
                  index={position}
                  metrics={metrics}
                  captureKey={slide.props.captureKey}
                  ready={slide.props.ready}
                  backdrop={slide.props.backdrop}
                  onCapture={(slot: number, image: SkImage): void =>
                    scheduleOnUI(storeSnapshot, {
                      images,
                      reveal,
                      slot,
                      image,
                      itemCount: slides.length,
                    })
                  }
                >
                  {slide.props.children}
                </GlassCarouselCapture>
              ),
            )}
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: palette.background },
          ]}
        />
        {background}
        <GlassCarouselViewport accessibilityLabel={accessibilityLabel} />
        {overlays}
      </View>
    </GlassCarouselContext>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: "hidden",
  },
});

const GlassCarousel = createCompoundComponent(
  "GlassCarousel",
  GlassCarouselRootBase,
  {
    Root: GlassCarouselRootBase,
    Item: GlassCarouselItem,
  },
);

export { GlassCarousel };
