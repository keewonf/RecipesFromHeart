import { Link } from "react-router";

export function Help() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-text-secondary md:text-3xl">
        Ajuda
      </h1>
      <p className="text-sm leading-7 text-surface-dark md:text-base">
        Se você esqueceu sua senha, ainda não existe fluxo de recuperação
        automático nesta versão. Entre em contato com o suporte do projeto ou
        volte para a tela de login para usar outra conta.
      </p>
      <Link
        className="w-fit rounded-2xl border border-surface-dark bg-surface-dark px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-text-primary md:rounded-3xl md:text-base"
        to="/"
      >
        Voltar ao login
      </Link>
    </div>
  );
}
