"use client";

import { checkLoginState } from "@/helpers/fetchHelpers";
import dotenv from "dotenv";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

dotenv.config();

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    checkLoginState(
      function () {
        router.push("/landing");
      },
      function () {
        router.push("/login");
      }
    );
  }, []);
}
