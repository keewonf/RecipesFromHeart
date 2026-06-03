import { Router } from "express";
import { RecipesController } from "@/controllers/recipes-controller";
import { LikesController } from "@/controllers/likes-controller";
import { FavoritesController } from "../controllers/favorites-controller";

const recipesRoutes = Router();
const recipesController = new RecipesController();
const likesController = new LikesController();
const favoritesController = new FavoritesController();

recipesRoutes.post("/", recipesController.create);
recipesRoutes.patch("/:id", recipesController.update);
recipesRoutes.delete("/:id", recipesController.delete);

//Likes
recipesRoutes.post("/:id/likes", likesController.create);
recipesRoutes.delete("/:id/likes", likesController.delete);

//Favorites
recipesRoutes.post("/:id/favorites", favoritesController.create);
recipesRoutes.delete("/:id/favorites", favoritesController.delete);

export { recipesRoutes };
