export type IngredientData = {
  quantity?: string;
  unit?: string;
  name: string;
  note?: string;
};

export type CreateRecipeData = {
  title: string;
  resume: string;
  preparationTime: number;
  portions: number;
  ingredients: IngredientData[];
  preparationMethod: string;
};
