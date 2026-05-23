import { Request, Response } from "express";
import z from "zod";
import { ZodError } from "zod";
import { CloudinaryStorage } from "@/providers/cloudinary-storage";
import { DiskStorage } from "@/providers/disk-storage";
import { AppError } from "@/utils/AppError";

class UploadsController {
  async create(req: Request, res: Response) {
    const cloudinaryStorage = new CloudinaryStorage();
    const diskStorage = new DiskStorage();

    if (!req.file) {
      throw new AppError("Um arquivo é obrigatório");
    }

    try {
      const fileSchema = z
        .object({
          filename: z.string().min(1, { message: "Um arquivo é obrigatório" }),
          mimetype: z.string(),
          size: z.number().positive,
          path: z.string(),
        })
        .loose();

      const file = fileSchema.parse(req.file);

      const cloudinaryFile = await cloudinaryStorage.saveFile(
        file.path,
        file.filename,
      );

      await diskStorage.deleteTmpFile(file.filename);

      res.json({
        imageUrl: cloudinaryFile.url,
        imageKey: cloudinaryFile.publicId,
        originalFilename: file.filename,
      });
    } catch (error) {
      if (req.file) {
        await diskStorage.deleteTmpFile(req.file.filename);
      }

      if (error instanceof ZodError) {
        throw new AppError(error.issues[0].message);
      }
      throw error;
    }
  }
}

export { UploadsController };
