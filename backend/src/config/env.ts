import dotenv from "dotenv";
dotenv.config();

export const APP_PORT = process.env.PORT || 3000;

// DB
export const PG_USER = process.env.PG_USER || "postgres";
export const PG_HOST = process.env.PG_HOST || "localhost";
export const PG_DATABASE = process.env.PG_DATABASE || "postgres";
export const PG_PASSWORD = process.env.PG_PASSWORD || "postgres";
export const PG_PORT = parseInt(process.env.PG_PORT || "5432");
