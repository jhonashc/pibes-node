import "dotenv/config";
import "reflect-metadata";
import morgan from "morgan";
import express, { Application } from "express";

import { AppDataSource } from "./config";
import { exceptionHandler } from "./middlewares";

import {
  categoryRouter,
  productRouter,
  userAddressRouter,
  userRouter,
} from "./routes";

class Server {
  private app: Application;
  private port: string;
  private environment: string;
  private apiRoutes = {
    categories: "/api/categories",
    products: "/api/products",
    users: "/api/users",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";
    this.environment = process.env.NODE_ENV || "dev";

    this.middlewares();
    this.routes();
    this.customMiddlewares();
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
  }

  customMiddlewares() {
    this.app.use(exceptionHandler);
  }

  routes() {
    this.app.use(this.apiRoutes.categories, categoryRouter);
    this.app.use(this.apiRoutes.products, productRouter);
    this.app.use(this.apiRoutes.users, userRouter);
    this.app.use(this.apiRoutes.users, userAddressRouter);
  }

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
