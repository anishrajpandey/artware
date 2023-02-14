"use client";
import Link from "next/link";
import React from "react";
import Context from "@/context/context";
import { useContext, useState } from "react";
import styles from "./Dashboard.module.css";
import signupStyle from "./Signup.module.css";
import loginStyle from "./Login.module.css";
import { set } from "mongoose";
const Index = () => {
  const [showLogin, setShowLogin] = useState(false);
  let { isLoggedIn } = useContext(Context);
  console.log("🤔 > Index > isLoggedIn", isLoggedIn);

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

    let resjson = await data.json();
    console.log(resjson);
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    const phone = e.target[0].value;
    const password = e.target[2].value;
    const body = { phone, password };
    let data = await fetch(`/api/login`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    let resjson = await data.json();
    console.log(resjson);
  };
  return (
    <>
      {isLoggedIn ? (
        <main className={styles.dashboard}>login dashboard</main>
      ) : (
        <main>
          {!showLogin ? (
            <div className={signupStyle.signUp}>
              <h2>Sign Up For A New Account </h2>
              <form
                action="/"
                className={signupStyle.signupForm}
                onSubmit={handleSignUp}
              >
                <div className={signupStyle.nameSignup}>
                  <label htmlFor="name">Your Name </label>
                  <input type="text" />
                </div>

                <div className={signupStyle.phoneSignup}>
                  <label htmlFor="name">Your Phone Number </label>
                  <input type="number" />
                </div>
                <div className={signupStyle.passwordSignup}>
                  <label htmlFor="name">Set Your Password </label>
                  <input type="text" />
                </div>
                <div className={signupStyle.addressSignup}>
                  <label htmlFor="name">Enter your address </label>
                  {/* <input type="text" /> */}
                  <textarea
                    name="address"
                    id="address"
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>

                {/* <button className={signupStyle.button} type="submit">
            Create Account
          </button> */}
                <div className={signupStyle.buttonArea}>
                  <button
                    className={`${signupStyle.button} ${signupStyle.signup}`}
                    role="button"
                    type="submit"
                  >
                    <span className="text">Create Account</span>
                    <span>Click to create account</span>
                  </button>

                  <button
                    className={signupStyle.button}
                    id={signupStyle.login}
                    role="button"
                    type="button"
                    onClick={() => setShowLogin(true)}
                  >
                    <span className="text">Have an account?</span>
                    <span>Login</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className={loginStyle.login}>
              <h2>Login To Your Account </h2>
              <form
                action="/"
                className={loginStyle.signupForm}
                onSubmit={handleLogin}
              >
                <div className={loginStyle.phoneSignup}>
                  <label htmlFor="name">Your Phone Number </label>
                  <input type="number" />
                </div>
                <div className={loginStyle.passwordSignup}>
                  <label htmlFor="name"> Your Password </label>
                  <input type="text" />
                </div>

                {/* <button className={loginStyle.button} type="submit">
            Create Account
          </button> */}
                <div className={loginStyle.buttonArea}>
                  <button
                    className={`${loginStyle.button} ${loginStyle.login}`}
                    role="button"
                  >
                    <span className="text">Login</span>
                    <span>You&apos;ll be logged in</span>
                  </button>

                  <button
                    className={loginStyle.button}
                    id={loginStyle.login}
                    role="button"
                    type="button"
                    onClick={() => setShowLogin(false)}
                  >
                    <span className="text">Dont Have an account?</span>
                    <span>SignUp</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* login page */}
        </main>
      )}
    </>
  );
};

export default Index;
