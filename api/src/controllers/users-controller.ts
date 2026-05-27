import { Request, Response } from "express";
import { Prisma, UserRole } from "@prisma/client";
import { z } from "zod";
import { compare, hash } from "bcrypt";
import { AppError } from "@/utils/AppError";
import { prisma } from "@/database/prisma";

class UsersController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z
        .string()
        .trim()
        .min(2, { message: "Nome precisa ter no mínimo 2 caracteres" })
        .max(120, { message: "Nome pode ter no máximo 120 caracteres" }),
      email: z.email({ message: "E-mail inválido" }).trim(),
      password: z.string().min(6, "Senha precisa ter no mínimo 6 caracteres"),
    });

    const { name, email, password } = bodySchema.parse(req.body);

    // Password hashing with bcrypt (8 rounds) to balance security and API performance
    const hashedPassword = await hash(password, 8);
    let user;

    try {
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: UserRole.USER,
        },
      });
    } catch (error) {
      // Handle unique constraint error (duplicate email)
      // P2002: Code for unique constraint violation
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new AppError("User with same email already exists");
      }

      throw error;
    }

    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json({ user: userWithoutPassword });
  }

  async update(req: Request, res: Response) {
    const bodySchema = z
      .object({
        name: z
          .string()
          .trim()
          .min(2, { message: "Nome precisa ter no mínimo 2 caracteres" })
          .max(120, { message: "Nome pode ter no máximo 120 caracteres" })
          .optional(),

        currentPassword: z
          .string()
          .min(6, "Senha precisa ter no mínimo 6 caracteres")
          .optional(),
        newPassword: z
          .string()
          .min(6, "Nova senha precisa  ter no mínimo 6 caracteres")
          .optional(),

        profileImageUrl: z.url().nullable().optional(),
        profileImageKey: z.string().min(1).nullable().optional(),
      })
      .refine(
        (data) => {
          // Require current password when user is changing password
          if (data.newPassword && !data.currentPassword) {
            return false;
          }

          return true;
        },
        {
          message: "Senha atual é obrigatória para alterar a senha",
          path: ["currentPassword"],
        },
      );

    const data = bodySchema.parse(req.body);

    if (!data.name && !data.newPassword) {
      throw new AppError("Nenhum dado enviado para atualização", 400);
    }

    if (!req.user) {
      throw new AppError("Usuário não encontrado", 401);
    }

    // Ensures user update (including optional password change) is executed safely in a single transaction
    const updatedUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {
          id: req.user!.id,
        },
      });

      if (!user) {
        throw new AppError("Usuário não encontrado", 401);
      }

      const updatedData: {
        name?: string;
        password?: string;
        profileImageUrl?: string | null;
        profileImageKey?: string | null;
      } = {};

      if (data.name) {
        updatedData.name = data.name;
      }

      if (data.newPassword && data.currentPassword) {
        const passwordMatch = await compare(
          data.currentPassword,
          user.password,
        );

        if (!passwordMatch) {
          throw new AppError("Credenciais inválidas", 401);
        }

        const hashedPassword = await hash(data.newPassword, 8);

        updatedData.password = hashedPassword;
      }

      if (data.profileImageUrl !== undefined) {
        updatedData.profileImageUrl = data.profileImageUrl;
      }

      if (data.profileImageKey !== undefined) {
        updatedData.profileImageKey = data.profileImageKey;
      }

      return tx.user.update({
        where: {
          id: user.id,
        },

        data: updatedData,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          profileImageUrl: true,
          profileImageKey: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    });

    return res.json({ user: updatedUser });
  }

  async show(req: Request, res: Response) {
    if (!req.user) {
      throw new AppError("Usuário não encontrado", 401);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profileImageUrl: true,
        profileImageKey: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 401);
    }

    return res.json({ user });
  }
}

export { UsersController };
