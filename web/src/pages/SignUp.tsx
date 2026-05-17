import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Link } from "react-router";

const signUpSchema = z
  .object({
    name: z.string().trim().min(1, "Informe um nome"),
    email: z.email("E-mail inválido"),
    password: z
      .string("Senha inválida")
      .trim()
      .min(6, "Senha deve ter pelo menos 6 dígitos"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof signUpSchema>;

export function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(data: FormData) {
    const { confirmPassword, ...rest } = data;

    console.log(rest);
  }

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold text-text-secondary">
        Registre-se
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4 "
      >
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input required placeholder="Nome" {...field} />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input required type="email" placeholder="Email" {...field} />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input required type="password" placeholder="senha" {...field} />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <Input
              required
              type="password"
              placeholder="Confirmar senha"
              {...field}
            />
          )}
        />

        <Button isLoading={isSubmitting} type="submit">
          Entrar
        </Button>

        <Link
          className="text-surface-dark font-bold m-auto hover:text-text-primary"
          to="/"
        >
          Já tem conta? Faça Login!
        </Link>
      </form>
    </>
  );
}
