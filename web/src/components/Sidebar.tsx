import { NavLink, useNavigate } from "react-router";
import {
  Heart,
  Home,
  LogIn,
  LogOut,
  Notebook,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import logoSvg from "../assets/logo.svg";
import { classMerge } from "../utils/classMerge";
import { useAuth } from "../hooks/useAuth";

type SidebarProps = {
  className?: string;
  variant?: "private" | "public";
};

export function Sidebar({ className, variant = "private" }: SidebarProps) {
  const auth = useAuth();
  const navigate = useNavigate();
  const isPublic = variant === "public";

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    classMerge([
      "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-dark focus-visible:ring-offset-2 focus-visible:ring-offset-surface-light-dark md:text-base",
      isActive
        ? "bg-surface-light text-text-primary shadow-sm"
        : "text-surface-dark hover:bg-white/60 hover:text-text-primary",
    ]);

  const publicLinkClass = ({ isActive }: { isActive: boolean }) =>
    classMerge([
      "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-dark focus-visible:ring-offset-2 focus-visible:ring-offset-surface-light-dark md:text-base",
      isActive
        ? "bg-surface-light text-text-primary shadow-sm"
        : "text-surface-dark hover:bg-white/60 hover:text-text-primary",
    ]);

  return (
    <aside className={classMerge(["bg-surface-light-dark", className])}>
      <div className="flex items-center justify-between gap-4 md:flex-col md:justify-start">
        <img
          src={logoSvg}
          alt="Recipes From Heart"
          className="h-10 w-auto md:my-4 md:h-auto"
        />

        {isPublic ? (
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="inline-flex items-center gap-2 rounded-2xl border border-surface-dark px-3 py-2 text-sm font-semibold text-surface-dark transition-colors duration-200 hover:bg-surface-dark hover:text-white"
            >
              <LogIn size={16} />
              Entrar
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              auth.remove();
              navigate("/");
            }}
            className="inline-flex items-center gap-2 rounded-2xl border border-surface-dark px-3 py-2 text-sm font-semibold text-surface-dark transition-colors duration-200 hover:bg-surface-dark hover:text-white md:hidden"
          >
            <LogOut size={16} />
            Sair
          </button>
        )}
      </div>

      <nav className="mt-4 text-surface-dark md:mt-8 md:text-xl">
        <ul className="grid grid-cols-2 gap-2 md:flex md:flex-col md:gap-7">
          <li>
            <NavLink
              to={isPublic ? "/" : "/home"}
              className={isPublic ? publicLinkClass : linkClass}
            >
              <Home size={18} />
              <span>Ínicio</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recipes/community"
              className={isPublic ? publicLinkClass : linkClass}
            >
              <Users size={18} />
              <span>Receitas da comunidade</span>
            </NavLink>
          </li>
          {isPublic ? (
            <>
              <li>
                <NavLink to="/signin" className={publicLinkClass}>
                  <LogIn size={18} />
                  <span>Entrar</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" className={publicLinkClass}>
                  <UserPlus size={18} />
                  <span>Registre-se</span>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/recipes/me" className={linkClass}>
                  <Notebook size={18} />
                  <span>Minhas receitas</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/recipes/favorites" className={linkClass}>
                  <Heart size={18} />
                  <span>Favoritos</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile/me" className={linkClass}>
                  <User size={18} />
                  <span>Perfil</span>
                </NavLink>
              </li>
              <li>
                <button
                  onClick={() => {
                    auth.remove();
                    navigate("/");
                  }}
                  className="hidden w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-bold text-surface-dark transition-colors duration-200 hover:bg-white/60 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-dark focus-visible:ring-offset-2 focus-visible:ring-offset-surface-light-dark md:flex md:text-base"
                >
                  <LogOut size={18} />
                  <span>Sair</span>
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
}
