"use client";

import { forceLogout } from "@/helpers/fetchHelpers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { checkLoginState } from "@/helpers/fetchHelpers";
import { StaticImagePageBackground } from "../../CommonElements/BackgroundsAndFrames/PageBodies";
import ChurchImage from "../../Images/Backgrounds/Church.png";

function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    checkLoginState(
      function () {},
      function () {
        router.push("/login");
      }
    );
  }, []);
  return (
    <StaticImagePageBackground backgroundimage={ChurchImage}>
      <h1>Welcome to the landing page</h1>
      <button
        onClick={() => {
          forceLogout();
          router.push("/login");
        }}
      >
        force logout
      </button>
    </StaticImagePageBackground>
  );
}

export default LandingPage;
