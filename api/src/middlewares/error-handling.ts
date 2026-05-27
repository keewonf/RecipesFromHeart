import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import multer from "multer";
import { AppError } from "@/utils/AppError";
import { z, ZodError } from "zod";

const errorHandling: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  _: NextFunction,
) => {
  // Domain/application errors are expected and already carry HTTP status.
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  // Zod errors from request validation are mapped to a client-friendly format.
  if (error instanceof ZodError) {
    return res
      .status(400)
      .json({ message: "Validation error!", issues: z.treeifyError(error) });
  }

  // Multer errors happen before controller logic (limits, malformed upload, etc).
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ message: "Imagem muito grande. Tamanho máximo: 5MB." });
    }

    return res.status(400).json({ message: error.message });
  }

  if (
    error instanceof Error &&
    error.message === "Formato de arquivo inválido"
  ) {
    // Keep this explicit so frontend can show a precise upload hint.
    return res.status(400).json({
      message: "Formato de arquivo inválido. Use JPG, PNG ou WEBP.",
    });
  }

  // Log internal error for diagnostics, but don't expose internals to clients
  // (avoid leaking stack traces or implementation details)
  // eslint-disable-next-line no-console
  console.error(error);
  return res.status(500).json({ message: "Internal server error" });
};

export { errorHandling };
