"use client";
import React from "react";
import style from "./account.module.css";
const Index = () => {
  return (
    <main>
      <div className={style.signUp}>
        <h2>Sign Up for a new account </h2>
        <form action="/" className={style.signupForm}>
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
            <button class={style.button} role="button">
              <span class="text">Have an account?</span>
              <span>Login</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Index;
