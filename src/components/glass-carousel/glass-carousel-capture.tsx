import {
  GLASS_CAROUSEL_BACKDROP_BLUR,
  GLASS_CAROUSEL_CAPTURE_STAGGER,
} from "@/constants/components/glass-carousel.const";
import { registerComponent } from "@/utils/register-component.util";
import type { SkImage } from "@shopify/react-native-skia";
import {
  type ComponentRef,
  type FC,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { StyleSheet, View } from "react-native";
import { useViewSnapshot } from "./hooks/use-view-snapshot";
import type { IGlassCarouselCapture } from "./interface";
import { composeBackdrop } from "./utils/compose-backdrop.util";

const GlassCarouselCaptureBase: FC<IGlassCarouselCapture> = ({
  index,
  metrics,
  captureKey,
  ready = true,
  backdrop,
  onCapture,
  children,
}: IGlassCarouselCapture &
  React.ComponentProps<typeof GlassCarouselCaptureBase>): React.ReactNode &
  React.JSX.Element => {
  const ref: RefObject<ComponentRef<typeof View> | null> =
    useRef<ComponentRef<typeof View>>(null);
  const backdropRef: RefObject<ComponentRef<typeof View> | null> =
    useRef<ComponentRef<typeof View>>(null);
  const layers = useRef<{ backdrop: SkImage | null; foreground: SkImage | null }>({
    backdrop: null,
    foreground: null,
  });
  const composeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [layoutVersion, setLayoutVersion] = useState<number>(0);
  const layered: boolean = backdrop !== undefined;

  useEffect(
    (): (() => void) => (): void => {
      if (composeTimer.current !== null) {
        clearTimeout(composeTimer.current);
      }
    },
    [],
  );

  const scheduleCompose = (): void => {
    if (composeTimer.current !== null) {
      clearTimeout(composeTimer.current);
    }
    composeTimer.current = setTimeout((): void => {
      const { backdrop: back, foreground: front } = layers.current;
      if (back !== null && front !== null) {
        onCapture(index, composeBackdrop(back, front, metrics.cardWidth));
      }
    }, GLASS_CAROUSEL_BACKDROP_BLUR.composeDelay);
  };

  const snapshot = {
    layoutVersion,
    captureKey,
    width: metrics.cardWidth,
    height: metrics.cardHeight,
    delayOffset: index * GLASS_CAROUSEL_CAPTURE_STAGGER,
  };

  useViewSnapshot({
    ...snapshot,
    ref,
    ready,
    onCapture: (image: SkImage): void => {
      if (!layered) {
        onCapture(index, image);
        return;
      }
      layers.current.foreground = image;
      scheduleCompose();
    },
  });

  useViewSnapshot({
    ...snapshot,
    ref: backdropRef,
    ready: ready && layered,
    onCapture: (image: SkImage): void => {
      layers.current.backdrop = image;
      scheduleCompose();
    },
  });

  const frame = [
    styles.capture,
    { width: metrics.cardWidth, height: metrics.cardHeight },
  ];

  return (
    <>
      {layered ? (
        <View
          ref={backdropRef}
          collapsable={false}
          pointerEvents="none"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={frame}
        >
          {backdrop}
        </View>
      ) : null}
      <View
        ref={ref}
        collapsable={false}
        pointerEvents="none"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        onLayout={(): void =>
          setLayoutVersion((version: number): number => version + 1)
        }
        style={frame}
      >
        {children}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  capture: {
    position: "absolute",
    left: 0,
    top: 0,
    overflow: "hidden",
  },
});

const GlassCarouselCapture = registerComponent(
  "GlassCarouselCapture",
  GlassCarouselCaptureBase,
);

export { GlassCarouselCapture };
