import { useNavigate } from "react-router";
import { Edit3, Heart, Star, Eye, EyeClosed } from "lucide-react";
import { Button } from "../Button";
import type { RecipeSummaryData } from "../../dtos/recipe";
import { useRecipeReactions } from "../../hooks/useRecipeReactions";
import { useAuth } from "../../hooks/useAuth";
import { classMerge } from "../../utils/classMerge";

type RecipeCardProps = {
  recipe: RecipeSummaryData;
  showEdit?: boolean;
};

export function RecipeCard({ recipe, showEdit }: RecipeCardProps) {
  const navigate = useNavigate();
  const { session } = useAuth();
  const visibilityLabel = recipe.isPublic
    ? "Receita pública"
    : "Receita privada";

  function handleOpenRecipe() {
    navigate(`/recipes/preview/${recipe.id}`, { state: recipe });
  }

  const { liked, favorited, likesCount, favoritesCount, toggleReaction } =
    useRecipeReactions({
      recipeId: recipe.id,
      initialLiked: recipe.likedByCurrentUser,
      initialLikesCount: recipe.likesCount,
      initialFavorites: recipe.favoritedByCurrentUser,
      initialFavoritesCount: recipe.favoritesCount,
    });

  return (
    <article
      className="w-full cursor-pointer overflow-hidden rounded-2xl bg-surface-light p-3 shadow-[0_2px_12px_rgba(41,27,26,0.12)] transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-dark focus-visible:ring-offset-2 focus-visible:ring-offset-surface-light md:rounded-3xl md:p-2.5"
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
      <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
        {showEdit && (
          <div className="absolute top-2 right-2 z-10">
            <Button
              variant="icon"
              title="Editar receita"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click navigation when clicking edit button
                navigate(`/recipes/edit/${recipe.id}`, { state: recipe });
              }}
            >
              <Edit3 />
            </Button>
          </div>
        )}
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
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold leading-tight text-text-secondary md:text-lg">
            {recipe.title}
          </h3>
          {recipe.user?.name && (
            <span className="shrink-0 pt-0.5 text-right text-xs italic font-medium text-text-secondary/70 md:text-sm">
              {recipe.user.name}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm font-bold text-text-secondary">
          Tempo: {recipe.preparationTime} min
        </p>
        <div className="mt-2 flex items-center justify-between gap-3 text-sm font-bold text-text-secondary">
          <div>
            {recipe.portions} {recipe.portions === 1 ? "porção" : "porções"}
          </div>
          <div className="flex items-center gap-2">
            {session && (
              <button
                type="button"
                title="Curtir receita"
                aria-label="Curtir receita"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleReaction("like");
                }}
                className="flex cursor-help items-center gap-1"
              >
                <Heart
                  className={classMerge(
                    "size-3.75",
                    liked
                      ? "text-[#F91880] fill-current"
                      : "hover:text-[#F91880]",
                  )}
                />
                <span className="text-[15px] inline-flex items-center justify-center min-w-4 tabular-nums">
                  {likesCount}
                </span>
              </button>
            )}

            {session && (
              <button
                type="button"
                title="Favoritar receita"
                aria-label="Favoritar receita"
                className="flex cursor-help items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleReaction("favorite");
                }}
              >
                <Star
                  className={classMerge(
                    "size-3.75",
                    favorited
                      ? "text-yellow-500 fill-current"
                      : "hover:text-yellow-500",
                  )}
                />
                <span className="font-bold text-[15px] inline-flex items-center justify-center min-w-4 tabular-nums">
                  {favoritesCount}
                </span>
              </button>
            )}

            <span
              title={visibilityLabel}
              aria-label={visibilityLabel}
              className="flex cursor-help items-center"
            >
              {recipe.isPublic ? (
                <Eye className="size-3.75" />
              ) : (
                <EyeClosed className="size-3.75" />
              )}
            </span>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-3"></div>
      </div>
    </article>
  );
}

export default RecipeCard;
