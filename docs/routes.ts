import { Router } from 'express'

import { AddNewUserFavoriteController, AuthController } from './controllers'

const routes = Router()

routes.post('/user/favorites', async (req, res) => await new AddNewUserFavoriteController().handle(req, res, req.body))
routes.post('/login', async (req, res) => await new AuthController().handle(req, res, req.body))

export default routes
