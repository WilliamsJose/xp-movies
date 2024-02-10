import { IUseCaseResult } from '../domains/useCases/IUseCaseResult'
import { UseCasesEnum } from '../enums/UseCasesEnum'
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
    case UseCasesEnum.Success:
      return createResponseSuccess(data)
    case UseCasesEnum.LoginSuccess:
      return createResponseSuccess(message, headers)
    case UseCasesEnum.DBDeleted:
      return createResponseNoContent(headers)
    case UseCasesEnum.UserNotFound:
      return createResponseNotFound(message)
    case UseCasesEnum.UserNotRegistered:
      return createResponseUnauthorized(message)
    default:
      return createResponseBadRequest(message)
  }
}
