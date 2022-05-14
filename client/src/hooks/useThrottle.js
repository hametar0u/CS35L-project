import { useState } from "react";

export const useThrottle = (fn, timer = 500) => {
  const [timeoutId, setTimeoutId] = useState(null);
  return (...args) => {
    if (timeoutId) {
      return;
    }
    setTimeoutId(
      setTimeout(() => {
        fn(...args);
        //console.log("Using throttle", ...args);
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }, timer)
    );
  };
};
