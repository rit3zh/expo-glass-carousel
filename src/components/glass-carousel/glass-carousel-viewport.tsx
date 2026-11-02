import { registerComponent } from "@/utils/register-component.util";
import type { FC } from "react";
import { StyleSheet, View } from "react-native";
import { GlassCarouselStage } from "./glass-carousel-stage";
import { useGlassCarousel } from "./hooks/use-glass-carousel";
import type {
  IGlassCarouselContext,
  IGlassCarouselViewport,
} from "./interface";

const GlassCarouselViewportBase: FC<IGlassCarouselViewport> = ({
  accessibilityLabel,
}: IGlassCarouselViewport &
  React.ComponentProps<typeof GlassCarouselViewportBase>): React.ReactNode &
  React.JSX.Element => {
  const { metrics, itemCount }: IGlassCarouselContext = useGlassCarousel();
  if (metrics === null || itemCount === 0) {
    return <View style={StyleSheet.absoluteFill} />;
  }
  return (
    <GlassCarouselStage
      metrics={metrics}
      accessibilityLabel={accessibilityLabel}
    />
  );
};

const GlassCarouselViewport = registerComponent(
  "GlassCarouselViewport",
  GlassCarouselViewportBase,
);

export { GlassCarouselViewport };
