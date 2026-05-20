import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";

const routes = Router();

//Public routes
routes.use("/sessions", sessionsRoutes)
routes.use("/users", usersRoutes);

export { routes };
