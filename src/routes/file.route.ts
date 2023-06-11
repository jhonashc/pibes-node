import { Router } from "express";

import { FileController } from "../controllers";

const router = Router();

const fileController = new FileController();

router.get("/:imageName", fileController.getImageByName);

export default router;
