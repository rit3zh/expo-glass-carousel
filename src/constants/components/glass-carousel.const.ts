import type {
  TGlassCarouselBackdropBlur,
  TGlassCarouselFocus,
  TGlassCarouselLens,
  TGlassCarouselMotion,
} from "@/components/glass-carousel/interface";
import type { AccessibilityActionInfo } from "react-native";
import { Easing, type EasingFunction } from "react-native-reanimated";

const GLASS_CAROUSEL_ACCESSIBILITY_ACTIONS: readonly AccessibilityActionInfo[] =
  [
    { name: "increment", label: "Next item" },
    { name: "decrement", label: "Previous item" },
    { name: "activate", label: "Focus item" },
    { name: "escape", label: "Close focused item" },
  ];

const GLASS_CAROUSEL_BACKDROP_BLUR: TGlassCarouselBackdropBlur = {
  radius: 26,
  start: 0.38,
  end: 0.86,
  composeDelay: 60,
};

const GLASS_CAROUSEL_BACKDROP_BLUR_SHADER: string = /*glsl*/ `
uniform shader image;
uniform float2 uResolution;
uniform float2 uDirection;
uniform float uRadius;
uniform float uStart;
uniform float uEnd;

const int TAPS = 12;

half4 main(float2 xy) {
  float radius = uRadius * smoothstep(uStart, uEnd, xy.y / uResolution.y);
  if (radius < 0.5) {
    return image.eval(xy);
  }
  float sigma = radius * 0.5;
  half4 sum = half4(0.0);
  float total = 0.0;
  for (int i = -TAPS; i <= TAPS; i++) {
    float offset = float(i) / float(TAPS) * radius;
    float weight = exp(-0.5 * offset * offset / (sigma * sigma));
    float2 point = clamp(xy + uDirection * offset, float2(0.5), uResolution - 0.5);
    sum += image.eval(point) * half(weight);
    total += weight;
  }
  return sum / half(total);
}
`;

const GLASS_CAROUSEL_CAPTURE_DELAYS: readonly number[] = [100, 700];
const GLASS_CAROUSEL_CAPTURE_STAGGER: number = 24;
const GLASS_CAROUSEL_CARD_ASPECT: number = 3 / 4;
const GLASS_CAROUSEL_CARD_HEIGHT: number = 450;
const GLASS_CAROUSEL_CARD_HEIGHT_RATIO: number = 0.62;
const GLASS_CAROUSEL_CARD_MIN_HEIGHT: number = 120;
const GLASS_CAROUSEL_CARD_RADIUS: number = 10;
const GLASS_CAROUSEL_CARD_WIDTH_RATIO: number = 0.82;
const GLASS_CAROUSEL_GAP: number = 12;

const GLASS_CAROUSEL_EASE_POWER3_IN_OUT: EasingFunction = Easing.inOut(
  Easing.poly(4),
);
const GLASS_CAROUSEL_EASE_POWER3_OUT: EasingFunction = Easing.out(
  Easing.poly(4),
);
const GLASS_CAROUSEL_EASE_POWER4_OUT: EasingFunction = Easing.out(
  Easing.poly(5),
);

const GLASS_CAROUSEL_FOCUS: TGlassCarouselFocus = {
  cardDuration: 700,
  focusDuration: 900,
  stagger: 60,
  dropDistance: 1.4,
  centerScale: 1.18,
  lensFade: 850,
  closeDuration: 0.85,
  closeStagger: 0.7,
  closeLensFade: 0.8,
};

const GLASS_CAROUSEL_LENS: TGlassCarouselLens = {
  sizeX: 1.49,
  sizeY: 2.85,
  rotation: 0,
  rimStart: 0.49,
  magnify: 0.45,
  rimTangential: 0,
  rimFreq1: 2,
  rimFreq2: 2,
  dispersion: 0.1,
  clearSettle: 0.5,
  clearInset: 0.9,
  clearFeather: 28,
};

