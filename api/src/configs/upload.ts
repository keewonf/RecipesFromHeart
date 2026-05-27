import multer from "multer";
import path from "node:path";
import fs from "node:fs/promises";
import crypto from "node:crypto";
import { Request } from "express";

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");

const MAX_SIZE = 5; // File size limit in MB
const MAX_FILE_SIZE = 1024 * 1024 * MAX_SIZE; // Convert MB to bytes (required by multer/Node)
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MULTER = {
  storage: multer.diskStorage({
    destination: async (_req, _file, callback) => {
      try {
        // Ensure tmp directory exists across local/dev/prod environments.
        await fs.mkdir(TMP_FOLDER, { recursive: true });
        callback(null, TMP_FOLDER);
      } catch (error) {
        callback(error as Error, TMP_FOLDER);
      }
    },
    filename(req, file, callback) {
      // Prefix user filename with random hash to reduce collisions.
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
    // Reject unsupported MIME types early before cloud upload.
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
