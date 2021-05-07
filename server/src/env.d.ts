declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    CORS_ORIGIN: string;
    COOKIE_SECRET: string;
    COOKIE_NAME: string;
    COOKIE_MAX_AGE: string;
  }
}
