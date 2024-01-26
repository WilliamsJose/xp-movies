import { Request, Response } from "express";

interface IUserController {
  addFavorite(request: Request, response: Response): Promise<Response>;
  getAllFavorites(request: Request, response: Response): Promise<Response>;
}

export {
  IUserController
}