import { Router } from 'express'
import { expressAdapter } from './infra/express/ExpressAdapter'
import {
  makeAuthController,
  makeRefreshTokenController,
  makeRegisterController
} from './factories'

const routes = Router()

// routes.get('/favorites/all', verifyToken, (req, res) => new UserController().getAllFavorites(req, res))
routes.get('/refreshToken', expressAdapter(makeRefreshTokenController()))
routes.post('/login', expressAdapter(makeAuthController()))
routes.post('/register', expressAdapter(makeRegisterController()))
// routes.post('/user/addFavorite', verifyToken, (req, res) => new UserController().addFavorite(req, res))

export default routes
