import "dotenv/config";
import "reflect-metadata";
import cors from "cors";
import morgan from "morgan";
import express, { Application } from "express";

import { AppDataSource } from "./database";
import { exceptionHandler } from "./middlewares";
import * as routes from "./routes";

class Server {
  private app: Application;
  private port: string;
  private apiRoutes = {
    auth: "/api/auth",
    categories: "/api/categories",
    favorites: "/api/favorites",
    files: "/api/files",
    orders: "/api/orders",
    products: "/api/products",
    promotions: "/api/promotions",
    users: "/api/users",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    this.middlewares();
    this.routes();
    this.customMiddlewares();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(morgan("tiny"));
    this.app.use(express.json());
  }

  private customMiddlewares() {
    this.app.use(exceptionHandler);
  }

  private routes() {
    this.app.use(this.apiRoutes["auth"], routes["authRouter"]);
    this.app.use(this.apiRoutes["categories"], routes["categoryRouter"]);
    this.app.use(this.apiRoutes["favorites"], routes["favoriteRouter"]);
    this.app.use(this.apiRoutes["files"], routes["fileRouter"]);
    this.app.use(this.apiRoutes["orders"], routes["orderRouter"]);
    this.app.use(this.apiRoutes["products"], routes["productRouter"]);
    this.app.use(this.apiRoutes["promotions"], routes["promotionRouter"]);
    this.app.use(this.apiRoutes["users"], routes["userRouter"]);
    this.app.use(this.apiRoutes["users"], routes["userAddressRouter"]);
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
