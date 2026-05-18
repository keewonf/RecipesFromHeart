import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import type { CreateRecipeData, IngredientData } from "../../dtos/recipe";

export const ingredientSchema = z.object({
  quantity: z.string().trim().max(50, "Quantidade muito longa").optional(),
  unit: z.string().trim().max(30, "Unidade muito longa").optional(),
  name: z.string().trim().min(1, "Informe o ingrediente"),
  note: z.string().trim().max(120, "Observação muito longa").optional(),
});

export const createRecipeSchema = z.object({
  title: z.string().trim().min(10, "Bote um título descritivo"),
  resume: z.string().trim().min(1, "Adicione um resumo para sua receita"),
  preparationTime: z.coerce.number().positive("Selecione um número válido"),
  portions: z.coerce.number().positive("Selecione um número válido"),
  ingredients: z
    .array(ingredientSchema)
    .min(1, "Adicione pelo menos um ingrediente"),
  preparationMethod: z
    .string()
    .trim()
    .min(10, "Defina um método de preparo detalhado!"),
});

type FormInput = z.input<typeof createRecipeSchema>;
type FormOutput = z.output<typeof createRecipeSchema>;

export type { CreateRecipeData, IngredientData };

function normalizeNumberInputValue(value: unknown): string | number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    return value;
  }

  return "";
}

export function CreateRecipe() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      title: "",
      resume: "",
      preparationTime: "",
      portions: "",
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

  const navigate = useNavigate();

  function handleCancel() {
    if (confirm("Deseja realmente cancelar a criação da receita?")) {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/recipes");
      }
    }
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  function onSubmit(data: FormOutput) {
    console.log(data);
  }

  return (
    <div className="p-4">
      <main className="mx-auto flex w-full max-w-4xl  flex-col gap-6 rounded-3xl bg-surface-light p-6 shadow-[0_2px_12px_rgba(41,27,26,0.12)]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">
              Nova receita
            </h1>
            <p className="mt-2 text-xl text-text-primary">
              Insira os dados da sua receita
            </p>
          </div>

          <button
            type="button"
            onClick={handleCancel}
            className="text-xl text-text-primary/80 hover:text-text-primary transition-colors duration-150 cursor-pointer
            font-bold"
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
                className="cursor-pointer rounded-3xl border border-surface-dark px-4 py-2 text-sm font-semibold text-surface-dark transition-colors duration-200 bg-surface-light-dark hover:bg-surface-dark hover:text-white"
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

          <div className="flex justify-end">
            <Button type="submit" isLoading={isSubmitting}>
              Salvar receita
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
