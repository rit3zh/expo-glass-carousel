import { Skia, type SkRuntimeEffect } from "@shopify/react-native-skia";

const runtimeEffects: Map<string, SkRuntimeEffect | null> = new Map<string, SkRuntimeEffect | null>();

const getRuntimeEffect = (source: string): SkRuntimeEffect | null => {
  const cached: SkRuntimeEffect | null | undefined = runtimeEffects.get(source);
  if (cached !== undefined) {
    return cached;
  }
  const effect: SkRuntimeEffect | null = Skia.RuntimeEffect.Make(source);
  runtimeEffects.set(source, effect);
  return effect;
};

export { getRuntimeEffect };
