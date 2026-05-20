import { Request, Response } from "express";
import { z } from "zod";
import { AppError } from "@/utils/AppError";
import { prisma } from "@/database/prisma";
import { compare } from "bcrypt";
import { authConfig } from "@/configs/auth";
import { sign } from "jsonwebtoken";

const bodySchema = z.object({
  email: z.email({ message: "E-mail inválido" }).trim(),
  password: z.string(),
});

class SessionsController {
  async create(req: Request, res: Response) {
    const { email, password } = bodySchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError("E-mail ou senha inválidos", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("E-mail ou senha inválidos", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role }, secret, {
      subject: user.id,
      expiresIn,
    });

    const { password: hashedPassword, ...userWithoutPassword } = user;

    return res.json({ token, user: userWithoutPassword });
  }
}

export { SessionsController };
