import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Link } from "react-router";

const signInSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string("Senha inválida").trim().min(1, "Informe a senha"),
});

type FormData = z.infer<typeof signInSchema>;

export function SignIn() {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  return (
    <form className="w-full flex flex-col gap-4">
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input required type="email" placeholder="email" {...field} />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <Input required type="password" placeholder="senha" {...field} />
        )}
      />
      <Link className="text-surface-dark ml-auto font-bold" to="/help">
        Esqueci a senha
      </Link>
      <Button type="submit">Entrar</Button>

      <Link className="text-surface-dark font-bold" to="/signup">
        Ainda não tem conta? Crie uma!
      </Link>
    </form>
  );
}
