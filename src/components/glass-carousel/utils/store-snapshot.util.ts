import type { SkImage } from "@shopify/react-native-skia";
import type { TGlassCarouselSnapshotInput } from "../interface";
import { revealCarousel } from "./reveal-carousel.util";

const storeSnapshot = ({
  images,
  reveal,
  slot,
  image,
  itemCount,
}: TGlassCarouselSnapshotInput): void => {
  "worklet";
  const next: (SkImage | null)[] = images.get().slice();
  next[slot] = image;
  images.set(next);
  const captured: number = next
    .slice(0, itemCount)
    .filter((entry: SkImage | null): boolean => entry != null).length;
  if (captured === itemCount) {
    revealCarousel(reveal);
  }
};

export { storeSnapshot };
