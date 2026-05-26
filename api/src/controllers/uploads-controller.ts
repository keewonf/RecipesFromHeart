import { Request, Response } from "express";
import z from "zod";
import { ZodError } from "zod";
import { CloudinaryStorage } from "@/providers/cloudinary-storage";
import { DiskStorage } from "@/providers/disk-storage";
import { AppError } from "@/utils/AppError";

class UploadsController {
  private async uploadFile(
    req: Request,
    res: Response,
    folder: "recipes" | "profiles",
  ) {
    const cloudinaryStorage = new CloudinaryStorage();
    const diskStorage = new DiskStorage();

    if (!req.file) {
      throw new AppError("Um arquivo é obrigatório");
    }

    let parsedFile: any = null;
    try {
      const fileSchema = z
        .object({
          filename: z.string().min(1, { message: "Um arquivo é obrigatório" }),
          mimetype: z.string(),
          size: z.number().positive,
          path: z.string(),
        })
        .loose();

      parsedFile = fileSchema.parse(req.file);

      const cloudinaryFile = await cloudinaryStorage.saveFile(
        parsedFile.path,
        parsedFile.filename,
        folder,
      );

      res.json({
        imageUrl: cloudinaryFile.url,
        imageKey: cloudinaryFile.publicId,
        originalFilename: parsedFile.filename,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        throw new AppError(error.issues[0].message);
      }
      throw error;
    } finally {
      // Ensure temp file is removed in all cases
      if (req.file) {
        await diskStorage.deleteTmpFile(req.file.filename);
      }
    }
  }

  async createRecipeImage(req: Request, res: Response) {
    return this.uploadFile(req, res, "recipes");
  }

  async createProfileImage(req: Request, res: Response) {
    return this.uploadFile(req, res, "profiles");
  }
}

export { UploadsController };
