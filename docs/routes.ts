import { Router } from 'express'

import {
  AddNewUserFavoriteController,
  AuthController,
  DeleteUserFavoriteController,
  FindAllUserFavoritesController,
  RefreshTokenController,
  RegisterController
} from './controllers'

const routes = Router()

routes.post('/user/favorites', async (req, res) => await new AddNewUserFavoriteController().handle(req, res, req.body))
routes.post('/login', async (req, res) => await new AuthController().handle(req, res, req.body))
routes.get('/token/refresh', async (req, res) => await new RefreshTokenController().handle(req, res))
routes.post('/register', async (req, res) => await new RegisterController().handle(req, res, req.body))
routes.get('/user/favorites', async (req, res) => await new FindAllUserFavoritesController().handle(req, res))
routes.delete(
  '/user/favorites/:userMovieId',
  async (req, res) => await new DeleteUserFavoriteController().handle(req, res)
)

export default routes
