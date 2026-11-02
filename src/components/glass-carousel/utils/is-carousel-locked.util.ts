import type { TGlassCarouselEngine } from "../interface";

const isCarouselLocked = (engine: TGlassCarouselEngine): boolean => {
  "worklet";
  return engine.focusActive.get();
};

export { isCarouselLocked };
