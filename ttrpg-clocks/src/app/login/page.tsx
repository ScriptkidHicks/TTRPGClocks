"use client";

import { BaseInterfaceButton } from "@/CommonElements/Buttons";
import { getCookie, setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import GMLogo from "../../Images/GMTools.png";
import { checkLoginState } from "@/helpers/fetchHelpers";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";

export default function LoginPage() {
  const router = useRouter();
  useEffect(() => {
    checkLoginState(
      function () {
        router.push("/landing");
      },
      function () {}
    );
  });

  function validateInput(): boolean {
    const emailRegex = RegExp(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    );

    const passwordRegex = RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
    if (createAccount && !emailRegex.test(email)) {
      alert("invalid email.");
      return false;
    }

    if (!passwordRegex.test(password)) {
      alert("invalid password");
      return false;
    }

    if (username.length < 8) {
      alert("username must be at least 8 characters long");
      return false;
    }

    return true;
  }

  async function loginQuery(isCreate: boolean) {
    if (validateInput()) {
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

      fetch(membersEndpoint, loginAsk).then(async (responsePromise) => {
        if (responsePromise.status == 200 || responsePromise.status == 201) {
          //the account was successfully logged on or created. Set cookies, redirect.
          const responseJson = await responsePromise.json();
          if (process.env.NEXT_PUBLIC_COOKIENAME != null) {
            setCookie(process.env.NEXT_PUBLIC_COOKIENAME, responseJson["jwt"], {
              sameSite: false,
              secure: true,
              maxAge: 7,
            });
            router.push("/landing");
          }
        } else {
          const errorMessage = await responsePromise.text();
          alert(errorMessage);
        }
      });
    }
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
