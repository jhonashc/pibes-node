import { Router } from "express";

import { UserController } from "../controllers";

const router = Router();

const userController = new UserController();

router.get("/", userController.getUsers);

router.get("/:id", userController.getUserById);

export default router;
