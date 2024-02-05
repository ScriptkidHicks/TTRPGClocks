"use client";

import styles from "./page.module.css";
import faviconimage from "../Images/favicon.png";
import GMLogo from "../Images/GMTools.png";
import { BaseInterfaceButton } from "@/CommonElements/Buttons";
import { useState } from "react";

export default function Home() {
  const [createAccount, setcreateAccount] = useState(true);
  return (
    <main className={styles.main}>
      <img src={GMLogo.src}></img>
      <input type="text" placeholder="Username" />
      <input type="text" placeholder="Password" />
      <BaseInterfaceButton
        buttonText={createAccount ? "create" : "login"}
        buttonFunction={() => {}}
      />
      <BaseInterfaceButton
        buttonFunction={() => {
          setcreateAccount(!createAccount);
        }}
        buttonText={
          createAccount
            ? "Already Have an Account?"
            : "Need to Create an Account?"
        }
      />
    </main>
  );
}
