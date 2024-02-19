import { IControllerResponse } from '../../src/domains/controllers'
import { IUseCaseResult } from '../../src/domains/useCases/IUseCaseResult'
import { mapResponseToHTTP } from '../../src/utils/mapResponseToHTTP'

describe('mapResponseToHTTP', () => {
  it('should return successful http response', () => {
    const useCaseResult: IUseCaseResult = {
      code: 1,
      headers: undefined,
      body: 'OK'
    }
    const mapResult = mapResponseToHTTP(useCaseResult)

    const expectedResult: IControllerResponse = {
      body: { message: 'OK' },
      headers: undefined,
      status: 200
    }
    expect(mapResult).toEqual(expectedResult)
  })
})
