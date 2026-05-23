import { RecipeList } from "../../components/recipes/RecipeList";
import { useRecipes } from "../../hooks/useRecipes";

export function Favorites() {
  const { recipes, loading } = useRecipes({ type: "favorites" });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-text-primary">Favoritos</h1>
      <RecipeList recipes={recipes} loading={loading} />
    </div>
  );
}

export default Favorites;
