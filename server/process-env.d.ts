declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      MONGODB_CONNECT: string;
      ORIGIN: string;
    }
  }
}

export {};
