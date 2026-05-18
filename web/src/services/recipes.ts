export async function fetchRecipes(_opts: {
  type: string;
  page?: number;
  filters?: any;
}) {
  // Stub: return empty list for layout/design
  return { data: [] as any[], total: 0 };
}

export async function toggleFavorite(_id: string) {
  // Stub: no-op
  return { ok: true };
}

export const recipesService = { fetchRecipes, toggleFavorite };

export default recipesService;
