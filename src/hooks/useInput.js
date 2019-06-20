import React from "react";
export default function useInput(defaultValue) {
  const [value, setValue] = React.useState(defaultValue);
  function onChange(e) {
    setValue(e.target.value);
  }
  function clear() {
    setValue("");
  }
  return { value, onChange, clear, setValue };
}
