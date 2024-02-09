"use client";

import styles from "./page.module.css";
import GMLogo from "../Images/GMTools.png";
import { BaseInterfaceButton } from "@/CommonElements/Buttons";
import { useState } from "react";
import dotenv from "dotenv";

dotenv.config();

export default function Home() {
  async function loginQuery(isCreate: boolean) {
    const loginAsk = {
      method: "POST",
      headers: {
        Accept: "application/JSON",
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify({
        name: username,
        password: password,
        email: email,
        isCreate: isCreate,
      }),
    };

    const membersEndpoint = process.env.NEXT_PUBLIC_MEMBERS_ENDPOINT;

    console.log(membersEndpoint);

    fetch(membersEndpoint, loginAsk);
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
      {createAccount && (
        <input
          type="text"
          placeholder="Email"
          onChange={(event) => {
            if (event.target.value != null) {
              setEmail(event.target.value);
            }
          }}
        />
      )}
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
          loginQuery(createAccount);
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
