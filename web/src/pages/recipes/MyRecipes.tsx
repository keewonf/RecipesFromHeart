import { Link } from "react-router";
import { RecipeList } from "../../components/recipes/RecipeList";
import { useRecipes } from "../../hooks/useRecipes";

export function MyRecipes() {
  const { recipes, loading, loadMore } = useRecipes({ type: "mine" });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-text-primary mb-4">
          Minhas receitas
        </h1>
        <Link
          to="/recipes/new"
          className="flex h-12 items-center justify-center rounded-3xl border border-surface-dark bg-surface-dark p-3 text-xl text-white transition-colors duration-200 ease-linear hover:bg-text-primary"
        >
          Nova receita
        </Link>
      </div>

      <RecipeList recipes={recipes} loading={loading} onLoadMore={loadMore} />
    </div>
  );
}

