export const cycleIntervalMs = 30_000;

export const prefersReducedMotion = (): boolean => {
  return (
    typeof globalThis.matchMedia === 'function' &&
    globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
};

/**
 * Move to the next label. After every label has been shown once, stay on the first.
 */
export const advanceRotation = (
  index: number,
  count: number,
  stepsTaken: number
): { index: number; stepsTaken: number; stopped: boolean } => {
  if (count <= 1) {
    return { index: 0, stepsTaken, stopped: true };
  }

  const nextSteps = stepsTaken + 1;
  if (nextSteps >= count) {
    return { index: 0, stepsTaken: nextSteps, stopped: true };
  }

  return { index: (index + 1) % count, stepsTaken: nextSteps, stopped: false };
};
