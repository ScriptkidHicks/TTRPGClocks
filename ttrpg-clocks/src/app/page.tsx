"use client";

import styles from "./page.module.css";
import GMLogo from "../Images/GMTools.png";
import { BaseInterfaceButton } from "@/CommonElements/Buttons";
import { useState } from "react";
import { match } from "assert";

export default function Home() {
  async function loginQuery() {
    const loginAsk = {
      method: "POST",
      headers: {
        Accept: "application/JSON",
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify({
        name: username,
        password: password,
      }),
    };
  }

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [createAccount, setcreateAccount] = useState(true);
  return (
    <main className={styles.main}>
      <img src={GMLogo.src}></img>
      <input
        type="text"
        placeholder="Username"
        onChange={(event) => {
          if (event.target.value != null) {
            setUsername(event.target.value);
          }
        }}
      />
      <input
        type="text"
        placeholder="Email"
        onChange={(event) => {
          if (event.target.value != null) {
            setEmail(event.target.value);
          }
        }}
      />
      <input
        type="text"
        placeholder="Password"
        onChange={(event) => {
          if (event.target.value != null) {
            setPassword(event.target.value);
          }
        }}
      />
      <BaseInterfaceButton
        buttonText={createAccount ? "create" : "login"}
        buttonFunction={() => {
          console.log("redirecting");
          loginQuery();
        }}
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
