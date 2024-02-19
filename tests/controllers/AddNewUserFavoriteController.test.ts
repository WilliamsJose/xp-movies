import { AddNewUserFavoriteController } from '../../src/controllers'

describe('AddNewUserFavoriteController:', () => {
  it('should call execute with correct parameters', async () => {
    const request = {
      query: { userId: 1 },
      body: { imdbId: 'tt123', categoriesIds: [1], title: 'the movie' }
    }
    const addNewUserFavoriteUseCaseMock = {
      execute: jest.fn()
    }

    const controller = new AddNewUserFavoriteController(addNewUserFavoriteUseCaseMock)
    await controller.handle(request)

    expect(addNewUserFavoriteUseCaseMock.execute).toHaveBeenCalledWith(
      request.query.userId,
      request.body.imdbId,
      request.body.categoriesIds,
      request.body.title
    )
  })
})
