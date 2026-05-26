import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import { AxiosError } from "axios";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Loading } from "../../components/Loading";
import { RecipeImageInput } from "../../components/recipes/RecipeImageInput";
import { api } from "../../services/api";
import type {
  CreateRecipeResponse,
  RecipeResponse,
  RecipeSummaryData,
  UploadAPIResponse,
} from "../../dtos/recipe";

export const ingredientSchema = z.object({
  quantity: z
    .string()
    .trim()
    .min(1, "Informe a quantidade")
    .max(50, "Quantidade muito longa"),
  unit: z.string().trim().max(30, "Unidade muito longa").optional(),
  name: z.string().trim().min(1, "Informe o ingrediente"),
  note: z.string().trim().max(120, "Observação muito longa").optional(),
});

export const recipeFormFieldsSchema = z.object({
  title: z.string().trim().min(5, "Bote um título descritivo"),
  resume: z.string().trim().min(5, "Adicione um resumo para sua receita"),
  preparationTime: z.coerce
    .number()
    .int()
    .positive("Selecione um número válido"),
  portions: z.coerce.number().int().positive("Selecione um número válido"),
  image: z.instanceof(File).nullable(),
  ingredients: z
    .array(ingredientSchema)
    .min(1, "Adicione pelo menos um ingrediente"),
  preparationMethod: z
    .string()
    .trim()
    .min(10, "Defina um método de preparo detalhado!"),
});

type FormInput = z.input<typeof recipeFormFieldsSchema>;
type FormOutput = z.output<typeof recipeFormFieldsSchema>;

function normalizeNumberInputValue(value: unknown): string | number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    return value;
  }

  return "";
}

function mapRecipeToFormValues(recipe: RecipeSummaryData): FormInput {
  return {
    title: recipe.title,
    resume: recipe.resume,
    preparationTime: recipe.preparationTime,
    portions: recipe.portions,
    image: null,
    preparationMethod: recipe.preparationMethod,
    ingredients: recipe.ingredients.map((ingredient) => ({
      quantity: ingredient.quantity,
      unit: ingredient.unit ?? "",
      name: ingredient.name,
      note: ingredient.note ?? "",
    })),
  };
}

