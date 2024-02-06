declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      NEXT_PUBLIC_ORIGIN: string;
      NEXT_PUBLIC_MEMBERS_ENDPOINT: string;
      NEXT_PUBLIC_LOGIN_ENDPOINT: string;
    }
  }
}

export {};
