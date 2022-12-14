import { useCallback, useEffect } from "react";

export function useDebounceEffect(
  effect: Function,
  delay: number,
  deps: React.DependencyList
) {
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(handler);
  }, [callback, delay]);
}
