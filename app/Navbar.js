"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className={styles.navBarMain}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <a onClick={() => setShowDropdown(!showDropdown)}>More</a>
          {showDropdown && (
            <ul>
              <li>
                <Link href={"design/tshirt"}>tshirt</Link>
              </li>
              <li>
                <Link href={"design/hoodie"}>hoodie</Link>
              </li>
              <li>
                <Link href={"design/mug"}>mug</Link>
              </li>
              <li>
                <Link href={"design/cake"}>cake</Link>
              </li>
              <li>
                <Link href={"design/phonecover"}>phonecover</Link>
              </li>
              <li>
                <Link href={"/account"}>account</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
