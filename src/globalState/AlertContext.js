import React, { createContext, useState, useContext, useEffect } from "react";
import Notification from "./Notification";

const AlertContext = createContext(null);

export const AlertContextProvider = ({ children }) => {
  const initialState = { message: "", title: "" };
  const [message, setMessage] = useState("");
  const [visible, setIsVisible] = useState(false);
  useEffect(() => {
    if (message) setIsVisible(true);
  }, [message]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setIsVisible(false);
      setMessage("");
    }, 2000);
    return () => clearTimeout(handler);
  }, [message]);
  return (
    <AlertContext.Provider value={{ message, setMessage }}>
      {children}
      <div
        style={{ position: "fixed", right: 0, top: 8, zIndex: 9999 }}
        className="fixed b-0"
      >
        {visible && (
          <Notification message={message} onClose={() => setIsVisible(false)} />
        )}
      </div>
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
