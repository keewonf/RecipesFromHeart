import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import z from "zod";

class RecipesController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      title: z
        .string()
        .trim()
        .min(5, "Digite um título de no mínimo 5 caracteres")
        .max(60, "Título muito longo, máximo de 60 caracteres"),

      resume: z
        .string()
        .trim()
        .min(5, "Digite um resumo de no mínimo 5 caracteres")
        .max(500, "Resumo muito longo, máximo de 500 caracteres"),

      preparationTime: z.coerce
        .number()
        .int({ message: "Digite um número inteiro válido" })
        .positive({ message: "Tempo de preparo deve ser um número positivo" }),

      portions: z.coerce
        .number()
        .int({ message: "Digite um número inteiro válido" })
        .positive({ message: "Porções devem ser um número positivo" }),

      preparationMethod: z
        .string()
        .trim()
        .min(5, "Digite um método de preparo de no mínimo 5 caracteres")
        .max(2000, "Método de preparo muito longo, máximo de 2000 caracteres"),

      isPublic: z.coerce.boolean().default(true),

      imageUrl: z.url({ message: "URL de imagem inválida" }).optional(),
      imageKey: z
        .string()
        .trim()
        .max(255, "Chave de imagem muito longa")
        .optional(),

      ingredients: z
        .array(
          z.object({
            name: z
              .string()
              .trim()
              .min(2, "Digite um nome de no mínimo 2 caracteres")
              .max(60, "Nome muito longo, máximo de 60 caracteres"),

            quantity: z
              .string()
              .trim()
              .min(1, "Digite uma quantidade de no mínimo 1 caractere")
              .max(60, "Quantidade muito longa, máximo de 60 caracteres"),

            unit: z
              .string()
              .trim()
              .max(60, "Unidade muito longa, máximo de 60 caracteres")
              .optional(),

            note: z
              .string()
              .trim()
              .max(120, "Observação muito longa, máximo de 120 caracteres")
              .optional(),
          }),
        )
        .min(1, "Adicione pelo menos um ingrediente"),
    });

    const data = bodySchema.parse(req.body);

    if (!req.user) {
      throw new AppError("Usuário não encontrado", 401);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 401);
    }

    const ingredients = data.ingredients.map((ingredient, index) => ({
      ...ingredient,
      position: index,
    }));

    const recipe = await prisma.recipe.create({
      data: {
        title: data.title,
        resume: data.resume,
        preparationTime: data.preparationTime,
        portions: data.portions,
        preparationMethod: data.preparationMethod,
        isPublic: data.isPublic,

        imageUrl: data.imageUrl,
        imageKey: data.imageKey,

        userId: req.user.id,

        ingredients: {
          create: ingredients,
        },
      },
      select: {
        id: true,
        title: true,
        resume: true,
        preparationTime: true,
        portions: true,
        preparationMethod: true,
        isPublic: true,
        imageUrl: true,
        imageKey: true,

        ingredients: {
          orderBy: {
            position: "asc",
          },
          select: {
            id: true,
            name: true,
            quantity: true,
            unit: true,
            note: true,
            position: true,
          },
        },

        createdAt: true,
      },
    });

    return res.status(201).json({ recipe });
  }

  async index(req: Request, res: Response) {
    if (!req.user) {
      throw new AppError("Usuário não encontrado", 401);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 401);
    }

    const recipes = await prisma.recipe.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        resume: true,
        preparationTime: true,
        portions: true,
        preparationMethod: true,
        isPublic: true,
        imageUrl: true,
        imageKey: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.json({ recipes });
  }

  async community(req: Request, res: Response) {
    if (!req.user) {
      throw new AppError("Usuário não encontrado", 401);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 401);
    }

    const recipes = await prisma.recipe.findMany({
      where: {
        isPublic: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        resume: true,
        preparationTime: true,
        portions: true,
        imageUrl: true,
        imageKey: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            profileImageUrl: true,
          },
        },
      },
    });

    return res.json({ recipes });
  }

  async show(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.uuid("ID da receita inválido"),
    });

    const { id } = paramsSchema.parse(req.params);

    if (!req.user) {
      throw new AppError("Usuário não encontrado", 401);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 401);
    }

    const recipe = await prisma.recipe.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        resume: true,
        preparationTime: true,
        portions: true,
        preparationMethod: true,
        isPublic: true,
        imageUrl: true,
        imageKey: true,
        originalFilename: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        ingredients: {
          orderBy: {
            position: "asc",
          },
          select: {
            id: true,
            name: true,
            quantity: true,
            unit: true,
            note: true,
            position: true,
          },
        },
      },
    });

    if (!recipe) {
      throw new AppError("Receita não encontrada", 401);
    }

    if (!recipe.isPublic && recipe.userId !== req.user.id) {
      throw new AppError("Receita não encontrada", 403);
    }

    return res.json({ recipe });
  }
}

export { RecipesController };
