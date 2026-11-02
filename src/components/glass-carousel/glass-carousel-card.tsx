import { registerComponent } from "@/utils/register-component.util";
import {
  Group,
  Image,
  Rect,
  rect,
  rrect,
  type SkImage,
  type SkRRect,
  type Transforms3d,
} from "@shopify/react-native-skia";
import type { FC } from "react";
import {
  type DerivedValue,
  type SharedValue,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import type { IGlassCarouselCard, TGlassCarouselCardFrame } from "./interface";
import { animateCardDrop } from "./utils/animate-card-drop.util";
import { getCardFrame } from "./utils/get-card-frame.util";
import { getCardTransform } from "./utils/get-card-transform.util";
import { wrapIndex } from "./utils/wrap-index.util";

const GlassCarouselCardBase: FC<IGlassCarouselCard> = ({
  offset,
  metrics,
  images,
  engine,
  itemCount,
  radius,
  placeholderColor,
}: IGlassCarouselCard &
  React.ComponentProps<typeof GlassCarouselCardBase>): React.ReactNode &
  React.JSX.Element => {
  const drop: SharedValue<number> = useSharedValue<number>(0);

  useAnimatedReaction<boolean>(
    (): boolean => engine.focusOpen.get(),
    (open: boolean, previous: boolean | null): void => {
      animateCardDrop({ drop, open, previous, offset, reach: metrics.reach });
    },
  );

  const frame: DerivedValue<TGlassCarouselCardFrame> =
    useDerivedValue<TGlassCarouselCardFrame>(
      (): TGlassCarouselCardFrame =>
        getCardFrame({
          offset,
          metrics,
          scroll: engine.scroll.get(),
          energy: engine.energy.get(),
          focusScale: engine.focusScale.get(),
          drop: drop.get(),
        }),
    );
  const transform: DerivedValue<Transforms3d> = useDerivedValue<Transforms3d>(
    (): Transforms3d => getCardTransform(frame.get(), metrics),
  );
  const image: DerivedValue<SkImage | null> = useDerivedValue<SkImage | null>(
    (): SkImage | null =>
      images.get()[wrapIndex(frame.get().index, itemCount)] ?? null,
  );
  const clip: SkRRect = rrect(
    rect(0, 0, metrics.cardWidth, metrics.cardHeight),
    radius,
    radius,
  );

  return (
    <Group transform={transform} clip={clip}>
      <Rect
        x={0}
        y={0}
        width={metrics.cardWidth}
        height={metrics.cardHeight}
        color={placeholderColor}
      />
      <Image
        image={image}
        x={0}
        y={0}
        width={metrics.cardWidth}
        height={metrics.cardHeight}
        fit="fill"
      />
    </Group>
  );
};

const GlassCarouselCard = registerComponent(
  "GlassCarouselCard",
  GlassCarouselCardBase,
);

export { GlassCarouselCard };
