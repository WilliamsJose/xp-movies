import { Route, Request, Example, OperationId, Get, Header, Security } from 'tsoa'

interface IFindAllUserFavoritesResponseBody {
  favorites: {
    id: number
    createdAt: string
    updatedAt: string
    user: {
      id: number
      name: string
      email: string
    }
    movie: {
      id: number
      imdbId: string
      createdAt: string
      updatedAt: string
      title: string
    }
  }[]
}

const exampleBody: IFindAllUserFavoritesResponseBody = {
  favorites: [
    {
      id: 54,
      createdAt: '2024-02-11T15:51:35.886Z',
      updatedAt: '2024-02-11T15:51:35.886Z',
      user: {
        id: 10,
        name: 'luqinha',
        email: 'luqinha@mail.com'
      },
      movie: {
        id: 39,
        imdbId: 'tt12344',
        createdAt: '2024-02-10T18:16:06.857Z',
        updatedAt: '2024-02-10T18:16:06.857Z',
        title: 'FPS Baddest Player The Movie'
      }
    }
  ]
}

@Route('/user/favorites')
export class FindAllUserFavoritesController {
  /**
   * Given a authorization token, find all user favorite movies
   * @summary return all user favorite movies
   * @param authorization
   */
  @Get()
  @Security('authorization')
  @Example(exampleBody)
  @OperationId('handleFindAllUserFavoritesController')
  async handle(
    @Header('authorization') @Request() req: any,
    @Request() res: any
  ): Promise<IFindAllUserFavoritesResponseBody> {
    // fake controller logic, just to return a value without communicate with api
    return res.status(200).send(exampleBody)
  }
}
