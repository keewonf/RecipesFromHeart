import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import z from "zod";

const ingredientSchema = z.object({
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
});

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

  imageUrl: z.url({ message: "URL de imagem inválida" }).nullable().optional(),
  imageKey: z
    .string()
    .trim()
    .max(255, "Chave de imagem muito longa")
    .nullable()
    .optional(),

  ingredients: z
    .array(ingredientSchema)
    .min(1, "Adicione pelo menos um ingrediente"),
});

const updateBodySchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Digite um título de no mínimo 5 caracteres")
    .max(60, "Título muito longo, máximo de 60 caracteres")
    .optional(),

  resume: z
    .string()
    .trim()
    .min(5, "Digite um resumo de no mínimo 5 caracteres")
    .max(500, "Resumo muito longo, máximo de 500 caracteres")
    .optional(),

  preparationTime: z.coerce
    .number()
    .int({ message: "Digite um número inteiro válido" })
    .positive({ message: "Tempo de preparo deve ser um número positivo" })
    .optional(),

  portions: z.coerce
    .number()
    .int({ message: "Digite um número inteiro válido" })
    .positive({ message: "Porções devem ser um número positivo" })
    .optional(),

  preparationMethod: z
    .string()
    .trim()
    .min(5, "Digite um método de preparo de no mínimo 5 caracteres")
    .max(2000, "Método de preparo muito longo, máximo de 2000 caracteres")
    .optional(),

  isPublic: z.coerce.boolean().optional(),

  imageUrl: z.url({ message: "URL de imagem inválida" }).nullable().optional(),
  imageKey: z
    .string()
    .trim()
    .max(255, "Chave de imagem muito longa")
    .nullable()
    .optional(),

  ingredients: z
    .array(ingredientSchema)
    .min(1, "Adicione pelo menos um ingrediente")
    .optional(),
});

const paramsSchema = z.object({
  id: z.uuid("ID da receita inválido"),
});

const querySchema = z.object({
  name: z.string().trim().optional().default(""),
  page: z.coerce.number().int().positive().optional().default(1),
  perPage: z.coerce.number().int().positive().max(50).optional().default(10),
});

class RecipesController {
  async create(req: Request, res: Response) {
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
    const { name, page, perPage } = querySchema.parse(req.query);

    const skip = (page - 1) * perPage;

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
      skip,
      take: perPage,
      where: {
        userId: user.id,
        ...(name
          ? {
              title: {
                contains: name,
                mode: "insensitive",
              },
            }
          : {}),
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

    const totalRecords = await prisma.recipe.count({
      where: {
        userId: user.id,
        ...(name
          ? {
              title: {
                contains: name,
                mode: "insensitive",
              },
            }
          : {}),
      },
    });

    const totalPages = Math.ceil(totalRecords / perPage);

    return res.json({
      recipes,
      pagination: {
        page,
        perPage,
        totalRecords,
        totalPages: totalPages > 0 ? totalPages : 1,
      },
    });
  }

  async community(req: Request, res: Response) {
    const { name, page, perPage } = querySchema.parse(req.query);

    const skip = (page - 1) * perPage;

    const recipes = await prisma.recipe.findMany({
      skip,
      take: perPage,
      where: {
        isPublic: true,
        ...(name
          ? {
              title: {
                contains: name,
                mode: "insensitive",
              },
            }
          : {}),
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

    const totalRecords = await prisma.recipe.count({
      where: {
        isPublic: true,
        ...(name
          ? {
              title: {
                contains: name,
                mode: "insensitive",
              },
            }
          : {}),
      },
    });

    const totalPages = Math.ceil(totalRecords / perPage);

    return res.json({
      recipes,
      pagination: {
        page,
        perPage,
        totalRecords,
        totalPages: totalPages > 0 ? totalPages : 1,
      },
    });
  }

  async show(req: Request, res: Response) {
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
      throw new AppError("Receita não encontrada", 404);
    }

    if (!recipe.isPublic && recipe.userId !== req.user.id) {
      throw new AppError("Receita não encontrada", 404);
    }

    return res.json({ recipe });
  }

  async update(req: Request, res: Response) {
    const { id } = paramsSchema.parse(req.params);
    const data = updateBodySchema.parse(req.body);

    if (!req.user) {
      throw new AppError("Usuário não encontrado", 401);
    }

    if (Object.keys(data).length === 0) {
      throw new AppError("Nenhum conteúdo para atualizar", 400);
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
      throw new AppError("Receita não encontrada", 404);
    }

    const isOwner = recipe.userId === req.user.id;
    const isAdmin = req.user.role === "ADMIN";

    if (!isOwner && !isAdmin) {
      throw new AppError("Receita não encontrada", 404);
    }

    const { ingredients, ...updatedData } = data;

    const updatedRecipe = await prisma.$transaction(async (tx) => {
      await tx.recipe.update({
        where: { id: recipe.id },
        data: updatedData,
      });

      if (ingredients) {
        await tx.recipeIngredient.deleteMany({
          where: {
            recipeId: recipe.id,
          },
        });

        const formattedIngredients = ingredients.map((ingredient, index) => ({
          ...ingredient,
          recipeId: recipe.id,
          position: index,
        }));

        await tx.recipeIngredient.createMany({
          data: formattedIngredients,
        });
      }

      return tx.recipe.findUnique({
        where: {
          id: recipe.id,
        },

        include: {
          ingredients: {
            orderBy: {
              position: "asc",
            },
          },
        },
      });
    });

    return res.json({ recipe: updatedRecipe });
  }

  async delete(req: Request, res: Response) {
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
        userId: true,
      },
    });

    if (!recipe) {
      throw new AppError("Receita não encontrada", 404);
    }

    const isOwner = recipe.userId === req.user.id;
    const isAdmin = req.user.role === "ADMIN";

    if (!isOwner && !isAdmin) {
      throw new AppError("Receita não encontrada", 404);
    }

    await prisma.recipe.delete({
      where: {
        id: recipe.id,
      },
    });

    return res.status(204).send();
  }
}

export { RecipesController };
