import { NavLink, useNavigate } from "react-router";
import { Heart, Home, LogOut, Notebook, User, Users } from "lucide-react";
import logoSvg from "../assets/logo.svg";
import { classMerge } from "../utils/classMerge";
import { useAuth } from "../hooks/useAuth";

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <aside className={classMerge(["bg-surface-light-dark", className])}>
      <div className="my-4 flex items-center justify-center">
        <img src={logoSvg} alt="logo" />
      </div>

      <nav className="text-surface-dark font-bold text-xl mt-8">
        <ul className="flex flex-col gap-7">
          <li>
            <NavLink
              to="/home"
              className="flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:text-text-primary"
            >
              <Home />
              <span>Ínicio</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recipes/me"
              className="flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:text-text-primary"
            >
              <Notebook />
              <span>Minhas receitas</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recipes/community"
              className="flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:text-text-primary"
            >
              <Users />
              <span>Receitas da comunidade</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recipes/favorites"
              className="flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:text-text-primary"
            >
              <Heart />
              <span>Favoritos</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/me"
              className="flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:text-text-primary"
            >
              <User />
              <span>Perfil</span>
            </NavLink>
          </li>
          <li>
            <button
              onClick={() => {
                auth.remove();
                navigate("/");
              }}
              className="flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:text-text-primary"
            >
              <LogOut />
              <span>Sair</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
