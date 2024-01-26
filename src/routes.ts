import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { refreshToken, verifyToken } from "./middleware/authMiddleware";
import { AuthController } from "./controllers/AuthController";

const routes = Router()

routes.get('/favorites/all', verifyToken, (req, res) => new UserController().getAllFavorites(req, res))
routes.get('/refreshToken', refreshToken)
routes.post('/login', new AuthController().login)
routes.post('/register', new AuthController().register)
routes.post('/user/addFavorite', verifyToken, (req, res) => new UserController().addFavorite(req, res))

export default routes;