import React from "react";

export const FilterFieldContext = React.createContext();
export const FilterFieldProvider = ({ children }) => {
  const [fields, setFields] = React.useState({});
  const clearFields = () => setFields({});
  return (
    <FilterFieldContext.Provider value={{ fields, setFields, clearFields }}>{children}</FilterFieldContext.Provider>
  );
};
