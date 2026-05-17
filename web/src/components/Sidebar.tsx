import { NavLink } from "react-router";
import { Heart, Home, LogOut, Notebook, User, Users } from "lucide-react";
import logoSvg from "../assets/logo.svg";
import { classMerge } from "../utils/classMerge";

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  const asideClass = classMerge("w-64 bg-white p-4", className);

  return (
    <aside className={asideClass}>
      <img src={logoSvg} alt="logo" />

      <nav>
        <ul>
          <li>
            <NavLink to="/">
              <Home />
              <span>Ínicio</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/recipes/user">
              <Notebook />
              <span>Minhas receitas</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/recipes/community">
              <Users />
              <span>Receitas da comunidade</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/recipes/favorites">
              <Heart />
              <span>Favoritos</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile">
              <User />
              <span>Perfil</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <LogOut />
              <span>Sair</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
