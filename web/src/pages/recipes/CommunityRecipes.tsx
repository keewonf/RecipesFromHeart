import { RecipeList } from "../../components/recipes/RecipeList";
import { useRecipes } from "../../hooks/useRecipes";

export function CommunityRecipes() {
  const { recipes, loading, pagination, goToNextPage, goToPreviousPage } =
    useRecipes({ type: "community" });

  return (
    <div className="p-4 md:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-text-primary md:text-3xl">
          Receitas da comunidade
        </h1>
      </div>

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
