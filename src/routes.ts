import { Router } from "express";
import { UserController } from "./controllers/UserController";
import verifyToken from "./middleware/authMiddleware";

const routes = Router()

routes.get('/favorites/all', verifyToken, (req, res) => new UserController().findAllUserFavorites(req, res))
routes.post('/login', new UserController().login)
routes.post('/user', new UserController().create)
routes.post('/user/addFavorite', verifyToken, (req, res) => new UserController().addFavorite(req, res))

export default routes;