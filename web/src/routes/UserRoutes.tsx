import { Route, Routes } from "react-router";
import { AppLayout } from "../components/AppLayout";

import { NotFound } from "../pages/NotFound";
import { MyRecipes } from "../pages/recipes/MyRecipes";
import { CreateRecipe } from "../pages/recipes/CreateRecipe";
import { CommunityRecipes } from "../pages/recipes/CommunityRecipes";
import { RecipePreview } from "../pages/recipes/RecipePreview";
import { Profile } from "../pages/Profile";

export function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/profile/me" element={<Profile />} />
        <Route path="/recipes/me" element={<MyRecipes />} />
        <Route path="/recipes/new" element={<CreateRecipe />} />
        <Route path="/recipes/community" element={<CommunityRecipes />} />
        <Route path="/recipes/preview" element={<RecipePreview />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
