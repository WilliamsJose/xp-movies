import { Router } from 'express'
import { expressAdapter } from './infra/express/ExpressAdapter'
import { verifyToken } from './middleware/authMiddleware'
import {
  makeAddNewUserFavoriteController,
  makeAuthController,
  makeFindAllUserFavorites,
  makeRefreshTokenController,
  makeRegisterController
} from './factories'

const routes = Router()

routes.get('/favorites/all', verifyToken, expressAdapter(makeFindAllUserFavorites()))
routes.get('/refreshToken', expressAdapter(makeRefreshTokenController()))
routes.post('/login', expressAdapter(makeAuthController()))
routes.post('/register', expressAdapter(makeRegisterController()))
routes.post('/user/addFavorite', verifyToken, expressAdapter(makeAddNewUserFavoriteController()))

export default routes
