import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { maybeAuthenticated } from "../middlewares/maybe-authenticated";
import { recipesRoutes } from "./recipes-routes";
import { uploadsRoutes } from "./uploads-routes";
import { RecipesController } from "@/controllers/recipes-controller";

const routes = Router();
const recipesController = new RecipesController();

//Public routes
routes.use("/sessions", sessionsRoutes);
routes.use("/users", usersRoutes);

// Public endpoint for community/landing page (optional auth for current-user flags)
routes.get("/public/recipes", maybeAuthenticated, recipesController.community);
routes.get("/recipes/:id", maybeAuthenticated, recipesController.show);

//Private routes
routes.use(ensureAuthenticated);
routes.use("/recipes", recipesRoutes);
routes.use("/uploads", uploadsRoutes);

export { routes };
