"use client";

import * as React from "react";
import { useInView } from "react-intersection-observer";

/**
 * Animates a number from 0 to `end` once the returned ref scrolls into view.
 * Returns [ref, value] — spread ref onto the element that should trigger the count.
 */
export function useCountUp(end: number, durationMs = 1600) {
  const [value, setValue] = React.useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  React.useEffect(() => {
    if (!inView) return;

    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      // Ease-out cubic for a natural deceleration.
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, end, durationMs]);

  return { ref, value } as const;
}
