import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-surface-light px-4 py-8 text-text-primary sm:px-6 lg:px-8">
      <main className="mx-auto flex w-full max-w-sm flex-col items-center rounded-3xl bg-surface-light p-6 shadow-[0_8px_30px_rgba(41,27,26,0.10)] md:max-w-md md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
