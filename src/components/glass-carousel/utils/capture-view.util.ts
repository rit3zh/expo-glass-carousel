import { Skia, type SkImage } from "@shopify/react-native-skia";
import type { ComponentRef, RefObject } from "react";
import { findNodeHandle, type View } from "react-native";

const captureView = async (ref: RefObject<ComponentRef<typeof View> | null>): Promise<SkImage | null> => {
  const tag: number | null = ref.current === null ? null : (findNodeHandle(ref.current) ?? null);
  if (tag === null || tag === 0) {
    return null;
  }
  try {
    return await Skia.Image.MakeImageFromViewTag(tag);
  } catch {
    return null;
  }
};

export { captureView };
