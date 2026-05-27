import { useNavigate } from "react-router";
import type { RecipeSummaryData } from "../../dtos/recipe";

type RecipeCardProps = {
  recipe: RecipeSummaryData;
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  const navigate = useNavigate();

  function handleOpenRecipe() {
    navigate("/recipes/preview", { state: recipe });
  }

  return (
    <article
      className="w-full cursor-pointer overflow-hidden rounded-2xl bg-surface-light p-3 shadow-[0_2px_12px_rgba(41,27,26,0.12)] transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-dark focus-visible:ring-offset-2 focus-visible:ring-offset-surface-light md:rounded-3xl md:p-4"
      role="button"
      aria-label={`Abrir receita ${recipe.title}`}
      tabIndex={0}
      onClick={handleOpenRecipe}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleOpenRecipe();
        }
      }}
    >
      <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-sm">Imagem</span>
        )}
      </div>
      <div className="p-3 md:p-4">
        <h3 className="text-base font-bold text-text-secondary md:text-lg">
          {recipe.title}
        </h3>
        <p className="mt-1 text-sm font-bold text-text-secondary">
          Tempo: {recipe.preparationTime} min
        </p>
        <div className="mt-2 flex items-center justify-between gap-3 text-sm font-bold text-text-secondary">
          <div>{recipe.portions} porções</div>
          <div className="text-yellow-500">
            {recipe.isPublic ? "Pública" : "Privada"}
          </div>
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;
