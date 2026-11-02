import type { TRgb } from "./interface";

const hexToRgb = (hex: string): TRgb => {
  const value: string = hex.trim().replace("#", "");
  const full: string =
    value.length === 3
      ? value
          .split("")
          .map((char: string): string => char + char)
          .join("")
      : value.slice(0, 6);
  const parsed: number = Number.parseInt(full, 16);
  if (!Number.isFinite(parsed)) {
    return [1, 1, 1];
  }
  return [((parsed >> 16) & 255) / 255, ((parsed >> 8) & 255) / 255, (parsed & 255) / 255];
};

export { hexToRgb };
