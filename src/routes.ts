import { Router } from 'express'
import { expressAdapter } from './infra/express'
import { verifyToken } from './middleware'
import {
  makeAddNewUserFavoriteController,
  makeAuthController,
  makeDeleteUserFavoriteController,
  makeFindAllUserFavoritesController,
  makeRefreshTokenController,
  makeRegisterController
} from './factories'

const routes = Router()

routes.post('/register', expressAdapter(makeRegisterController()))
routes.post('/login', expressAdapter(makeAuthController()))
routes.get('/token/refresh', expressAdapter(makeRefreshTokenController()))
routes.get('/user/favorites', verifyToken, expressAdapter(makeFindAllUserFavoritesController()))
routes.post('/user/favorites', verifyToken, expressAdapter(makeAddNewUserFavoriteController()))
routes.delete('/user/favorites/:userMovieId', verifyToken, expressAdapter(makeDeleteUserFavoriteController()))

export default routes
