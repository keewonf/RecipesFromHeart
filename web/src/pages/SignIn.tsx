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

  const auth = useAuth();
  const navigate = useNavigate();

  async function onSubmit(data: FormData) {
    try {
      const response = await api.post("/sessions", data);
      auth.save(response.data);
      navigate("/", { replace: true });
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
      <h1 className="mb-8 text-3xl font-bold text-text-secondary">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4 "
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
              error={errors.password?.message}
              {...field}
            />
          )}
        />

        <p className="text-sm text-red-600 text-center my-4 font-medium">
          {errors.root?.message}
        </p>

        <Link
          className="text-surface-dark ml-auto font-bold hover:text-text-primary"
          to="/help"
        >
          Esqueci a senha
        </Link>
        <Button isLoading={isSubmitting} type="submit">
          Entrar
        </Button>

        <Link
          className="text-surface-dark font-bold m-auto hover:text-text-primary"
          to="/signup"
        >
          Ainda não tem conta? Crie uma!
        </Link>
      </form>
    </>
  );
}
