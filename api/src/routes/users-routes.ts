import { Router } from "express";
import { UsersController } from "@/controllers/users-controller";
import { RecipesController } from "@/controllers/recipes-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const usersRoutes = Router();
const usersController = new UsersController();
const recipesController = new RecipesController();

usersRoutes.post("/", usersController.create);
usersRoutes.get("/me", ensureAuthenticated, usersController.show);
usersRoutes.patch("/me", ensureAuthenticated, usersController.update);
usersRoutes.get(
  "/me/recipes",
  ensureAuthenticated,
  recipesController.indexMyRecipes,
);

export { usersRoutes };
