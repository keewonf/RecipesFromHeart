import { AppError } from "@/utils/AppError";
import { UserRole } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

function verifyUserAuthorization(role: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || !role.includes(user.role)) {
      throw new AppError("Unauthorized", 401);
    }

    return next();
  };
}

export { verifyUserAuthorization };
