import multer from "multer";
import path from "node:path";
import fs from "node:fs/promises";
import crypto from "node:crypto";
import { Request } from "express";

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");

const MAX_SIZE = 5;
const MAX_FILE_SIZE = 1024 * 1024 * MAX_SIZE; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const MULTER = {
  storage: multer.diskStorage({
    destination: async (_req, _file, callback) => {
      try {
        await fs.mkdir(TMP_FOLDER, { recursive: true });
        callback(null, TMP_FOLDER);
      } catch (error) {
        callback(error as Error, TMP_FOLDER);
      }
    },
    filename(req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter(
    req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback,
  ) {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) {
      return callback(new Error("Formato de arquivo inválido"));
    }
    callback(null, true);
  },
};

export default {
  TMP_FOLDER,
  MULTER,
  MAX_FILE_SIZE,
  MAX_SIZE,
  ACCEPTED_IMAGE_TYPES,
};
