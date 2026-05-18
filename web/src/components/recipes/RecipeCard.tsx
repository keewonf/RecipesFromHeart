type RecipeCardProps = {
  recipe: any;
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className="w-full bg-surface-light rounded-lg overflow-hidden shadow-[0_2px_12px_rgba(41,27,26,0.12)] p-3">
      <div className="h-36 bg-gray-100 flex items-center justify-center">
        {/* Placeholder imagem */}
        <span className="text-sm ">Imagem</span>
      </div>
      <div className="p-3">
        <h3 className="font-bold text-lg text-text-secondary">
          {recipe?.title ?? "Título"}
        </h3>
        <p className="text-sm text-text-secondary font-bold">
          Tempo: {recipe?.time ?? "--"}
        </p>
        <div className="mt-2 flex items-center justify-between text-text-secondary font-bold">
          <div className="text-sm ">{recipe?.servings ?? "--"} porções</div>
          <div className="text-sm text-yellow-500">{recipe?.rating ?? "—"}</div>
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;
