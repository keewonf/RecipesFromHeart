import { Link, useNavigate } from "react-router";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-light px-4 text-center">
      <h1 className="text-3xl font-bold md:text-4xl">404</h1>
      <p className="mt-2 text-sm text-text-secondary md:text-base">
        Página não encontrada
      </p>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 cursor-pointer text-sm font-semibold text-text-primary transition-colors ease-linear hover:text-surface-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-dark focus-visible:ring-offset-2 focus-visible:ring-offset-surface-light"
      >
        Voltar
      </button>
      <Link
        to="/"
        className="mt-4 text-sm font-semibold text-text-primary transition-colors ease-linear hover:text-surface-dark"
      >
        Ir para Home
      </Link>
    </div>
  );
}
