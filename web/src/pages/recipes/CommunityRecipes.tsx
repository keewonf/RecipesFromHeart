import { useState } from "react";
import { RecipeList } from "../../components/recipes/RecipeList";
import { SearchBar } from "../../components/SearchBar";
import { useRecipes } from "../../hooks/useRecipes";
import { Select } from "../../components/Select";

type SortOption = "newest" | "oldest" | "mostLiked" | "mostFavorited";

export function CommunityRecipes() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const { recipes, loading, pagination, goToNextPage, goToPreviousPage } =
    useRecipes({ type: "community", search, sortBy });

  return (
    <div className="p-4 md:p-6">
      <div className="mb-5 flex flex-col gap-3 items-baseline sm:flex-row  sm:justify-between">
        <h1 className="text-2xl font-bold text-text-primary md:text-3xl">
          Receitas da comunidade
        </h1>
        <div className="flex gap-3 items-baseline">
          <SearchBar onSearch={setSearch} />
          <Select
            id="sort-by"
            value={sortBy}
            onValueChange={(value) => setSortBy(value as SortOption)}
          >
            <option value="newest">Mais recentes</option>

            <option value="oldest">Mais antigas</option>

            <option value="mostLiked">Mais curtidas</option>

            <option value="mostFavorited">Mais favoritadas</option>
          </Select>
        </div>
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
