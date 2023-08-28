import { useEffect, useState } from "react";

function useDebounce(value, delay) {

  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timedoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timedoutId);
  }, [value]);
  return debouncedValue;
}

export default useDebounce;