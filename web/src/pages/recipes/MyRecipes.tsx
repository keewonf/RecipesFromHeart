import { Link } from "react-router";
import { RecipeList } from "../../components/recipes/RecipeList";
import { useRecipes } from "../../hooks/useRecipes";

type MyRecipesProps = {
  showHeader?: boolean;
};

export function MyRecipes({ showHeader = true }: MyRecipesProps) {
  const { recipes, loading, pagination, goToNextPage, goToPreviousPage } =
    useRecipes({ type: "mine" });

  return (
    <div className="p-4">
      {showHeader && (
        <div className="mb-5 flex items-center justify-between">
          <h1 className="mb-4 text-2xl font-bold text-text-primary">
            Minhas receitas
          </h1>
          <Link
            to="/recipes/new"
            className="flex h-12 items-center justify-center rounded-3xl border border-surface-dark bg-surface-dark p-3 text-xl text-white transition-colors duration-200 ease-linear hover:bg-text-primary"
          >
            Nova receita
          </Link>
        </div>
      )}

      <RecipeList
        recipes={recipes}
        loading={loading}
        pagination={pagination}
        onNext={goToNextPage}
        onPrevious={goToPreviousPage}
      />
    </div>
  );
}
