import { getCookie, deleteCookie, setCookie, getCookies } from "cookies-next";

async function checkLoginState(
  successFunction: Function,
  failureFunction: Function
): Promise<Boolean> {
  let loginSuccess = false;
  if (
    process.env.NEXT_PUBLIC_COOKIENAME != null &&
    process.env.NEXT_PUBLIC_VERIFY_COOKIE_ENDPOINT != null
  ) {
    console.log(process.env.NEXT_PUBLIC_COOKIENAME);
    const cookies = getCookies();
    console.log(cookies);
    const localCookie = getCookie(process.env.NEXT_PUBLIC_COOKIENAME);
    console.log("local cooki " + localCookie);
    if (localCookie) {
      const validationRequest = {
        method: "GET",
        headers: {
          Accept: "application/JSON",
          "content-type": "application/JSON",
          authorization: `Bearer ${localCookie}`,
        },
      };

      await fetch(
        process.env.NEXT_PUBLIC_VERIFY_COOKIE_ENDPOINT,
        validationRequest
      ).then(async (responsePromise) => {
        console.log("response promise: " + responsePromise.status);
        if (responsePromise.status == 200) {
          //successful, invoke the success function
          loginSuccess = true;
        } else {
          // ooooooooo, someone has a bad cookie. You don't get to keep that.
          console.log("validate deleting cookie");
          deleteCookie(process.env.NEXT_PUBLIC_COOKIENAME);
        }
      });
    }
  }

  console.log("login success: " + loginSuccess);
  loginSuccess ? successFunction() : failureFunction();
  return loginSuccess;
}

function forceLogout() {
  if (process.env.NEXT_PUBLIC_COOKIENAME != null) {
    console.log("force logout delete");
    deleteCookie(process.env.NEXT_PUBLIC_COOKIENAME, { path: "/login" });
    const cookie = getCookie(process.env.NEXT_PUBLIC_COOKIENAME);
  }
}

export { checkLoginState, forceLogout };
