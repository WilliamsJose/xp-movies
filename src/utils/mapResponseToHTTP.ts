import { IUseCaseResult } from '../domains/useCases/IUseCaseResult'
import { UseCaseResponsesEnum } from '../enums/UseCaseResponsesEnum'
import {
  createResponseBadRequest,
  createResponseNoContent,
  createResponseNotFound,
  createResponseSuccess,
  createResponseUnauthorized
} from '../helpers/apiResponse'

export const mapResponseToHTTP = (response: IUseCaseResult): any => {
  const { code, data, message, headers } = response

  switch (code) {
    case UseCaseResponsesEnum.Success:
      return createResponseSuccess(data)
    case UseCaseResponsesEnum.LoginSuccess:
      return createResponseSuccess(message, headers)
    case UseCaseResponsesEnum.DBDeleted:
      return createResponseNoContent(headers)
    case UseCaseResponsesEnum.UserNotFound:
      return createResponseNotFound(message)
    case UseCaseResponsesEnum.UserNotRegistered:
      return createResponseUnauthorized(message)
    default:
      return createResponseBadRequest(message)
  }
}
