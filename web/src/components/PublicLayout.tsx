import { Outlet } from "react-router";

import { Sidebar } from "./Sidebar";

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-surface-light md:grid md:grid-cols-[minmax(160px,220px)_1fr] md:grid-rows-[auto_1fr]">
      <Sidebar
        variant="public"
        className="w-full border-b border-stone-300/80 p-3 md:row-span-2 md:w-auto md:border-b-0 md:border-r md:p-4"
      />

      <Outlet />
    </div>
  );
}
