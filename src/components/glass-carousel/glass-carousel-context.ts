import { createContext, type Context } from "react";
import type { IGlassCarouselContext } from "./interface";

const GlassCarouselContext: Context<IGlassCarouselContext | null> =
  createContext<IGlassCarouselContext | null>(null);

export { GlassCarouselContext };
