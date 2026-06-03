import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import z from "zod";

const paramsSchema = z.object({
  id: z.uuid("ID da receita inválido"),
});

class FavoritesController {
  async create(req: Request, res: Response) {
    const { id: recipeId } = paramsSchema.parse(req.params);

    if (!req.user) {
      throw new AppError("Usuário não encontrado", 401);
    }

    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
      select: {
        id: true,
      },
    });

    if (!recipe) {
      throw new AppError("Receita não encontrada", 404);
    }

    try {
      await prisma.recipeFavorite.create({
        data: {
          userId: req.user.id,
          recipeId,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new AppError("Você já favoritou esta receita", 409);
      }

      throw error;
    }

    return res.status(201).json({
      message: "Receita favoritada com sucesso",
    });
  }

  async delete(req: Request, res: Response) {
    const { id: recipeId } = paramsSchema.parse(req.params);

    if (!req.user) {
      throw new AppError("Usuário não encontrado", 401);
    }

    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
      select: {
        id: true,
      },
    });

    if (!recipe) {
      throw new AppError("Receita não encontrada", 404);
    }

    try {
      await prisma.recipeFavorite.delete({
        where: {
          userId_recipeId: {
            userId: req.user.id,
            recipeId,
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new AppError("Você não favoritou esta receita", 404);
      }

      throw error;
    }

    return res.status(204).send();
  }
}

export { FavoritesController };
