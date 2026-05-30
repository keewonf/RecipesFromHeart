import { Navigate, Route, Routes } from "react-router";
import { AppLayout } from "../components/AppLayout";

import { NotFound } from "../pages/NotFound";
import { MyRecipes } from "../pages/recipes/MyRecipes";
import { CreateRecipe } from "../pages/recipes/CreateRecipe";
import { CommunityRecipes } from "../pages/recipes/CommunityRecipes";
import { RecipeSuccess } from "../pages/recipes/RecipeSuccess";
import { RecipePdf } from "../pages/recipes/RecipePdf";
import { Profile } from "../pages/Profile";
import { Favorites } from "../pages/recipes/Favorites";
import { Home } from "../pages/Home";

export function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/me" element={<Profile />} />
        <Route path="/users/me/recipes" element={<MyRecipes />} />
        <Route path="/recipes/favorites" element={<Favorites />} />
        <Route path="/recipes/new" element={<CreateRecipe />} />
        <Route path="/recipes/edit/:id" element={<CreateRecipe />} />
        <Route path="/recipes/community" element={<CommunityRecipes />} />
        <Route path="/recipes/preview/:id" element={<RecipeSuccess />} />
        <Route path="/recipes/pdf/:id" element={<RecipePdf />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
