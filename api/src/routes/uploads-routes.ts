import { Router } from "express";
import multer from "multer";

import uploadConfig from "@/configs/upload";
import { UploadsController } from "@/controllers/uploads-controller";

const uploadsRoutes = Router();
const uploadsController = new UploadsController();

//Multer middleware for uploadsRoutes
const upload = multer(uploadConfig.MULTER);

uploadsRoutes.post(
	"/recipes",
	upload.single("file"),
	uploadsController.createRecipeImage,
);

uploadsRoutes.post(
	"/profile",
	upload.single("file"),
	uploadsController.createProfileImage,
);

export { uploadsRoutes };
