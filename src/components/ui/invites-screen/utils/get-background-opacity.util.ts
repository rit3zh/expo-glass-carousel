const getBackgroundOpacity = <T extends number>(
  scroll: T,
  position: T,
  count: T,
) => {
  "worklet";
  if (count <= 1) {
    return 1;
  }
  const wrapped = ((scroll % count) + count) % count;
  const base = Math.floor(wrapped);
  const next = (base + 1) % count;
  const linear = wrapped - base;
  const progress = linear * linear * (3 - 2 * linear);
  const lower = Math.min(base, next);
  const upper = Math.max(base, next);
  if (position === lower) {
    return 1;
  }
  if (position === upper) {
    return upper === next ? progress : 1 - progress;
  }
  return Number(0);
};

export { getBackgroundOpacity };
