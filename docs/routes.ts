import { Router } from 'express'

import { AddNewUserFavoriteController, AuthController, RefreshTokenController } from './controllers'

const routes = Router()

routes.post('/user/favorites', async (req, res) => await new AddNewUserFavoriteController().handle(req, res, req.body))
routes.post('/login', async (req, res) => await new AuthController().handle(req, res, req.body))
routes.get('/token/refresh', async (req, res) => await new RefreshTokenController().handle(req, res))

export default routes
