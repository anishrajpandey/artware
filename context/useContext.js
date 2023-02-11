"use client";
import { useState } from "react";
import Context from "./context";

const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Context.Provider
      value={{ isLoggedIn, setIsLoggedIn, showLogin, setShowLogin }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
