import { useState } from "react";

const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const value = window.localStorage.getItem(key);

    return value ? JSON.parse(value) : defaultValue;
  });

  const setValue = (value: T) => {
    setStoredValue(value);

    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return { storedValue, setValue };
};

export default useLocalStorage;
