import React, { createContext, useState, useContext, useEffect } from "react";
import Notification from "./Notification";

const AlertContext = createContext(null);

export const AlertContextProvider = ({ children }) => {
  const initialState = { message: "", title: "", error: "" };
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [visible, setIsVisible] = useState(false);
  useEffect(() => {
    if (message) setIsVisible(true);
    if (error) setIsVisible(true);
  }, [message || error]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setIsVisible(false);
      setMessage("");
      setError("");
    }, 2000);
    return () => clearTimeout(handler);
  }, [message, error]);
  return (
    <AlertContext.Provider value={{ message, setMessage, error, setError }}>
      {children}
      <div
        style={{ position: "fixed", right: 0, top: 8, zIndex: 9999 }}
        className="fixed b-0"
      >
        {visible && (
          <Notification
            message={message}
            error={error}
            onClose={() => setIsVisible(false)}
          />
        )}
      </div>
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
