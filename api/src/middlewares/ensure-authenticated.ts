import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";
import { UserRole } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface TokenPayLoad {
  role: UserRole;
  sub: string;
}

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("JWT token não encontrado", 401);
    }

    // Expected format: "Bearer <token>".
    const [, token] = authHeader.split(" ");

    const { role, sub: user_id } = verify(
      token,
      authConfig.jwt.secret,
    ) as TokenPayLoad;

    // Make user available in req.user
    req.user = {
      id: user_id,
      role,
    };

    return next();
  } catch (error) {
    // Keep same public message for all token failures to avoid leaking details.
    throw new AppError("JWT token inválido", 401);
  }
}

export { ensureAuthenticated };
