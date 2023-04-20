import { DataSource } from "typeorm";

const BASE_DIR = process.env.NODE_ENV === "dev" ? "src" : "dist";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "pibesdb",
  synchronize: process.env.NODE_ENV === "dev" ? true : false,
  entities: [`${BASE_DIR}/**/*.entity{.ts,.js}`],
});
