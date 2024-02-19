import { IControllerResponse } from '../domains/controllers'
import { IUseCaseResult } from '../domains/useCases/IUseCaseResult'
import { UseCaseResponsesEnum } from '../enums/UseCaseResponsesEnum'
import {
  createResponseBadRequest,
  createResponseForbbiden,
  createResponseNoContent,
  createResponseNotFound,
  createResponseSuccess,
  createResponseUnauthorized
} from '../helpers/apiResponse'

export const mapResponseToHTTP = (response: IUseCaseResult): IControllerResponse => {
  const { code, body, headers } = response

  switch (code) {
    case UseCaseResponsesEnum.Success:
    case UseCaseResponsesEnum.DBInserted:
      return createResponseSuccess(body, headers)
    case UseCaseResponsesEnum.DBDeleted:
      return createResponseNoContent(headers)
    case UseCaseResponsesEnum.UserNotFound:
      return createResponseNotFound(body, headers)
    case UseCaseResponsesEnum.UserNotRegistered:
    case UseCaseResponsesEnum.InvalidCredentials:
      return createResponseUnauthorized(body, headers)
    case UseCaseResponsesEnum.InvalidUser:
      return createResponseForbbiden(body, headers)
    default:
      return createResponseBadRequest(body, headers)
  }
}
