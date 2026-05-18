import { RecipeList } from "../../components/recipes/RecipeList";
import { useRecipes } from "../../hooks/useRecipes";

export function CommunityRecipes() {
  const { recipes, loading, loadMore } = useRecipes({ type: "community" });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-text-primary">
        Receitas da comunidade
      </h1>
      <RecipeList recipes={recipes} loading={loading} onLoadMore={loadMore} />
    </div>
  );
}

export default CommunityRecipes;
