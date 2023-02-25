"use client";
import { useState } from "react";
import Context from "./context";

const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userData, setUserData] = useState({});

  return (
    <Context.Provider
      value={{ isLoggedIn, setIsLoggedIn, userData, setUserData }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
