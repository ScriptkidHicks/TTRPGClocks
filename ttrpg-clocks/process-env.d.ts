declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      NEXT_PUBLIC_ORIGIN: string;
      NEXT_PUBLIC_MEMBERS_ENDPOINT: string;
      NEXT_PUBLIC_VERIFY_COOKIE_ENDPOINT: string;
      NEXT_PUBLIC_HASHCOUNT: string;
      NEXT_PUBLIC_COOKIENAME: string;
    }
  }
}

export {};
