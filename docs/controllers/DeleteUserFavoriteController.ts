import { Route, Request, OperationId, Header, Delete } from 'tsoa'

@Route('/user/favorites/')
export class DeleteUserFavoriteController {
  /**
   * Given an authorization delete one favorite movie for user related to token
   * @summary Delete favorite movie
   * @param req authorization
   */
  @Delete('{userMovieId}')
  @OperationId('handleDeleteUserFavoriteController')
  async handle(@Header('authorization') @Request() req: any, @Request() res: any): Promise<void> {
    // fake controller logic, just to return a value without communicate with api
    return res.header({ affected: 1 }).status(204).send()
  }
}
