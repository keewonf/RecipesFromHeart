import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Link, useNavigate } from "react-router";
import { api } from "../services/api";
import { AxiosError } from "axios";

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
    setError,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const navigate = useNavigate();

  async function onSubmit(data: FormData) {
    const { confirmPassword, ...rest } = data;

    try {
      await api.post("/users", rest);

      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError("email", {
          type: "server",
          message: error.response?.data.message,
        });
        return;
      }

      setError("root", {
        type: "server",
        message: "Erro inesperado. Tente novamente.",
      });
    }
  }

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-text-secondary md:mb-8 md:text-3xl">
        Registre-se
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input
              required
              placeholder="Nome"
              error={errors.name?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              required
              type="email"
              placeholder="Email"
              autoComplete="email"
              error={errors.email?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              required
              type="password"
              placeholder="senha"
              autoComplete="new-password"
              error={errors.password?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <Input
              required
              type="password"
              autoComplete="new-password"
              placeholder="Confirmar senha"
              error={errors.confirmPassword?.message}
              {...field}
            />
          )}
        />

        <Button isLoading={isSubmitting} type="submit">
          Entrar
        </Button>

        <Link
          className="m-auto text-sm font-bold text-surface-dark hover:text-text-primary md:text-base"
          to="/"
        >
          Já tem conta? Faça Login!
        </Link>
      </form>
    </>
  );
}
