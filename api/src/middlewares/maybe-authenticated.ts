import { authConfig } from "@/configs/auth";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UserRole } from "@prisma/client";

interface TokenPayLoad {
  role: UserRole;
  sub: string;
}

// This middleware is used for routes that can be accessed both as guest and authenticated users.
// If a valid JWT token is provided, req.user is populated.
// If no token (or invalid token), the request continues as an anonymous user.
function maybeAuthenticated(req: Request, _res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next();
    }

    const [, token] = authHeader.split(" ");

    const { role, sub: user_id } = verify(
      token,
      authConfig.jwt.secret,
    ) as TokenPayLoad;

    req.user = {
      id: user_id,
      role,
    };

    return next();
  } catch {
    return next();
  }
}

export { maybeAuthenticated };
