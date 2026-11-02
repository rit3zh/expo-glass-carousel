import type { FC } from "react";

import { registerComponent } from "@/utils/register-component.util";

import type { IGlassCarouselItem } from "./interface";

const GlassCarouselItemBase: FC<IGlassCarouselItem> = ({
  children,
}: IGlassCarouselItem & React.ComponentProps<typeof GlassCarouselItemBase>): React.ReactNode & React.JSX.Element => (
  <>{children}</>
);

const GlassCarouselItem = registerComponent("GlassCarousel.Item", GlassCarouselItemBase);

export { GlassCarouselItem };
