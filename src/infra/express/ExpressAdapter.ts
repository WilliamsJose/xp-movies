import { Request, Response } from 'express'
import { IController } from '../../interfaces/controllers/IController'

export function expressAdapter(controller: IController) {
  return async (req: Request, res: Response) => {

    const controllerRequest = {
      query: req?.query ?? {},
      body: req?.body ?? {},
      params: req?.params ?? {}
    }

    const { status, body, query } = await controller.handle(controllerRequest)

    return res.header(query).status(status).json(body)
  }
}
