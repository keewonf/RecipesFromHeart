import { useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import { Download } from "lucide-react";

import recipeImg from "../../assets/main-image.png";
import bgImg from "../../assets/bg-image.jpg";
import { Button } from "../../components/Button";

type RecipePreviewState = {
  title: string;
  resume: string;
  preparationTime: number;
  portions: number;
  image: File | null;
  ingredients: Array<{
    quantity?: string;
    unit?: string;
    name: string;
    note?: string;
  }>;
  preparationMethod: string;
};

type RecipePreviewLocationState = Partial<RecipePreviewState> & {
  image?: File | null;
};

const recipeExample: RecipePreviewState = {
  title: "Cupcake de café com chantilly",
  resume:
    "O bolinho perfeito para acompanhar o café de todos os dias. É muito fácil e ainda por cima fica maravilhoso, com certeza vai impressionar. Faz e depois me conta o que achou!",
  preparationTime: 10,
  portions: 2,
  image: null,
  ingredients: [
    {
      quantity: "20",
      unit: "2",
      name: "Manteiga",
      note: "No ponto",
    },
    {
      quantity: "20",
      unit: "2",
      name: "Alho",
      note: "No ponto",
    },
    {
      quantity: "15",
      unit: "1",
      name: "Chucrute",
      note: "Medida certa",
    },
  ],
  preparationMethod:
    "No liquidificador, bata a água, o café solúvel, os ovos, o óleo, o açúcar e o chocolate em pó até ficar homogêneo. Transfira para uma tigela, adicione a farinha e o fermento e misture com uma colher. Despeje em forminhas para cupcakes forradas com forminhas de papel ",
};

export function RecipePreview() {
  const location = useLocation();
  const recipe = {
    ...recipeExample,
    ...(location.state as RecipePreviewLocationState | null),
  };

  const previewImageUrl = useMemo(() => {
    if (!recipe.image) {
      return recipeImg;
    }

    return URL.createObjectURL(recipe.image);
  }, [recipe.image]);

  useEffect(() => {
    if (!recipe.image) {
      return;
    }

    return () => {
      URL.revokeObjectURL(previewImageUrl);
    };
  }, [previewImageUrl, recipe.image]);

  function handleDownloadHtml() {
    console.log("cliquei aqui");
  }

  return (
    <div
      className="flex flex-col justify-center items-center m-0 bg-text-on-bg bg-cover"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="w-200 p-6 bg-surface-light rounded-3xl flex flex-col mt-12 mb-7 text-text-secondary">
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
            <h1 className="leading-[140%] text-[2.5rem] text-text-primary font-normal">
              {recipe.title}
            </h1>
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
              <li>1 e 1/2 xícara (chá) de água morna</li>
              {recipe.ingredients.map((ingredient) => (
                <li
                  key={`${ingredient.name}-${ingredient.quantity}-${ingredient.unit}`}
                >
                  {ingredient.quantity} e {ingredient.unit} de {ingredient.name}{" "}
                  / {ingredient.note}
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
