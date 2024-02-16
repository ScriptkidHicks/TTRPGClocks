"use client";

import { forceLogout } from "@/helpers/fetchHelpers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { checkLoginState } from "@/helpers/fetchHelpers";

function LandingPage() {
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
  });
  return (
    <div>
      <h1>Welcome to the landing page</h1>
      <button
        onClick={() => {
          forceLogout();
          router.push("/login");
        }}
      >
        force logout
      </button>
    </div>
  );
}

export default LandingPage;
