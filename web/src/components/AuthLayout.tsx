import { Outlet } from "react-router";
import logoSvg from "../assets/logo.svg";

export function AuthLayout() {
  return (
    <div className="w-screen min-h-screen bg-surface-light flex flex-col justify-center items-center text-text-primary md:min-w-115.5">
      <img src={logoSvg} alt="logo" className="mb-8" />
      <Outlet />
    </div>
  );
}
