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
  const { code, body, headers } = response

  switch (code) {
    case UseCaseResponsesEnum.Success:
      return createResponseSuccess(body, headers)
    case UseCaseResponsesEnum.DBDeleted:
      return createResponseNoContent(headers)
    case UseCaseResponsesEnum.UserNotFound:
      return createResponseNotFound(body, headers)
    case UseCaseResponsesEnum.UserNotRegistered:
      return createResponseUnauthorized(body, headers)
    default:
      return createResponseBadRequest(body, headers)
  }
}
