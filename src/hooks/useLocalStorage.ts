import { useState } from 'react';

export const useLocalStorage = (keyName: string, defaultValue: null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (e) {
      return defaultValue;
    }
  });
  const setValue = (newValue: any) => {
    try {
      localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (e) {}
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
