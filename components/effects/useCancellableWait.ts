"use client";

import { useCallback, useRef } from "react";

export function useCancellableWait() {
  const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  return useCallback(() => {
    let cancelled = false;

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        timersRef.current.delete(id);
        if (!cancelled) fn();
      }, ms);
      timersRef.current.add(id);
    };

    const wait = (ms: number) =>
      new Promise<void>((resolve) => schedule(() => resolve(), ms));

    const isCancelled = () => cancelled;

    const cancel = () => {
      cancelled = true;
      const timers = timersRef.current;
      timers.forEach(clearTimeout);
      timers.clear();
    };

    return { wait, isCancelled, cancel };
  }, []);
}
