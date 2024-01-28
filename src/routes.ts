import { Router } from 'express'
// import { UserController } from "./controllers/UserController";
// import { refreshToken } from "./middleware/authMiddleware";
// import { AuthController } from "./controllers/AuthController";
import { RegisterController } from './controllers/RegisterController'
import { expressAdapter } from './infra/express/ExpressAdapter'
import { UserRepository } from './repositories/userRepository'
import { AuthController } from './controllers/AuthController'
import { UserTokenRepository } from './repositories/userTokenRepository'

const routes = Router()

// routes.get('/favorites/all', verifyToken, (req, res) => new UserController().getAllFavorites(req, res))
// routes.get('/refreshToken', refreshToken)
routes.post(
  '/login',
  expressAdapter(
    new AuthController(new UserRepository(), new UserTokenRepository())
  )
)
routes.post(
  '/register',
  expressAdapter(new RegisterController(new UserRepository()))
)
// routes.post('/user/addFavorite', verifyToken, (req, res) => new UserController().addFavorite(req, res))

export default routes
