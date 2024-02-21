import { makeRegisterController } from '../../src/factories'
import { RegisterController } from '../../src/controllers'

describe('makeRegisterController', () => {
  it('should return an instance of RegisterController', () => {
    const controller = makeRegisterController()
    expect(controller).toBeInstanceOf(RegisterController)
  })
})
