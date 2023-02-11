"use client";
import Link from "next/link";
import React from "react";

import ContextProvider from "@/context/useContext";
import Context from "@/context/context";
import { useContext } from "react";
import Login from "./login/page";
import Signup from "./signup/page";
const Index = () => {
  let data = useContext(Context);
  console.log(typeof data);
  return (
    <main>
      <ContextProvider>
        <Signup />

        {/* <Dashboard/> todo  */}
      </ContextProvider>
    </main>
  );
};

export default Index;
