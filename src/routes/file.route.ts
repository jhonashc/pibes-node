import { Router } from "express";

import { FileController } from "../controllers";
import { uploader } from "../middlewares";

const router = Router();

const fileController = new FileController();

router.post("/", uploader.single("file"), fileController.uploadImage);

router.get("/:imageName", fileController.getImageByName);

export default router;
