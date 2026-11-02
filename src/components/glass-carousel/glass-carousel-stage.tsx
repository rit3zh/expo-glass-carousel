import {
  GLASS_CAROUSEL_ACCESSIBILITY_ACTIONS,
  GLASS_CAROUSEL_LENS_SHADER,
} from "@/constants/components/glass-carousel.const";
import { getRuntimeEffect } from "@/utils/get-runtime-effect.util";
import { registerComponent } from "@/utils/register-component.util";
import {
  Canvas,
  Fill,
  Group,
  Paint,
  RuntimeShader,
  type SkRuntimeEffect,
} from "@shopify/react-native-skia";
import type { FC } from "react";
import { type AccessibilityActionEvent, StyleSheet, View } from "react-native";
import {
  type ComposedGesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { type DerivedValue, useDerivedValue } from "react-native-reanimated";
import { GlassCarouselCard } from "./glass-carousel-card";
import { useCarouselGestures } from "./hooks/use-carousel-gestures";
import { useGlassCarousel } from "./hooks/use-glass-carousel";
import type {
  IGlassCarouselContext,
  IGlassCarouselStage,
  TGlassCarouselLensUniforms,
} from "./interface";
import { getLensUniforms } from "./utils/get-lens-uniforms.util";

const GlassCarouselStageBase: FC<IGlassCarouselStage> = ({
  metrics,
  accessibilityLabel,
}: IGlassCarouselStage &
  React.ComponentProps<typeof GlassCarouselStageBase>): React.ReactNode &
  React.JSX.Element => {
  const {
    itemCount,
    hasBackground,
    labels,
    images,
    reveal,
    radius,
    palette,
    engine,
    index,
    focused,
    next,
    previous,
    open,
    close,
    notifyFocus,
  }: IGlassCarouselContext = useGlassCarousel();
  const gesture: ComposedGesture = useCarouselGestures({
    engine,
    metrics,
    notifyFocus,
  });
  const effect: SkRuntimeEffect | null = getRuntimeEffect(
    GLASS_CAROUSEL_LENS_SHADER,
  );
  const uniforms: DerivedValue<TGlassCarouselLensUniforms> =
    useDerivedValue<TGlassCarouselLensUniforms>(
      (): TGlassCarouselLensUniforms =>
        getLensUniforms({
          metrics,
          strength: engine.lensFx.get(),
          focusScale: engine.focusScale.get(),
          energy: engine.energy.get(),
          radius,
          scroll: engine.scroll.get(),
        }),
    );
  const label: string = labels[index] ?? `Item ${index + 1}`;

  return (
    <GestureDetector gesture={gesture}>
      <View
        style={StyleSheet.absoluteFill}
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel={accessibilityLabel}
        accessibilityValue={{
          text: `${label}, ${index + 1} of ${itemCount}${focused ? ", focused" : ""}`,
        }}
        accessibilityActions={GLASS_CAROUSEL_ACCESSIBILITY_ACTIONS}
        onAccessibilityAction={(event: AccessibilityActionEvent): void => {
          const action: string = event.nativeEvent.actionName;
          if (action === "increment") {
            next();
          } else if (action === "decrement") {
            previous();
          } else if (action === "activate") {
            open();
          } else if (action === "escape") {
            close();
          }
        }}
      >
        <Canvas style={StyleSheet.absoluteFill}>
          <Group transform={[{ scale: 1 / metrics.pixelRatio }]}>
            <Group
              layer={
                effect === null ? (
                  false
                ) : (
                  <Paint>
                    <RuntimeShader source={effect} uniforms={uniforms} />
                  </Paint>
                )
              }
              transform={[{ scale: metrics.pixelRatio }]}
            >
              <Fill
                color={hasBackground ? "transparent" : palette.background}
              />
              <Group opacity={reveal}>
                {metrics.offsets.map(
                  (offset: number): React.JSX.Element => (
                    <GlassCarouselCard
                      key={offset}
                      offset={offset}
                      metrics={metrics}
                      images={images}
                      engine={engine}
                      itemCount={itemCount}
                      radius={radius}
                      placeholderColor={palette.surface}
                    />
                  ),
                )}
              </Group>
            </Group>
          </Group>
        </Canvas>
      </View>
    </GestureDetector>
  );
};

const GlassCarouselStage = registerComponent(
  "GlassCarouselStage",
  GlassCarouselStageBase,
);

export { GlassCarouselStage };
