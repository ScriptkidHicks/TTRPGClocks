declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      MONGODB_CONNECT: string;
      ORIGIN: string;
      ITERATION_COUNT: string;
      JWT_SECRET: string;
    }
  }
}

export {};
