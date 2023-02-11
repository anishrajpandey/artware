"use client";
import Link from "next/link";
import React from "react";
import style from "./account.module.css";
const Index = () => {
  const handleSignUp = async (e) => {
    e.preventDefault();
    const userName = e.target[0].value;
    const phone = e.target[1].value;
    const password = e.target[2].value;
    const address = e.target[3].value;
    const body = { userName, phone, password, address };

    let data = await fetch(`/api/signup`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    console.log(data);
    let resjson = await data.json();
    console.log(resjson);
  };
  return (
    <main>
      <div className={style.signUp}>
        <h2>Sign Up For A New Account </h2>
        <form action="/" className={style.signupForm} onSubmit={handleSignUp}>
          <div className={style.nameSignup}>
            <label htmlFor="name">Your Name </label>
            <input type="text" />
          </div>

          <div className={style.phoneSignup}>
            <label htmlFor="name">Your Phone Number </label>
            <input type="number" />
          </div>
          <div className={style.passwordSignup}>
            <label htmlFor="name">Set Your Password </label>
            <input type="text" />
          </div>
          <div className={style.addressSignup}>
            <label htmlFor="name">Enter your address </label>
            {/* <input type="text" /> */}
            <textarea
              name="address"
              id="address"
              cols="30"
              rows="10"
            ></textarea>
          </div>

          {/* <button className={style.button} type="submit">
            Create Account
          </button> */}
          <div className={style.buttonArea}>
            <button className={`${style.button} ${style.signup}`} role="button">
              <span class="text">Create Account</span>
              <span>Click to create account</span>
            </button>
            <Link href={"/account/login"}>
              <button class={style.button} id={style.login} role="button">
                <span class="text">Have an account?</span>
                <span>Login</span>
              </button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Index;
