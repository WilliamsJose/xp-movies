import { Request, Response } from "express";

interface IAuthController {
  login(request: Request, response: Response): Promise<Response>;
  register(request: Request, response: Response): Promise<Response> ;
}

export {
  IAuthController
}