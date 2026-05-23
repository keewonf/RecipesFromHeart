import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { recipesRoutes } from "./recipes-routes";
import { uploadsRoutes } from "./uploads-routes";

const routes = Router();

//Public routes
routes.use("/sessions", sessionsRoutes);
routes.use("/users", usersRoutes);

//Private routes
routes.use(ensureAuthenticated);
routes.use("/recipes", recipesRoutes);
routes.use("/uploads", uploadsRoutes);

export { routes };
