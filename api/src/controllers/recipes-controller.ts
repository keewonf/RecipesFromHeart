import { Request, Response } from "express";

class RecipesController {
  async create(req: Request, res: Response) {
    return res.json({ message: "Hello World" });
  }
}

export { RecipesController };
