import { Router } from 'express'
// import { UserController } from "./controllers/UserController";
// import { refreshToken } from "./middleware/authMiddleware";
// import { AuthController } from "./controllers/AuthController";
import { expressAdapter } from './infra/express/ExpressAdapter'
import { makeAuthController, makeRegisterController } from './factories'
import { RefreshToken } from './middleware/authMiddleware'
import { UserTokenRepository } from './repositories/userTokenRepository'

const routes = Router()

// routes.get('/favorites/all', verifyToken, (req, res) => new UserController().getAllFavorites(req, res))
routes.get(
  '/refreshToken',
  expressAdapter(new RefreshToken(new UserTokenRepository()))
)
routes.post('/login', expressAdapter(makeAuthController()))
routes.post('/register', expressAdapter(makeRegisterController()))
// routes.post('/user/addFavorite', verifyToken, (req, res) => new UserController().addFavorite(req, res))

export default routes
