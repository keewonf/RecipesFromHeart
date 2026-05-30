import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Download } from "lucide-react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

import recipeImg from "../../assets/main-image.png";
import heartImg from "../../assets/heart.svg";
import bgImg from "../../assets/bg-image.jpg";

import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";
import { api } from "../../services/api";
import type { RecipeResponse, RecipeSummaryData } from "../../dtos/recipe";

type RecipePdfLocationState = RecipeSummaryData | null;
const SURFACE_LIGHT_COLOR = "#f0e8c2";

// Convert recipe titles into safe PDF file names
// Example: "Cake Recipe" -> "cake-recipe"
function slugifyFileName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

// Wait for the browser to finish rendering before html2canvas captures the page
function waitForNextFrame() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

async function ensureFontsReady() {
  if (typeof document !== "undefined" && "fonts" in document) {
    await document.fonts.ready;
  }
}

async function buildRecipePdf(container: HTMLDivElement, title: string) {
  await ensureFontsReady();
  await waitForNextFrame();

  const canvas = await html2canvas(container, {
    useCORS: true,
    backgroundColor: SURFACE_LIGHT_COLOR,
    scale: 2,
    scrollX: 0,
    scrollY: -window.scrollY, // Prevent scroll position from affecting the capture
  });

  const imageData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 3;
  const contentWidth = pageWidth - margin * 2;
  const contentHeight = pageHeight - margin * 2;
  const imageHeight = (canvas.height * contentWidth) / canvas.width;
  const totalPages = Math.max(1, Math.ceil(imageHeight / contentHeight));

  for (let pageIndex = 0; pageIndex < totalPages; pageIndex += 1) {
    if (pageIndex > 0) {
      pdf.addPage();
    }

    pdf.setFillColor(240, 232, 194);
    pdf.rect(0, 0, pageWidth, pageHeight, "F");

    pdf.addImage(
      imageData,
      "PNG",
      margin,
      margin - pageIndex * contentHeight,
      contentWidth,
      imageHeight,
      undefined,
      "FAST",
    );
  }

  const fileName = `receita-${slugifyFileName(title) || "receita"}.pdf`;
  pdf.save(fileName);
}

export function RecipePdf() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const locationState = location.state as RecipePdfLocationState;
  const initialRecipe: RecipePdfLocationState = locationState;

  const [recipe, setRecipe] = useState<RecipeSummaryData | null>(initialRecipe);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const recipeTemplateRef = useRef<HTMLDivElement>(null);
  const hasAutoDownloaded = useRef(false);

  useEffect(() => {
    if (recipe) {
      return;
    }

    if (!params.id) {
      navigate("/", { replace: true });
      return;
    }

    const controller = new AbortController();

    async function loadRecipe() {
      try {
        setIsLoading(true);
        const response = await api.get<RecipeResponse>(
          `/recipes/${params.id}`,
          {
            signal: controller.signal,
          },
        );

        setRecipe(response.data.recipe);
      } catch (error) {
        const err: any = error;
        if (err?.code === "ERR_CANCELED" || err?.name === "CanceledError") {
          return;
        }

        navigate("/", { replace: true });
      } finally {
        setIsLoading(false);
      }
    }

    void loadRecipe();

    return () => {
      controller.abort();
    };
  }, [navigate, params.id, recipe]);

  async function handleDownload() {
    if (!recipe || isDownloading || !recipeTemplateRef.current) {
      return;
    }

    try {
      setDownloadError(null);
      setIsDownloading(true);
      await buildRecipePdf(recipeTemplateRef.current, recipe.title);
    } catch {
      setDownloadError("Não foi possível gerar o PDF agora. Tente novamente.");
    } finally {
      setIsDownloading(false);
    }
  }

  useEffect(() => {
    if (!recipe || hasAutoDownloaded.current) {
      return;
    }

    hasAutoDownloaded.current = true; // autoDownload only in the first time
    void handleDownload();
  }, [recipe]);

  if (!recipe || isLoading) {
    return <Loading />;
  }

  const previewImageUrl = recipe.imageUrl ?? recipeImg;
  const ingredients = recipe.ingredients ?? [];
  const ownerName = recipe.user?.name ?? "Autor";
  const resumeText = recipe.resume?.trim() ?? "";
  const preparationText = recipe.preparationMethod?.trim() ?? "";

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-text-on-bg bg-cover bg-center px-4 py-6"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="flex w-full flex-col items-center">
        <div className="relative mt-6 mb-7 flex w-full max-w-4xl flex-col rounded-3xl bg-surface-light p-4 text-text-secondary shadow-[0_8px_30px_rgba(41,27,26,0.10)] md:p-6">
          <div data-html2canvas-ignore className="absolute top-4 right-4 z-10">
            <Button
              variant="icon"
              title="Baixar PDF"
              onClick={handleDownload}
              isLoading={isDownloading}
            >
              <Download />
            </Button>
          </div>

          {downloadError && (
            <p className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {downloadError}
            </p>
          )}

          <article
            ref={recipeTemplateRef}
            className="flex flex-col gap-6 rounded-2xl bg-surface-light"
          >
            <img
              crossOrigin="anonymous"
              className="mb-6 h-64 w-full rounded-2xl object-cover sm:h-80 md:h-100"
              src={previewImageUrl}
              alt="Pré-visualização da imagem da receita"
            />

            <main className="flex flex-col gap-6 p-0 md:p-6">
              <section id="about">
                <h1 className="mb-4 text-center text-2xl font-normal leading-[140%] text-text-primary md:text-[2.5rem]">
                  {recipe.title}
                </h1>
                <p className="whitespace-pre-wrap wrap-break-word text-sm leading-7 text-text-secondary md:text-base">
                  {resumeText}
                  <br />
                  <br />
                  Tempo: {recipe.preparationTime} minuto(s)
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

                <p className="whitespace-pre-wrap wrap-break-word text-sm leading-7 md:text-base">
                  {preparationText}
                </p>
              </section>
            </main>
          </article>
        </div>

        <footer className="mb-12 flex items-center justify-center gap-0.5 text-[1rem] font-normal leading-[150%] text-text-on-bg md:mb-12">
          <span>Feito com</span>
          <img
            src={heartImg}
            alt="Heart Icon"
            className="mx-1 h-3 w-3.5 shrink-0"
          />
          <span>
            por <span className="font-normal">{ownerName}</span>
          </span>
        </footer>
      </div>
    </div>
  );
}
