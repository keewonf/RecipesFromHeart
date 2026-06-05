import { useEffect, useState } from "react";
import axios from "axios";

import { api } from "../services/api";
import type { RecipeSummaryData, RecipesListResponse } from "../dtos/recipe";

type UseRecipesParams = {
  type: "mine" | "community" | "favorites";
  search?: string;
  perPage?: number;
};

type UseRecipesResult = {
  recipes: RecipeSummaryData[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  pagination: RecipesListResponse["pagination"];
  currentPage: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
};

const DEFAULT_PER_PAGE = 10;

export function useRecipes({
  type,
  search,
  perPage = DEFAULT_PER_PAGE,
}: UseRecipesParams): UseRecipesResult {
  const [recipes, setRecipes] = useState<RecipeSummaryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<
    RecipesListResponse["pagination"]
  >({
    page: 1,
    perPage,
    totalRecords: 0,
    totalPages: 1,
  });

  async function fetchRecipes(page = currentPage) {
    try {
      setLoading(true);
      setError(null);

      let endpoint = "/public/recipes";

      if (type === "mine") {
        endpoint = "/users/me/recipes";
      } else if (type === "favorites") {
        endpoint = "/users/me/favorites";
      }

      const response = await api.get<RecipesListResponse>(endpoint, {
        params: {
          page,
          perPage,
          name: search,
        },
      });

      setRecipes(response.data.recipes);
      setPagination(response.data.pagination);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message ?? "Erro ao buscar receitas.");
      } else {
        setError("Erro ao buscar receitas.");
      }
    } finally {
      setLoading(false);
    }
  }

  // Reset pagination when changing recipe source/type
  useEffect(() => {
    setCurrentPage(1);
  }, [type, search]);

  // Refetch recipes whenever filters or pagination change
  useEffect(() => {
    fetchRecipes();
  }, [type, currentPage, perPage, search]);

  function goToNextPage() {
    setCurrentPage((prev) => Math.min(prev + 1, pagination.totalPages));
  }

  function goToPreviousPage() {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }

  return {
    recipes,
    loading,
    error,
    refetch: fetchRecipes,
    pagination,
    currentPage,
    goToNextPage,
    goToPreviousPage,
  };
}

export default useRecipes;
