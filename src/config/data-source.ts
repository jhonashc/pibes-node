import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "pibesdb",
  synchronize: process.env.NODE_ENV === "dev" ? true : false,
  logging: true,
  entities: ["dist/**/*.entity{.ts,.js}", "src/**/*.entity{.ts,.js}"],
  subscribers: [],
  migrations: [],
});
