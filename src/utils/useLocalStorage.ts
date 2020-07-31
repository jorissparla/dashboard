import { useState } from "react";

export function useLocalStorage(key: string, initialValue: string | number | any, clean?: boolean) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once

  if (clean) {
    if (clean === true) {
      window.localStorage.removeItem(key);
    }
  }

  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      if (!item) {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
      }
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: any) => {
    try {
      // Allow value to be a function so we have same API as useState

      const valueToStore = value instanceof Function ? value(storedValue) : typeof value === "string" ? parseInt(value) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (!value) {
        return;
      }
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
