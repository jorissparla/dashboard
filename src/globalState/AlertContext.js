import React, { createContext, useState, useContext, useEffect } from "react";
import Notification from "./Notification";

const AlertContext = createContext(null);

export const AlertContextProvider = ({ children }) => {
  const initialState = { message: "", title: "", error: "" };
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [visible, setIsVisible] = useState(false);
  const [moreVisible, setMoreVisible] = useState(false);
  useEffect(() => {
    if (message) setIsVisible(true);
    if (messages.length > 0) setMoreVisible(true);
    if (error) setIsVisible(true);
  }, [message || error || messages.length > 0]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setIsVisible(false);
      setMessage("");
      setMessages([]);
      setError("");
    }, 2000);
    return () => clearTimeout(handler);
  }, [message, error, messages]);
  return (
    <AlertContext.Provider value={{ message, setMessage, setMessages, error, setError }}>
      {children}
      <div style={{ position: "fixed", right: 0, top: 8, zIndex: 9999 }} className="fixed b-0">
        {moreVisible &&
          messages.length > 0 &&
          messages.map((message, index) => <Notification message={message} key={index} error={error} onClose={() => setIsVisible(false)} />)}
        {visible && message && <Notification message={message} error={error} onClose={() => setIsVisible(false)} />}
      </div>
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
