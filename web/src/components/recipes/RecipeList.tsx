import { useEffect, useMemo, useState } from "react";
import { Pagination } from "../Pagination";
import { RecipeCard } from "./RecipeCard";

type RecipeListProps = {
  recipes: readonly any[];
  loading?: boolean;
};

const PAGE_SIZE = 10;

export function RecipeList({ recipes, loading }: RecipeListProps) {
  const [page, setPage] = useState(1);
  const totalOfPage = useMemo(
    () => Math.max(1, Math.ceil(recipes.length / PAGE_SIZE)),
    [recipes.length],
  );

  const currentRecipes = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return recipes.slice(start, start + PAGE_SIZE);
  }, [page, recipes]);

  function handlePagination(action: "next" | "previous") {
    setPage((prev) => {
      if (action === "next" && prev < totalOfPage) {
        return prev + 1;
      } else if (action === "previous" && prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  }

  useEffect(() => {
    setPage(1);
  }, [recipes]);

  if (loading) return <div className="p-4">Carregando...</div>;

  if (!recipes.length)
    return <div className="p-4 text-muted">Nenhuma receita encontrada.</div>;

  return (
    <div>
      <div className="grid max-h-140 grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 overflow-y-scroll">
        {currentRecipes.map((r, i) => (
          <RecipeCard key={r.id ?? i} recipe={r} />
        ))}
      </div>

      {totalOfPage > 1 && (
        <Pagination
          onNext={() => handlePagination("next")}
          onPrevious={() => handlePagination("previous")}
          current={page}
          total={totalOfPage}
        />
      )}
    </div>
  );
}

export default RecipeList;
