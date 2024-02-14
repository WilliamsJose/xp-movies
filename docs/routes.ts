import { Router } from 'express'

import { AddNewUserFavoriteController } from './controllers'

const routes = Router()

routes.post('/user/favorites', async (req, res) => await new AddNewUserFavoriteController().handle(req, res, req.body))

export default routes
