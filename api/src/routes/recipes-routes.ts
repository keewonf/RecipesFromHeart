import { Router } from "express";
import { RecipesController } from "@/controllers/recipes-controller";

const recipesRoutes = Router();
const recipesController = new RecipesController();

recipesRoutes.post("/", recipesController.create);
recipesRoutes.patch("/:id", recipesController.update);
recipesRoutes.delete("/:id", recipesController.delete);

export { recipesRoutes };
