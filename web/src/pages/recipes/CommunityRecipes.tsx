import { RecipeList } from "../../components/recipes/RecipeList";
import { useRecipes } from "../../hooks/useRecipes";

export function CommunityRecipes() {
  const { recipes, loading, loadMore } = useRecipes({ type: "mine" });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-text-primary mb-4">
          Receitas da comunidade
        </h1>
      </div>

      <RecipeList recipes={recipes} loading={loading} onLoadMore={loadMore} />
    </div>
  );
}
