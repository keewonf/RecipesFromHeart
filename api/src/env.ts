import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.url({ error: "DATABASE_URL inválida ou não definida" }),
  JWT_SECRET: z.string({ error: "Defina um JWT_SECRET" }).min(1),
  PORT: z.coerce.number().default(3333),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  CLOUDINARY_CLOUD_NAME: z
    .string({ error: "CLOUDINARY_CLOUD_NAME é obrigatório" })
    .min(1),
  CLOUDINARY_API_KEY: z
    .string({ error: "CLOUDINARY_API_KEY é obrigatório" })
    .min(1),
  CLOUDINARY_API_SECRET: z
    .string({ error: "CLOUDINARY_API_SECRET é obrigatório" })
    .min(1),
});

export const env = envSchema.parse(process.env);
