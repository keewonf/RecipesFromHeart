import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Download } from "lucide-react";

import recipeImg from "../../assets/main-image.png";
import bgImg from "../../assets/bg-image.jpg";
import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";
import { api } from "../../services/api";
import type { RecipeResponse, RecipeSummaryData } from "../../dtos/recipe";

type RecipeSuccessLocationState =
  | RecipeSummaryData
  | {
      recipe: RecipeSummaryData;
      showEditButton?: boolean;
    }
  | null;

export function RecipeSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const locationState = location.state as RecipeSuccessLocationState;
  const initialRecipe =
    locationState && "recipe" in locationState
      ? locationState.recipe
      : locationState;
  const showEditButton = Boolean(
    locationState && "recipe" in locationState && locationState.showEditButton,
  );
  const [recipe, setRecipe] = useState<RecipeSummaryData | null>(initialRecipe);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const currentRecipe = recipe;

    if (!currentRecipe) {
      navigate("/recipes/me", { replace: true });
      return;
    }

    if (currentRecipe.ingredients !== undefined) {
      return;
    }

    const recipeId = currentRecipe.id;
    const controller = new AbortController();

    async function loadRecipe() {
      try {
        setIsLoading(true);
        const response = await api.get<RecipeResponse>(`/recipes/${recipeId}`, {
          signal: controller.signal,
        });

        setRecipe(response.data.recipe);
      } catch (error) {
        const err: any = error;
        if (err?.code === "ERR_CANCELED" || err?.name === "CanceledError") {
          return;
        }

        navigate("/recipes/me", { replace: true });
      } finally {
        setIsLoading(false);
      }
    }

    void loadRecipe();

    return () => {
      controller.abort();
    };
  }, [navigate, recipe]);

  const previewImageUrl = recipe?.imageUrl ?? recipeImg;
  const ingredients = recipe?.ingredients ?? [];

  function handleDownloadHtml() {
    console.log("cliquei aqui");
  }

  if (!recipe || isLoading || recipe.ingredients === undefined) {
    return <Loading />;
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-text-on-bg bg-cover bg-center px-4 py-6"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="relative mt-6 mb-7 flex w-full max-w-4xl flex-col rounded-3xl bg-surface-light p-4 text-text-secondary shadow-[0_8px_30px_rgba(41,27,26,0.10)] md:p-6">
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="icon"
            title="Baixar receita"
            onClick={handleDownloadHtml}
          >
            <Download />
          </Button>
        </div>

        <img
          className="mb-6 h-64 w-full rounded-2xl object-cover sm:h-80 md:h-100"
          src={previewImageUrl}
          alt="Pré-visualização da imagem da receita"
        />

        <main className="flex flex-col gap-6 p-0 md:p-6">
          <section id="about">
            {showEditButton && (
              <p className="mb-2 text-center text-sm font-semibold uppercase tracking-[0.2em] text-text-primary/60">
                Receita criada com sucesso
              </p>
            )}
            <h1 className="mb-4 text-center text-2xl font-normal leading-[140%] text-text-primary md:text-[2.5rem]">
              {recipe.title}
            </h1>
            {showEditButton && (
              <div className="mb-4 flex justify-center sm:justify-end">
                <Button
                  className="w-full px-4 text-sm sm:w-auto"
                  onClick={() =>
                    navigate(`/recipes/edit/${recipe.id}`, { state: recipe })
                  }
                >
                  Editar receita
                </Button>
              </div>
            )}
            <p className="text-sm leading-7 text-text-secondary md:text-base">
              {recipe.resume}
              <br />
              <br />
              Tempo: {recipe.preparationTime}
              <br />
              Rendimento: {recipe.portions}
            </p>
          </section>

          <section id="ingredients">
            <h2 className="mb-1 text-xl font-normal leading-[150%] text-text-primary md:text-2xl">
              Ingredientes
            </h2>
            <ul className="list-inside list-disc pl-[0.6em] text-sm leading-7 md:text-base">
              {ingredients.map((ingredient) => (
                <li
                  key={`${ingredient.name}-${ingredient.quantity}-${ingredient.unit}`}
                >
                  {ingredient.quantity}
                  {ingredient.unit ? ` ${ingredient.unit}` : ""} de{" "}
                  {ingredient.name}
                  {ingredient.note ? ` / ${ingredient.note}` : ""}
                </li>
              ))}
            </ul>
          </section>

          <section id="preparation">
            <h2 className="mb-1 text-xl font-normal text-text-primary md:text-2xl">
              Modo de preparo
            </h2>

            <p className="text-sm leading-7 md:text-base">
              {recipe.preparationMethod}
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
