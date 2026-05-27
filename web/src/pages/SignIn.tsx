import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Link, useNavigate } from "react-router";
import { AxiosError } from "axios";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";

const signInSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string("Senha inválida").trim().min(1, "Informe a senha"),
});

type FormData = z.infer<typeof signInSchema>;

export function SignIn() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });
  const navigate = useNavigate();
  const auth = useAuth();

  async function onSubmit(data: FormData) {
    try {
      const response = await api.post("/sessions", data);
      auth.save(response.data);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message ?? "Erro de conexão com o servidor";
        setError("root", {
          message,
        });
        return;
      }

      setError("root", {
        message: "Erro inesperado. Tente novamente",
      });

      return;
    }
  }

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-text-secondary md:mb-8 md:text-3xl">
        Login
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              required
              type="email"
              placeholder="email"
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
              autoComplete="current-password"
              error={errors.password?.message}
              {...field}
            />
          )}
        />

        <p className="text-sm text-red-600 text-center my-4 font-medium">
          {errors.root?.message}
        </p>

        <Link
          className="ml-auto text-sm font-bold text-surface-dark hover:text-text-primary md:text-base"
          to="/help"
        >
          Esqueci a senha
        </Link>
        <Button isLoading={isSubmitting} type="submit">
          Entrar
        </Button>

        <Link
          className="m-auto text-sm font-bold text-surface-dark hover:text-text-primary md:text-base"
          to="/signup"
        >
          Ainda não tem conta? Crie uma!
        </Link>
      </form>
    </>
  );
}
