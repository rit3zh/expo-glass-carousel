const wrapIndex = (index: number, count: number): number => {
  "worklet";
  if (count <= 0) {
    return 0;
  }
  return ((index % count) + count) % count;
};

export { wrapIndex };
