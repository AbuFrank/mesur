import { useEffect, DependencyList } from 'react';

export function useDebouncedEffect(
  effect: () => void,
  deps: DependencyList,
  delayMs: number
): void {
  useEffect(() => {
    const handle = setTimeout(effect, delayMs);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
