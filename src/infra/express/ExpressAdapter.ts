import { Request, Response } from 'express'
import { IController } from '../../domains/controllers'

export function expressAdapter(controller: IController) {
  return async (req: Request, res: Response) => {
    const controllerRequest = {
      query: req?.query ?? {},
      body: req?.body ?? {},
      params: req?.params ?? {},
      headers: req?.headers ?? {}
    }

    const { status, body, headers } = await controller.handle(controllerRequest)

    return res.header(headers).status(status).json(body)
  }
}
