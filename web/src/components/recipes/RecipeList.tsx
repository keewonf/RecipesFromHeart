import { Pagination } from "../Pagination";
import { RecipeCard } from "./RecipeCard";
import type { RecipeSummaryData } from "../../dtos/recipe";

type RecipeListProps = {
  recipes: readonly RecipeSummaryData[];
  loading?: boolean;
  pagination?: {
    page: number;
    perPage: number;
    totalRecords: number;
    totalPages: number;
  };
  onNext?: () => void;
  onPrevious?: () => void;
};

export function RecipeList({
  recipes,
  loading,
  pagination,
  onNext,
  onPrevious,
}: RecipeListProps) {
  const currentPage = pagination?.page ?? 1;
  const totalOfPage = pagination?.totalPages ?? 1;

  if (loading) return <div className="p-4">Carregando...</div>;

  if (!recipes.length)
    return <div className="p-4 text-muted">Nenhuma receita encontrada.</div>;

  return (
    <div>
      <div className="grid max-h-140 grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 overflow-y-scroll">
        {recipes.map((r, i) => (
          <RecipeCard key={r.id ?? i} recipe={r} />
        ))}
      </div>

      {totalOfPage > 1 && onNext && onPrevious && (
        <Pagination
          onNext={onNext}
          onPrevious={onPrevious}
          current={currentPage}
          total={totalOfPage}
        />
      )}
    </div>
  );
}

export default RecipeList;
