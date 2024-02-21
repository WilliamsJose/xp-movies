import { makeAuthController } from '../../src/factories'
import { AuthController } from '../../src/controllers'

describe('makeAuthController', () => {
  it('should return an instance of AuthController', () => {
    const controller = makeAuthController()
    expect(controller).toBeInstanceOf(AuthController)
  })
})
