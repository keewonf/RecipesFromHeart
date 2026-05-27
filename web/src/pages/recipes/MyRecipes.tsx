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
    <div className="p-4 md:p-6">
      {showHeader && (
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="mb-0 text-2xl font-bold text-text-primary md:text-3xl">
            Minhas receitas
          </h1>
          <Link
            to="/recipes/new"
            className="flex h-11 items-center justify-center rounded-2xl border border-surface-dark bg-surface-dark px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 ease-linear hover:bg-text-primary md:h-12 md:rounded-3xl md:text-base"
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
