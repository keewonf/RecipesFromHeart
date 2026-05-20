import { Request, Response } from "express";
import { UserRole } from "@prisma/client";
import { z } from "zod";
import { hash } from "bcrypt";
import { AppError } from "@/utils/AppError";
import { prisma } from "@/database/prisma";

class UsersController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z
        .string()
        .trim()
        .min(2, { message: "Nome precisa ter no mínimo 2 caracteres" }),
      email: z.email({ message: "E-mail inválido" }).trim(),
      password: z.string().min(6, "Senha precisa ter no mínimo 6 caracteres"),
      role: z
        .enum([UserRole.ADMIN, UserRole.MODERATOR, UserRole.USER])
        .default(UserRole.USER),
    });

    const { name, email, password, role } = bodySchema.parse(req.body);

    const userWithSameEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (userWithSameEmail) {
      throw new AppError("User with same email already exists");
    }

    const hashedPassword = await hash(password, 8);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return res.status(201).json({ message: "Você criou seu usuário!" });
  }

  /*async update(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z
        .string()
        .trim()
        .min(2, { message: "Nome precisa ter no mínimo 2 caracteres" })
        .optional(),

      currentPassword: z
        .string()
        .min(6, "Senha precisa ter no mínimo 6 caracteres")
        .optional(),
      newPassword: z.string().min(6).optional(),
    });

    const data = bodySchema.parse(req.body)
    
    

    const passwordMatch = await compare(
      currentPassword,
      
    )
  }*/
}

export { UsersController };
