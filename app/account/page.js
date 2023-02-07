"use client";
import React from "react";
import style from "./account.module.css";
import loginOrSignup from "./loginOrSignup";
import testcomponent from "./testcomponent";
const Index = () => {
  return (
    <main>
      <div className={style.signUp}>
        <loginOrSignup />
        <testcomponent />
        helo
      </div>
    </main>
  );
};

export default Index;
