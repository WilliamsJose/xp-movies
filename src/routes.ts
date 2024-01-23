import { Router } from "express";
import { UserController } from "./controllers/UserController";

const routes = Router()

routes.post('/user', new UserController().create)
routes.post('/user/:userId/addFavorite', new UserController().addFavorite)

export default routes;