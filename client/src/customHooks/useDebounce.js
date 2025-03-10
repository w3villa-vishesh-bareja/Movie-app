import { useState, useEffect } from "react";

const useDebounce = (value, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState(value);
  console.log(debounceValue);

  useEffect(() => {

    const timeout = setTimeout(() => {
      setDebounceValue(value); 
    }, delay);

    return () => clearTimeout(timeout); 
  }, [value, delay]);

  return { debounceValue };
};

export default useDebounce;