const GLASS_CAROUSEL_LENS_SHADER: string = /*glsl*/ `
uniform shader image;
uniform float2 uResolution;
uniform float2 uCenter;
uniform float2 uSize;
uniform float uAspect;
uniform float uRotation;
uniform float uRimStart;
uniform float uMagnify;
uniform float uRimTangential;
uniform float uRimFreq1;
uniform float uRimFreq2;
uniform float uDispersion;
uniform float2 uClearCenter;
uniform float2 uClearSize;
uniform float uClear;
uniform float uClearRadius;
uniform float uClearFeather;

const int SAMPLES = 12;

float gauss(float x, float width) {
  float v = x / width;
  return exp(-v * v);
}
float4 sampleUV(float2 uv) {
  float2 clamped = clamp(uv, float2(0.0), float2(1.0));
  return float4(image.eval(float2(clamped.x, 1.0 - clamped.y) * uResolution));
}
half4 main(float2 xy) {
  float2 uv = float2(xy.x / uResolution.x, 1.0 - xy.y / uResolution.y);
  float2 clearOffset = abs(float2((uv.x - uClearCenter.x) * uAspect, uv.y - uClearCenter.y)) - uClearSize + uClearRadius;
  float clearDistance = length(max(clearOffset, float2(0.0))) + min(max(clearOffset.x, clearOffset.y), 0.0) - uClearRadius;
  if (uClear >= 1.0 && clearDistance <= 0.0) {
    return image.eval(xy);
  }

  float2 offset = uv - uCenter;
  float2 p = float2(offset.x * uAspect, offset.y);
  float ca = cos(uRotation);
  float sa = sin(uRotation);
  p = float2x2(ca, -sa, sa, ca) * p;
  float field = smoothstep(uRimStart, 1.0, length(p / uSize));
  field *= mix(1.0, smoothstep(0.0, uClearFeather, clearDistance), uClear);
  if (field <= 0.0) {
    return image.eval(xy);
  }
  float2 radialDir = normalize(offset + 1e-6);
  float2 tangentDir = float2(-radialDir.y, radialDir.x);
  float angle = atan(p.y, p.x);
  float fluidWave = sin(angle * uRimFreq1) * 0.55 + sin(angle * uRimFreq2) * 0.25;
  float rScreen = (uSize.x + uSize.y) * 0.5;
  float2 shift = -offset * uMagnify * field + tangentDir * fluidWave * field * field * rScreen * uRimTangential;
  if (dot(shift, shift) < 1e-10) {
    return image.eval(xy);
  }
  float2 baseUV = uv + shift;
  float2 spread = shift * uDispersion;
  float jitter = fract(52.9829189 * fract(dot(xy, float2(0.06711056, 0.00583715))));
  float4 color = float4(0.0);
  float4 weight = float4(0.0);
  for (int i = 0; i < SAMPLES; i++) {
    float t = (float(i) + jitter) / float(SAMPLES);
    float3 rgb = float3(gauss(t, 0.38), gauss(t - 0.5, 0.38), gauss(t - 1.0, 0.38));
    float4 w = float4(rgb, (rgb.x + rgb.y + rgb.z) / 3.0);
    color += sampleUV(baseUV + spread * (t - 0.5)) * w;
    weight += w;
  }
  return half4(color / max(weight, float4(0.001)));
}
`;

const GLASS_CAROUSEL_MOTION: TGlassCarouselMotion = {
  touchDrag: 1,
  friction: 0.865,
  frameMs: 1000 / 60,
  maxFrameMs: 64,
  springStepMs: 4,
  stiffness: 170,
  damping: 0.92,
  reducedStiffness: 420,
  reducedDamping: 1,
  flickVelocity: 280,
  flickIdleMs: 90,
  shrinkMax: 60,
  shrinkAttack: 0.25,
  shrinkDecay: 0.1,
  shrinkAmount: 0.25,
  velocityEpsilon: 2,
  settleEpsilon: 0.5,
  restEpsilon: 0.05,
  energyEpsilon: 0.001,
};

const GLASS_CAROUSEL_REVEAL_DURATION: number = 320;
const GLASS_CAROUSEL_REVEAL_FALLBACK_MS: number = 1500;

export {
  GLASS_CAROUSEL_ACCESSIBILITY_ACTIONS,
  GLASS_CAROUSEL_BACKDROP_BLUR,
  GLASS_CAROUSEL_BACKDROP_BLUR_SHADER,
  GLASS_CAROUSEL_CAPTURE_DELAYS,
  GLASS_CAROUSEL_CAPTURE_STAGGER,
  GLASS_CAROUSEL_CARD_ASPECT,
  GLASS_CAROUSEL_CARD_HEIGHT,
  GLASS_CAROUSEL_CARD_HEIGHT_RATIO,
  GLASS_CAROUSEL_CARD_MIN_HEIGHT,
  GLASS_CAROUSEL_CARD_RADIUS,
  GLASS_CAROUSEL_CARD_WIDTH_RATIO,
  GLASS_CAROUSEL_EASE_POWER3_IN_OUT,
  GLASS_CAROUSEL_EASE_POWER3_OUT,
  GLASS_CAROUSEL_EASE_POWER4_OUT,
  GLASS_CAROUSEL_FOCUS,
  GLASS_CAROUSEL_GAP,
  GLASS_CAROUSEL_LENS,
  GLASS_CAROUSEL_LENS_SHADER,
  GLASS_CAROUSEL_MOTION,
  GLASS_CAROUSEL_REVEAL_DURATION,
  GLASS_CAROUSEL_REVEAL_FALLBACK_MS,
};
