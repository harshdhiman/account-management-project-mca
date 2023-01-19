import { useEffect, useRef } from "react";

export function useInterval(callback: () => boolean | void, delay: number) {
  const savedCallback = useRef<() => boolean | void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current!()) {
        clearInterval(id);
      }
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
