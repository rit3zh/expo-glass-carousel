import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { GlassCarouselItem } from "../glass-carousel-item";
import type { IGlassCarouselItem, TGlassCarouselChildren } from "../interface";

const splitCarouselChildren = (children: ReactNode): TGlassCarouselChildren => {
  const slides: ReactElement<IGlassCarouselItem>[] = [];
  const overlays: ReactNode[] = [];
  Children.toArray(children).forEach((child: ReactNode): void => {
    if (
      isValidElement<IGlassCarouselItem>(child) &&
      child.type === GlassCarouselItem
    ) {
      slides.push(child);
      return;
    }
    overlays.push(child);
  });
  return { slides, overlays };
};

export { splitCarouselChildren };
