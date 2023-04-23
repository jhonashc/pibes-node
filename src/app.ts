import "dotenv/config";
import "reflect-metadata";
import cors from "cors";
import morgan from "morgan";
import express, { Application } from "express";

import { AppDataSource } from "./config";
import { exceptionHandler } from "./middlewares";

import {
  authRouter,
  categoryRouter,
  comboRouter,
  favoriteRouter,
  orderRouter,
  productRouter,
  userAddressRouter,
  userRouter,
} from "./routes";

class Server {
  private app: Application;
  private port: string;
  private apiRoutes = {
    auth: "/api/auth",
    categories: "/api/categories",
    combos: "/api/combos",
    favorites: "/api/favorites",
    orders: "/api/orders",
    products: "/api/products",
    users: "/api/users",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    this.middlewares();
    this.routes();
    this.customMiddlewares();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
  }

  customMiddlewares() {
    this.app.use(exceptionHandler);
  }

  routes() {
    this.app.use(this.apiRoutes.auth, authRouter);
    this.app.use(this.apiRoutes.categories, categoryRouter);
    this.app.use(this.apiRoutes.combos, comboRouter);
    this.app.use(this.apiRoutes.favorites, favoriteRouter);
    this.app.use(this.apiRoutes.orders, orderRouter);
    this.app.use(this.apiRoutes.products, productRouter);
    this.app.use(this.apiRoutes.users, userRouter);
    this.app.use(this.apiRoutes.users, userAddressRouter);
  }

  listen() {
    AppDataSource.initialize()
      .then(() => {
        this.app.listen(this.port, () => {
          console.log(`🚀 App running on port ${this.port}`);
          console.log(`Running in ${process.env.NODE_ENV}`);
        });
      })
      .catch((error) => console.error(error));
  }
}

export default Server;
