import { HTTPStatusCode } from '../../enums'

export interface IControllerResponse {
  status: HTTPStatusCode
  headers: any
  body: any
}
