import { makeFindAllUserFavoritesController } from '../../src/factories'
import { FindAllUserFavoritesController } from '../../src/controllers'

describe('makeFindAllUserFavoritesController', () => {
  it('should return an instance of FindAllUserFavoritesController', () => {
    const controller = makeFindAllUserFavoritesController()
    expect(controller).toBeInstanceOf(FindAllUserFavoritesController)
  })
})
