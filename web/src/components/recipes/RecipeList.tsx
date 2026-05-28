import { Pagination } from "../Pagination";
import { RecipeCard } from "./RecipeCard";
import type { RecipeSummaryData } from "../../dtos/recipe";

type RecipeListProps = {
  recipes: readonly RecipeSummaryData[]; // Read-only list to prevent accidental mutations inside the component
  loading?: boolean;
  pagination?: {
    page: number;
    perPage: number;
    totalRecords: number;
    totalPages: number;
  };
  onNext?: () => void;
  onPrevious?: () => void;
  // When true, show edit controls on each card (useful for /recipes/me) 
  showEdit?: boolean;
};

export function RecipeList({
  recipes,
  loading,
  pagination,
  onNext,
  onPrevious,
  showEdit,
}: RecipeListProps) {
  const currentPage = pagination?.page ?? 1;
  const totalOfPage = pagination?.totalPages ?? 1;

  if (loading) return <div className="p-4">Carregando...</div>;

  if (!recipes.length)
    return (
      <div className="p-4 text-sm text-text-secondary md:text-base">
        Nenhuma receita encontrada.
      </div>
    );

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {recipes.map((r, i) => (
          <RecipeCard key={r.id ?? i} recipe={r} showEdit={showEdit} />
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
