import { RecipeCard } from "./RecipeCard";

type RecipeListProps = {
  recipes: readonly any[];
  loading?: boolean;
  onLoadMore?: () => void;
};

export function RecipeList({
  recipes = [],
  loading,
  onLoadMore,
}: RecipeListProps) {
  if (loading) return <div className="p-4">Carregando...</div>;

  if (!recipes.length)
    return <div className="p-4 text-muted">Nenhuma receita encontrada.</div>;

  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
        {recipes.map((r, i) => (
          <RecipeCard key={r.id ?? i} recipe={r} />
        ))}
      </div>
      {onLoadMore && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={onLoadMore}
            className="cursor-pointer rounded-full bg-surface-dark px-5 py-2 text-sm font-semibold text-surface-light transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(41,27,26,0.18)] hover:brightness-110"
          >
            Carregar mais
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeList;
