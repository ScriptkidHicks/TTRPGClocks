import { getCookie, deleteCookie } from "cookies-next";

async function checkLoginState(
  successFunction: Function,
  failureFunction: Function
): Promise<Boolean> {
  let loginSuccess = false;

  if (
    process.env.NEXT_PUBLIC_COOKIENAME != null &&
    process.env.NEXT_PUBLIC_VERIFY_COOKIE_ENDPOINT != null
  ) {
    const localCookie = getCookie(process.env.NEXT_PUBLIC_COOKIENAME);
    if (localCookie) {
      const validationRequest = {
        method: "GET",
        headers: {
          Accept: "application/JSON",
          "content-type": "application/JSON",
          authorization: `Bearer ${localCookie}`,
        },
      };

      fetch(
        process.env.NEXT_PUBLIC_VERIFY_COOKIE_ENDPOINT,
        validationRequest
      ).then(async (responsePromise) => {
        if (responsePromise.status == 200) {
          //successful, invoke the success function
          loginSuccess = true;
        } else if (responsePromise.status == 400) {
          // ooooooooo, someone has a bad cookie. You don't get to keep that.
          deleteCookie(process.env.NEXT_PUBLIC_COOKIENAME);
        }
      });
    }
  }

  loginSuccess ? successFunction() : failureFunction();
  return loginSuccess;
}

function forceLogout() {
  if (process.env.NEXT_PUBLIC_COOKIENAME != null) {
    console.log("it's not null");
    console.log(process.env.NEXT_PUBLIC_COOKIENAME);
    deleteCookie(process.env.NEXT_PUBLIC_COOKIENAME, { path: "/login" });
    const cookie = getCookie(process.env.NEXT_PUBLIC_COOKIENAME);
    console.log(cookie);
  }
  console.log("force logout occuring");
}

export { checkLoginState, forceLogout };
