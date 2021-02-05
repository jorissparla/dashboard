import React, { createContext, useState, useContext, useEffect } from "react";
import Notification from "./Notification";

const AlertContext = createContext(null);

export const AlertContextProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [timerSeconds, setTimerSeconds] = useState(2000);
  // const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [visible, setIsVisible] = useState(false);
  useEffect(() => {
    if (message) setIsVisible(true);
    // if (messages.length > 0) setMoreVisible(true);
    if (error) setIsVisible(true);
  }, [message, error]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setIsVisible(false);
      setMessage("");
      // setMessages([]);
      setError("");
    }, timerSeconds);
    return () => clearTimeout(handler);
  }, [message, error]);
  return (
    <AlertContext.Provider value={{ message, setMessage, error, setError, setTimerSeconds }}>
      {children}
      <div style={{ position: "fixed", right: 0, top: 8, zIndex: 9999 }} className="fixed b-0">
        {/* {moreVisible &&
          messages.length > 0 &&
          messages.map((message, index) => <Notification message={message} key={index} error={error} onClose={() => setIsVisible(false)} />)} */}
        {visible && message && <Notification message={message} error={error} onClose={() => setIsVisible(false)} />}
      </div>
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
