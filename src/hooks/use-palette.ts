import type { TScheme } from "@/constants/interface";
import { PALETTE_SCHEMES } from "@/constants/palette.const";
import { useColorScheme } from "react-native";
import type { TPaletteState } from "./interface";

const usePalette = (): TPaletteState => {
  const scheme: TScheme = useColorScheme() === "dark" ? "dark" : "light";
  return { scheme, palette: PALETTE_SCHEMES[scheme] };
};

export { usePalette };
