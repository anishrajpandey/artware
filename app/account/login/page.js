"use client";
import Link from "next/link";
import { useContext } from "react";
import style from "./login.module.css";

import Context from "@/context/context";

const Login = () => {
  const { isLoggedIn, setIsLoggedIn, showLogin } = useContext(Context);
  if (!isLoggedIn && showLogin)
    return (
      <div className={style.login}>
        <h2>Sign Up For A New Account </h2>
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
              <span className="text">Create Account</span>
              <span>Click to create account</span>
            </button>
            <Link href={"/account/login"}>
              <button className={style.button} id={style.login} role="button">
                <span className="text">Have an account?</span>
                <span>Login</span>
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
};

export default Login;