export function CreateRecipe() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const isEditing = Boolean(params.id);

  const initialRecipe = location.state as RecipeSummaryData | null;
  const [editingRecipe, setEditingRecipe] = useState<RecipeSummaryData | null>(
    initialRecipe,
  );
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(
    isEditing && !initialRecipe,
  );

  const recipeSchema = useMemo(() => {
    return recipeFormFieldsSchema.superRefine((data, context) => {
      if (!isEditing && !data.image) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["image"],
          message: "Selecione uma imagem da receita",
        });
      }
    });
  }, [isEditing]);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: "",
      resume: "",
      preparationTime: "",
      portions: "",
      image: null,
      preparationMethod: "",
      ingredients: [
        {
          quantity: "",
          unit: "",
          name: "",
          note: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  useEffect(() => {
    if (!isEditing || !params.id) {
      return;
    }

    if (editingRecipe) {
      reset(mapRecipeToFormValues(editingRecipe));
      setIsLoadingRecipe(false);
      return;
    }

    let isMounted = true;

    async function loadRecipe() {
      setIsLoadingRecipe(true);

      try {
        const response = await api.get<RecipeResponse>(`/recipes/${params.id}`);

        if (!isMounted) {
          return;
        }

        setEditingRecipe(response.data.recipe);
        reset(mapRecipeToFormValues(response.data.recipe));
      } catch (error) {
        if (!isMounted) {
          return;
        }

        if (error instanceof AxiosError) {
          const message =
            error.response?.data?.message ?? "Erro de conexão com o servidor";
          setError("root", {
            message,
          });
        } else {
          setError("root", {
            message: "Erro inesperado. Tente novamente",
          });
        }

        navigate("/recipes/me", { replace: true });
      } finally {
        if (isMounted) {
          setIsLoadingRecipe(false);
        }
      }
    }

    void loadRecipe();

    return () => {
      isMounted = false;
    };
  }, [editingRecipe, isEditing, navigate, params.id, reset, setError]);

  async function onSubmit(data: FormOutput) {
    try {
      let imageUrl = editingRecipe?.imageUrl ?? null;
      let imageKey = editingRecipe?.imageKey ?? null;

      if (data.image) {
        const imageUploadForm = new FormData();
        imageUploadForm.append("file", data.image);

        const response = await api.post<UploadAPIResponse>(
          "/uploads/recipes",
          imageUploadForm,
        );

        imageUrl = response.data.imageUrl;
        imageKey = response.data.imageKey;
      }

      if (!isEditing && !imageUrl) {
        setError("image", {
          message: "Selecione uma imagem da receita",
        });
        return;
      }

      const { image, ...recipeData } = data;
      const payload = {
        ...recipeData,
        imageUrl,
        imageKey,
      };

      const response =
        isEditing && params.id
          ? await api.patch<CreateRecipeResponse>(
              `/recipes/${params.id}`,
              payload,
            )
          : await api.post<CreateRecipeResponse>("/recipes", payload);

      navigate("/recipes/preview", {
        state: {
          recipe: response.data.recipe,
          showEditButton: true,
        },
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message ?? "Erro de conexão com o servidor";
        setError("root", {
          message,
        });
        return;
      }

      setError("root", {
        message: "Erro inesperado. Tente novamente",
      });
    }
  }

  function handleCancel() {
    const confirmMessage = isEditing
      ? "Deseja realmente cancelar a edição da receita?"
      : "Deseja realmente cancelar a criação da receita?";

    if (confirm(confirmMessage)) {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/recipes/me");
      }
    }
  }

  if (isLoadingRecipe) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-3xl bg-surface-light p-6 shadow-[0_2px_12px_rgba(41,27,26,0.12)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">
              {isEditing ? "Editar receita" : "Nova receita"}
            </h1>
            <p className="mt-2 text-xl text-text-primary">
              {isEditing
                ? "Revise os dados da sua receita e salve as alterações"
                : "Insira os dados da sua receita"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleCancel}
            className="cursor-pointer text-xl font-bold text-text-primary/80 transition-colors duration-150 hover:text-text-primary"
          >
            Voltar
          </button>
        </div>

        <form
          className="flex flex-col gap-5 text-xl font-bold text-text-primary"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <Input
                legend="Título"
                required
                placeholder="Título da receita"
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="resume"
            render={({ field }) => (
              <Input
                legend="Resumo"
                required
                placeholder="Fale um pouco sobre sua receita"
                {...field}
              />
            )}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Controller
              control={control}
              name="preparationTime"
              render={({ field }) => (
                <Input
                  legend="Tempo de preparo"
                  required
                  type="number"
                  placeholder="0"
                  {...field}
                  value={normalizeNumberInputValue(field.value)}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              )}
            />

            <Controller
              control={control}
              name="portions"
              render={({ field }) => (
                <Input
                  legend="Porções"
                  required
                  type="number"
                  placeholder="0"
                  {...field}
                  value={normalizeNumberInputValue(field.value)}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              )}
            />
          </div>

          <Controller
            control={control}
            name="image"
            render={({ field, fieldState }) => (
              <RecipeImageInput
                file={field.value}
                previewUrl={editingRecipe?.imageUrl ?? null}
                error={fieldState.error?.message}
                onChange={field.onChange}
                name={field.name}
                onBlur={field.onBlur}
                ref={field.ref}
              />
            )}
          />

          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-text-primary">
                  Ingredientes
                </h2>
                <p className="text-sm text-text-primary">
                  Adicione os ingredientes em blocos separados.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  append({ quantity: "", unit: "", name: "", note: "" })
                }
                className="cursor-pointer rounded-3xl border border-surface-dark bg-surface-light-dark px-4 py-2 text-sm font-semibold text-surface-dark transition-colors duration-200 hover:bg-surface-dark hover:text-white"
              >
                Adicionar ingrediente
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {fields.map((field, index) => (
                <article
                  key={field.id}
                  className="rounded-3xl border border-stone-300 bg-white p-4 shadow-[0_1px_8px_rgba(41,27,26,0.06)]"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-text-primary">
                      Ingrediente {index + 1}
                    </h3>

                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="cursor-pointer text-sm font-semibold text-red-600 transition-colors duration-200 hover:text-red-700"
                      >
                        Remover
                      </button>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Controller
                      control={control}
                      name={`ingredients.${index}.quantity`}
                      render={({ field }) => (
                        <Input
                          legend="Quantidade"
                          placeholder="1/2"
                          {...field}
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name={`ingredients.${index}.unit`}
                      render={({ field }) => (
                        <Input
                          legend="Unidade"
                          placeholder="pote, colher, xícara"
                          {...field}
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name={`ingredients.${index}.name`}
                      render={({ field }) => (
                        <Input
                          legend="Ingrediente"
                          required
                          placeholder="Manteiga"
                          {...field}
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name={`ingredients.${index}.note`}
                      render={({ field }) => (
                        <Input
                          legend="Observação"
                          placeholder="Em temperatura ambiente"
                          {...field}
                        />
                      )}
                    />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <Controller
            control={control}
            name="preparationMethod"
            render={({ field }) => (
              <fieldset className="flex flex-1 flex-col text-surface-dark">
                <legend className="mb-2 uppercase text-xxs text-text-primary">
                  Método de preparo
                </legend>
                <textarea
                  {...field}
                  placeholder="Explique o método de preparo"
                  className="min-h-40 rounded-3xl border border-gray-300 bg-white px-4 py-3.5 text-sm font-bold text-gray-600 outline-none placeholder:uppercase placeholder:text-gray-600/90 focus:border-2 focus:border-surface-dark"
                />
              </fieldset>
            )}
          />

          <p className="min-h-5 text-sm font-medium text-red-600">
            {errors.root?.message}
          </p>

          <div className="flex justify-end">
            <Button type="submit" isLoading={isSubmitting}>
              {isEditing ? "Salvar alterações" : "Salvar receita"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
