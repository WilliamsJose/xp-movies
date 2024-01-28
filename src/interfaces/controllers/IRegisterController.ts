import { Response } from "express"

export interface IRegisterController {
  handle(request: any): Promise<Response> ;
}
