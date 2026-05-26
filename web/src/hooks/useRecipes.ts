import { useEffect, useState } from "react";

import { api } from "../services/api";
import type { CreateRecipeData } from "../dtos/recipe";

type UseRecipesParams = {
  type: "mine" | "community" | "favorites";
  page?: number;
  filters?: any;
};

type UseRecipesResult = {
  recipes: any[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function useRecipes({ type }: UseRecipesParams): UseRecipesResult {
  const [recipes, setRecipes] = useState<CreateRecipeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchRecipes() {
    try {
      setLoading(true);
      setError(null);

      let endpoint = "/recipes";

      if (type === "mine") {
        endpoint = "/recipes/me";
      }

      if (type === "favorites") {
        endpoint = "/favorites";
      }

      const response = await api.get(endpoint);

      setRecipes(response.data.recipes);
    } catch (error) {
      setError("Erro ao buscar receitas.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecipes()
  }, [type])

  return {
    recipes,
    loading,
    error,
    refetch: fetchRecipes,
  }
}

export default useRecipes;
