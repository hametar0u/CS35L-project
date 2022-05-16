import { useState } from "react";

export const useDebounce = (fn, timer = 250) => {
  const [timeoutId, setTimeoutId] = useState(null);
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setTimeoutId(
      setTimeout(() => {
        fn(...args);
        // console.log("Using debounce", ...args);
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }, timer)
    );
  };
};
