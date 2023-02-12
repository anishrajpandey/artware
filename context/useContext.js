"use client";
import { useState } from "react";
import Context from "./context";

const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Context.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
