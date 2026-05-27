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
    // Create new storage instances per request to avoid shared state between requests
    const cloudinaryStorage = new CloudinaryStorage();
    const diskStorage = new DiskStorage();

    if (!req.file) {
      throw new AppError("Um arquivo é obrigatório");
    }

    // Declared outside try/catch block to allow access outside validation scope if needed
    let parsedFile: any = null;
    try {
      // Validate only the fields we depend on to create Multer's file object.
      const fileSchema = z
        .object({
          filename: z.string().min(1, { message: "Um arquivo é obrigatório" }),
          mimetype: z.string(),
          size: z.number().positive(),
          path: z.string(),
        })
        .loose();

      parsedFile = fileSchema.parse(req.file);

      // Upload first, only after that return metadata to be used by recipe/profile endpoints.
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
      // Ensure temp file cleanup never breaks the request lifecycle
      if (req.file) {
        try {
          await diskStorage.deleteTmpFile(req.file.filename);
        } catch (cleanupError) {
          // Log cleanup errors without affecting request flow
          console.error(
            "Failed to delete temporary upload file:",
            cleanupError,
          );
        }
      }
    }
  }

  createRecipeImage = async (req: Request, res: Response) => {
    return this.uploadFile(req, res, "recipes");
  };

  createProfileImage = async (req: Request, res: Response) => {
    return this.uploadFile(req, res, "profiles");
  };
}

export { UploadsController };
