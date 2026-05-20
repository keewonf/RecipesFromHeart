import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.url({ error: "DATABASE_URL inválida ou não definida" }),
  JWT_SECRET: z.string({ error: "Defina um JWT_SECRET" }).min(1),
  PORT: z.coerce.number().default(3333),
});

export const env = envSchema.parse(process.env)