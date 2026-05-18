type UseRecipesParams = {
  type: "mine" | "community" | "favorites";
  page?: number;
  filters?: any;
};

type UseRecipesResult = {
  recipes: any[];
  loading: boolean;
  error: null;
  loadMore: () => void;
};

export function useRecipes(_params: UseRecipesParams): UseRecipesResult {
  // Design-only stub: returns placeholders so pages/components can render layout
  return {
    recipes: [
      {
        id: "demo-1",
        title: "Cupcake de limão",
        time: "1h10",
        servings: 12,
        rating: "4.8",
      },
      {
        id: "demo-2",
        title: "Cupcake de limão",
        time: "1h10",
        servings: 12,
        rating: "4.8",
      },
      {
        id: "demo-3",
        title: "Cupcake de limão",
        time: "1h10",
        servings: 12,
        rating: "4.8",
      },
      {
        id: "demo-4",
        title: "Cupcake de limão",
        time: "1h10",
        servings: 12,
        rating: "4.8",
      },
      {
        id: "demo-5",
        title: "Cupcake de limão",
        time: "1h10",
        servings: 12,
        rating: "4.8",
      },
    ],
    loading: false,
    error: null,
    loadMore: () => {},
  };
}

export default useRecipes;
