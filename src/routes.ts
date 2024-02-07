import { Router } from 'express'
import { expressAdapter } from './infra/express'
import { verifyToken } from './middleware'
import {
  makeAddNewUserFavoriteController,
  makeAuthController,
  makeFindAllUserFavorites,
  makeRefreshTokenController,
  makeRegisterController
} from './factories'

const routes = Router()

routes.post('/register', expressAdapter(makeRegisterController()))
routes.post('/login', expressAdapter(makeAuthController()))
routes.get('/token/refresh', expressAdapter(makeRefreshTokenController()))
routes.get('/user/favorites/all', verifyToken, expressAdapter(makeFindAllUserFavorites()))
routes.post('/user/favorites/new', verifyToken, expressAdapter(makeAddNewUserFavoriteController()))

export default routes
