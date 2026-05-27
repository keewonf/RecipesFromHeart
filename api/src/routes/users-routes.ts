import { Router } from "express";
import { UsersController } from "@/controllers/users-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.get("/me", ensureAuthenticated, usersController.show);
usersRoutes.patch("/me", ensureAuthenticated, usersController.update);

export { usersRoutes };
