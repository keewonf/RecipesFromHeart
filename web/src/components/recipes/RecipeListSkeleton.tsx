import { RecipeCardSkeleton } from "./RecipeCardSkeleton";

type RecipeListSkeletonProps = {
  count?: number;
};

export function RecipeListSkeleton({ count = 6 }: RecipeListSkeletonProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <RecipeCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default RecipeListSkeleton;
