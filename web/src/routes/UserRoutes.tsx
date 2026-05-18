import { Route, Routes } from "react-router";
import { AppLayout } from "../components/AppLayout";

import { NotFound } from "../pages/NotFound";
import MyRecipes from "../pages/recipes/MyRecipes";

export function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<MyRecipes />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
