import { Router } from 'express'

import { AddNewUserFavoriteController } from './controllers'

const routes = Router()

routes.post('/', (req) => new AddNewUserFavoriteController().handle(req, req.body))

export default routes
