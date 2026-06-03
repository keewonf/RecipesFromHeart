// Data received from API

// Ingredient structure returned by the API and used in recipe details
export type RecipeIngredientData = {
  id?: string;
  name: string;
  quantity: string;
  unit?: string;
  note?: string;
  position?: number;
};

// Complete recipe data used across recipe pages, cards and previews
export type RecipeSummaryData = {
  id: string;
  title: string;
  resume: string;
  preparationTime: number;
  portions: number;
  preparationMethod: string;
  isPublic: boolean;
  likesCount: number;
  favoritesCount: number;
  likedByCurrentUser: boolean;
  favoritedByCurrentUser: boolean;
  userId?: string;
  user?: {
    id: string;
    name: string;
    profileImageUrl: string | null;
  };
  imageUrl: string | null;
  imageKey: string | null;
  ingredients: RecipeIngredientData[];
  createdAt: string;
  updatedAt?: string;
};

// Generic single recipe response returned by the API
export type RecipeResponse = {
  recipe: RecipeSummaryData;
};

// Paginated recipes list returned by community/me endpoints
export type RecipesListResponse = {
  recipes: RecipeSummaryData[];
  pagination: {
    page: number;
    perPage: number;
    totalRecords: number;
    totalPages: number;
  };
};

// API response returned after creating a recipe
export type CreateRecipeResponse = {
  recipe: RecipeSummaryData;
};

// Upload response returned after sending an image to the API
export type UploadAPIResponse = {
  originalFilename: string;
  imageUrl: string;
  imageKey: string;
};

// ======================================================
// Form and payload data sent to API
// ======================================================

// Ingredient shape used only while creating/editing a recipe form
// (does not require API-generated fields like id or position)
export type CreateRecipeFormIngredientData = {
  quantity: string;
  unit?: string;
  name: string;
  note?: string;
};

// Main form data used by react-hook-form when creating recipes
export type CreateRecipeFormData = {
  title: string;
  resume: string;
  preparationTime: number;
  portions: number;
  image: File | null;
  ingredients: CreateRecipeFormIngredientData[];
  preparationMethod: string;
};
