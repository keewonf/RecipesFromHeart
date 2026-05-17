import { Link, useNavigate } from "react-router";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface-light">
      <h1 className="text-2xl font-bold">404</h1>
      <p>Página não encontrada</p>
      <button
        onClick={() => navigate(-1)}
        className="text-center hover:text-surface-dark text-sm font-semibold  mt-4 transition ease-linear cursor-pointer"
      >
        Voltar
      </button>
      <Link
        to="/"
        className="text-center hover:text-surface-dark text-sm font-semibold mt-4 transition ease-linear"
      >
        Ir para Home
      </Link>
    </div>
  );
}
