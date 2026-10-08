import { describe, expect, it } from 'vitest';
import { advanceRotation, cycleIntervalMs } from './enhancedEditRotation';

describe('enhanced edit rotation', () => {
  it('keeps the 30 second interval', () => {
    expect(cycleIntervalMs).toBe(30_000);
  });

  it('does not cycle a single label', () => {
    expect(advanceRotation(0, 1, 0)).toEqual({ index: 0, stepsTaken: 0, stopped: true });
  });

  it('stops on the first label after one full cycle', () => {
    const first = advanceRotation(0, 3, 0);
    const second = advanceRotation(first.index, 3, first.stepsTaken);
    const third = advanceRotation(second.index, 3, second.stepsTaken);

    expect(first).toEqual({ index: 1, stepsTaken: 1, stopped: false });
    expect(second).toEqual({ index: 2, stepsTaken: 2, stopped: false });
    expect(third).toEqual({ index: 0, stepsTaken: 3, stopped: true });
  });
});
