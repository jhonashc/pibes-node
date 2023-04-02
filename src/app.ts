import "dotenv/config";
import "reflect-metadata";
import morgan from "morgan";
import express, { Application } from "express";

import { AppDataSource } from "./config";

class Server {
  private app: Application;
  private port: string;
  private environment: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";
    this.environment = process.env.NODE_ENV || "dev";

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
  }

  routes() {}

  listen() {
    AppDataSource.initialize()
      .then(() => {
        this.app.listen(this.port, () => {
          console.log(`🚀 App running on port ${this.port}`);
          console.log(`Running in ${this.environment}`);
        });
      })
      .catch((error) => console.error(error));
  }
}

export default Server;
