import { Outlet } from "react-router";

type AuthLayoutProps = {
  title: string;
};

export function AuthLayout({ title }: AuthLayoutProps) {
  return (
    <div className="w-screen min-h-screen bg-surface-light flex flex-col justify-center items-center text-text-primary ">
      <main className="p-8 rounded-md flex items-center flex-col md:min-w-115.5">
        <h1 className="mb-8 text-3xl font-bold text-text-secondary">{title}</h1>
        <Outlet />
      </main>
    </div>
  );
}
