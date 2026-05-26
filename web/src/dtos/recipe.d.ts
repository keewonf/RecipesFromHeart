export type IngredientData = {
  id?: string;
  name: string;
  quantity?: string;
  unit?: string;
  note?: string;
  position?: number;
};

export type CreateRecipeData = {
  id: string;
  title: string;
  resume: string;
  preparationTime: number;
  portions: number;
  preparationMethod: string;
  isPublic: boolean;
  imageUrl: string | null;
  ingredients: IngredientData[];
};
