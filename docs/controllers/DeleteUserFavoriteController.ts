import { Route, Request, OperationId, Header, Delete, Security } from 'tsoa'

@Route('/user/favorites/')
export class DeleteUserFavoriteController {
  /**
   * Given a authorization token and favorite id, delete the movie from user favorites
   * @summary Delete favorite movie
   * @param req authorization
   */
  @Delete('{userMovieId}')
  @Security('authorization')
  @OperationId('handleDeleteUserFavoriteController')
  async handle(@Header('authorization') @Request() req: any, @Request() res: any): Promise<void> {
    // fake controller logic, just to return a value without communicate with api
    return res.header({ affected: 1 }).status(204).send()
  }
}
