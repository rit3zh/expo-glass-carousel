import {
  GLASS_CAROUSEL_BACKDROP_BLUR,
  GLASS_CAROUSEL_BACKDROP_BLUR_SHADER,
} from "@/constants/components/glass-carousel.const";
import { getRuntimeEffect } from "@/utils/get-runtime-effect.util";
import {
  FilterMode,
  MipmapMode,
  rect,
  Skia,
  type SkImage,
  type SkRuntimeEffect,
  type SkSurface,
  TileMode,
} from "@shopify/react-native-skia";

const blurPass = (
  effect: SkRuntimeEffect,
  source: SkImage,
  direction: readonly [number, number],
  radius: number,
): SkImage | null => {
  const width = source.width();
  const height = source.height();
  const surface: SkSurface | null = Skia.Surface.MakeOffscreen(width, height);
  if (surface === null) {
    return null;
  }
  const paint = Skia.Paint();
  paint.setShader(
    effect.makeShaderWithChildren(
      [
        width,
        height,
        direction[0],
        direction[1],
        radius,
        GLASS_CAROUSEL_BACKDROP_BLUR.start,
        GLASS_CAROUSEL_BACKDROP_BLUR.end,
      ],
      [
        source.makeShaderOptions(
          TileMode.Clamp,
          TileMode.Clamp,
          FilterMode.Linear,
          MipmapMode.None,
        ),
      ],
    ),
  );
  surface.getCanvas().drawPaint(paint);
  surface.flush();
  return surface.makeImageSnapshot();
};

const composeBackdrop = (
  backdrop: SkImage,
  foreground: SkImage,
  cardWidth: number,
): SkImage => {
  const width = backdrop.width();
  const height = backdrop.height();
  const effect: SkRuntimeEffect | null = getRuntimeEffect(
    GLASS_CAROUSEL_BACKDROP_BLUR_SHADER,
  );
  const radius = GLASS_CAROUSEL_BACKDROP_BLUR.radius * (width / cardWidth);
  const horizontal: SkImage | null =
    effect === null ? null : blurPass(effect, backdrop, [1, 0], radius);
  const blurred: SkImage | null =
    effect === null || horizontal === null
      ? null
      : blurPass(effect, horizontal, [0, 1], radius);
  const surface: SkSurface | null =
    Skia.Surface.MakeOffscreen(width, height) ??
    Skia.Surface.Make(width, height);
  if (surface === null) {
    return foreground;
  }
  const canvas = surface.getCanvas();
  canvas.drawImage(blurred ?? backdrop, 0, 0);
  canvas.drawImageRect(
    foreground,
    rect(0, 0, foreground.width(), foreground.height()),
    rect(0, 0, width, height),
    Skia.Paint(),
  );
  surface.flush();
  const composed: SkImage = surface.makeImageSnapshot();
  return composed.makeNonTextureImage() ?? composed;
};

export { composeBackdrop };
