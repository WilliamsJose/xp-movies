import { makeRefreshTokenController } from '../../src/factories'
import { RefreshTokenController } from '../../src/controllers'

describe('makeRefreshTokenController', () => {
  it('should return an instance of RefreshTokenController', () => {
    const controller = makeRefreshTokenController()
    expect(controller).toBeInstanceOf(RefreshTokenController)
  })
})
