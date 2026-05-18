import { RecipeList } from "../../components/recipes/RecipeList";
import { useRecipes } from "../../hooks/useRecipes";

export function MyRecipes() {
  const { recipes, loading, loadMore } = useRecipes({ type: "mine" });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-text-primary mb-4">
        Minhas receitas
      </h1>
      <RecipeList recipes={recipes} loading={loading} onLoadMore={loadMore} />
    </div>
  );
}

export default MyRecipes;
