export type RecipeIngredientData = {
  id?: string;
  name: string;
  quantity: string;
  unit?: string;
  note?: string;
  position?: number;
};

export type CreateRecipeFormIngredientData = {
  quantity: string;
  unit?: string;
  name: string;
  note?: string;
};

export type CreateRecipeFormData = {
  title: string;
  resume: string;
  preparationTime: number;
  portions: number;
  image: File | null;
  ingredients: CreateRecipeFormIngredientData[];
  preparationMethod: string;
};

export type RecipeSummaryData = {
  id: string;
  title: string;
  resume: string;
  preparationTime: number;
  portions: number;
  preparationMethod: string;
  isPublic: boolean;
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

export type CreateRecipeResponse = {
  recipe: RecipeSummaryData;
};

export type RecipeResponse = {
  recipe: RecipeSummaryData;
};

export type RecipesListResponse = {
  recipes: RecipeSummaryData[];
  pagination: {
    page: number;
    perPage: number;
    totalRecords: number;
    totalPages: number;
  };
};

export type IngredientData = RecipeIngredientData;

export type CreateRecipeData = RecipeSummaryData;

export type UploadAPIResponse = {
  originalFilename: string;
  imageUrl: string;
  imageKey: string;
};
