import { useEffect, useState } from "react";

type Props = Omit<
  React.ComponentProps<"input">,
  "type" | "accept" | "onChange"
> & {
  legend?: string;
  file?: File | null;
  error?: string;
  onChange: (file: File | null) => void;
};

export function RecipeImageInput({
  legend = "Imagem da receita",
  file = null,
  error,
  onChange,
  id = "recipe-image",
  ...rest
}: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return (
    <fieldset className="flex flex-col text-surface-dark">
      <legend className="uppercase text-xxs mb-2 text-text-primary">
        {legend}
      </legend>

      <input
        id={id}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const selectedFile = event.target.files?.[0] ?? null;
          onChange(selectedFile);
        }}
        {...rest}
      />

      <label
        htmlFor={id}
        className="group flex min-h-64 cursor-pointer flex-col overflow-hidden rounded-3xl border border-dashed border-gray-300 bg-white shadow-[0_1px_8px_rgba(41,27,26,0.06)] transition-colors duration-200 hover:border-surface-dark"
      >
        <div className="flex flex-1 items-center justify-center bg-surface-light-dark/40">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Pré-visualização da imagem da receita"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 px-6 py-8 text-center text-text-primary/70">
              <span className="text-sm font-bold uppercase tracking-wide">
                Escolha uma imagem
              </span>
              <span className="text-sm font-medium text-text-primary/60">
                A foto da receita vai aparecer aqui.
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-gray-200 px-4 py-3 text-sm text-text-primary">
          <span className="font-semibold">
            {file ? "Imagem selecionada" : "Nenhuma imagem selecionada"}
          </span>
          <span className="rounded-full bg-surface-light-dark px-3 py-1 text-xs font-bold uppercase tracking-wide text-surface-dark transition-colors duration-200 group-hover:bg-surface-dark group-hover:text-white">
            {file ? "Trocar" : "Selecionar"}
          </span>
        </div>
      </label>

      <span className="block min-h-4.5 text-xs text-red-500">{error}</span>
    </fieldset>
  );
}
