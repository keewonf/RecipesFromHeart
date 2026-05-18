import { Route, Routes } from "react-router";
import { AppLayout } from "../components/AppLayout";

import { NotFound } from "../pages/NotFound";
import MyRecipes from "../pages/recipes/MyRecipes";
import { CreateRecipe } from "../pages/recipes/CreateRecipe";

export function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/recipes/me" element={<MyRecipes />} />
        <Route path="/recipes/new" element={<CreateRecipe />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
