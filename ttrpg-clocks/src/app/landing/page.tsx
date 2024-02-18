"use client";

import { forceLogout } from "@/helpers/fetchHelpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { checkLoginState } from "@/helpers/fetchHelpers";
import {
  PageCenterFlow,
  StaticImagePageBackground,
} from "../../CommonElements/BackgroundsAndFrames/PageBodies";
import ChurchImage from "../../Images/Backgrounds/Church.png";

function LandingPage() {
  const [cookiesValid, setCookiesValid] = useState(false);

  const router = useRouter();

  useEffect(() => {
    checkLoginState(
      function () {
        setCookiesValid(true);
      },
      function () {
        router.push("/login");
      }
    );
  }, []);
  return (
    <StaticImagePageBackground $backgroundimage={ChurchImage.src}>
      {cookiesValid && (
        <PageCenterFlow>
          <h1>Welcome to the landing page</h1>

          <button
            onClick={() => {
              forceLogout();
              router.push("/login");
            }}
          >
            force logout
          </button>
        </PageCenterFlow>
      )}
    </StaticImagePageBackground>
  );
}

export default LandingPage;
