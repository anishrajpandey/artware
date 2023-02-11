"use client";
import React from "react";
import style from "./account.module.css";

import styles from "./account.module.css";

const Index = () => {
  return (
    <main>
      <div className={style.signUp}>
        <h2>Sign Up for a new account </h2>
        <form action="/" className={style.signupForm}>
          <div className={styles.nameSignup}>
            <label htmlFor="name">Your Name </label>
            <input type="text" />
          </div>

          <div className={styles.phoneSignup}>
            <label htmlFor="name">Your Phone Number </label>
            <input type="number" />
          </div>
          <div className={styles.passwordSignup}>
            <label htmlFor="name">Set Your Password </label>
            <input type="text" />
          </div>
          <div className={styles.addressSignup}>
            <label htmlFor="name">Enter your address </label>
            {/* <input type="text" /> */}
            <textarea name="address" id="address" cols="30" rows="10">
              {" "}
            </textarea>
          </div>
          <button className={styles.submitButton}>Create Account </button>
        </form>
      </div>
    </main>
  );
};

export default Index;
