import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { recipesRoutes } from "./recipes-routes";
import { uploadsRoutes } from "./uploads-routes";
import { RecipesController } from "@/controllers/recipes-controller";

const routes = Router();
const recipesController = new RecipesController();

//Public routes
routes.use("/sessions", sessionsRoutes);
routes.use("/users", usersRoutes);

// Public endpoint for community/landing page (no authentication required)
routes.get("/public/recipes", recipesController.community);
routes.get("/public/recipes/:id", recipesController.show);

//Private routes
routes.use(ensureAuthenticated);
routes.use("/recipes", recipesRoutes);
routes.use("/uploads", uploadsRoutes);

export { routes };
