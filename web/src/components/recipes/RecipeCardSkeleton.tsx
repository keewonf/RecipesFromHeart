export function RecipeCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-surface-light p-3 shadow-[0_2px_12px_rgba(41,27,26,0.08)] md:rounded-3xl md:p-2.5">
      <div className="animate-pulse">
        <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-text-secondary/10">
          <div
            className="absolute inset-0 animate-[shimmer_1.6s_infinite]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
            }}
          />
        </div>

        <div className="p-3 md:p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="h-5 w-3/4 rounded-full bg-text-secondary/10 md:h-6" />
            <div className="h-4 w-16 shrink-0 rounded-full bg-text-secondary/10 md:h-5" />
          </div>

          <div className="mt-2 h-4 w-28 rounded-full bg-text-secondary/10" />

          <div className="mt-3 flex items-center justify-between gap-3 text-sm font-bold">
            <div className="h-4 w-24 rounded-full bg-text-secondary/10" />

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="size-3.75 rounded-full bg-text-secondary/10" />
                <div className="h-4 w-5 rounded-full bg-text-secondary/10" />
              </div>

              <div className="flex items-center gap-1">
                <div className="size-3.75 rounded-full bg-text-secondary/10" />
                <div className="h-4 w-5 rounded-full bg-text-secondary/10" />
              </div>

              <div className="size-3.75 rounded-full bg-text-secondary/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCardSkeleton;
