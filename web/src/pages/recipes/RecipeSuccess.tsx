import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Download } from "lucide-react";

import recipeImg from "../../assets/main-image.png";
import bgImg from "../../assets/bg-image.jpg";
import { Button } from "../../components/Button";
import type { RecipeSummaryData } from "../../dtos/recipe";

type RecipeSuccessLocationState = RecipeSummaryData | null;

export function RecipeSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state as RecipeSuccessLocationState;

  useEffect(() => {
    if (!recipe) {
      navigate("/recipes/me", { replace: true });
    }
  }, [navigate, recipe]);

  const previewImageUrl = recipe?.imageUrl ?? recipeImg;

  function handleDownloadHtml() {
    console.log("cliquei aqui");
  }

  if (!recipe) {
    return null;
  }

  return (
    <div
      className="flex flex-col justify-center items-center m-0 bg-text-on-bg bg-cover"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="w-200 p-6 bg-surface-light rounded-3xl flex flex-col mt-12 mb-7 text-text-secondary">
        <div className="mb-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text-primary/60">
            Receita criada com sucesso
          </p>
          <h1 className="mt-2 leading-[140%] text-[2.5rem] text-text-primary font-normal">
            {recipe.title}
          </h1>
        </div>

        <div className="mb-4 flex items-center justify-end">
          <Button variant="icon" onClick={handleDownloadHtml}>
            <Download />
          </Button>
        </div>

        <img
          className="object-contain w-full h-100 rounded-2xl mb-6"
          src={previewImageUrl}
          alt="Pré-visualização da imagem da receita"
        />

        <main className="flex flex-col p-6 gap-6">
          <section id="about">
            <p>
              {recipe.resume}
              <br />
              <br />
              Tempo: {recipe.preparationTime}
              <br />
              Rendimento: {recipe.portions}
            </p>
          </section>

          <section id="ingredients">
            <h2 className="text-text-primary font-normal leading-[150%] mb-1 text-2xl">
              Ingredientes
            </h2>
            <ul className="list-inside pl-[0.6em] list-disc">
              {recipe.ingredients.map((ingredient) => (
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
            <h2 className="text-text-primary font-normal mb-1 text-2xl">
              Modo de preparo
            </h2>

            <p>{recipe.preparationMethod}</p>
          </section>
        </main>
      </div>
    </div>
  );
}
