import { Router } from "express";

import { FileController } from "../controllers";

const router = Router();

const fileController = new FileController();

router.get("/:imageName", fileController.getImageByName);

router.delete("/:imageName", fileController.deleteImageByName);

export default router;
