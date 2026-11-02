import type { TPalette, TScheme } from "./interface";

const PALETTE_LIGHT: TPalette = {
  background: "#fcfcfd",
  panel: "#f9f9fb",
  surface: "#f0f0f3",
  border: "#d9d9e0",
  text: "#1c2024",
  textMuted: "#60646c",
  accent: "#0090ff",
};

const PALETTE_DARK: TPalette = {
  background: "#111113",
  panel: "#18191b",
  surface: "#212225",
  border: "#363a3f",
  text: "#edeef0",
  textMuted: "#b0b4ba",
  accent: "#0090ff",
};

const PALETTE_SCHEMES: Record<TScheme, TPalette> = {
  light: PALETTE_LIGHT,
  dark: PALETTE_DARK,
};

export { PALETTE_DARK, PALETTE_LIGHT, PALETTE_SCHEMES };
