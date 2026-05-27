export function Home() {
  return (
    <div className="p-4 md:p-6">
      <div className="rounded-2xl bg-surface-light p-6 shadow-[0_8px_30px_rgba(41,27,26,0.10)] md:rounded-3xl md:p-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-surface-dark md:text-sm">
          Recipes From Heart
        </p>
        <h1 className="text-2xl font-bold text-text-primary md:text-3xl">
          Bem-vindo
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary md:text-lg md:leading-8">
          Resuminho que vou botar
        </p>
      </div>
    </div>
  );
}
