import { Post, Route, Security, Request, Body, Example, Header, Response } from 'tsoa'

interface IAddNewUserFavoriteRequestBody {
  imdbId: string
  categoriesIds: number[]
  title: string
}

interface IAddNewUserFavoriteResponseBody {
  id: number
  createdAt: string
  updatedAt: string
  user: {
    id: number
    name: string
    email: string
    createdAt: string
    updatedAt: string
  }
  movie: {
    id: number
    imdbId: string
    title: string
    createdAt: string
    updatedAt: string
  }
}

const exampleBody: IAddNewUserFavoriteResponseBody = {
  id: 1,
  createdAt: '2024-02-14T16:58:54.391Z',
  updatedAt: '2024-02-14T16:58:54.391Z',
  user: {
    id: 10,
    name: 'Maria',
    email: 'm.josefina@mail.com',
    createdAt: '2024-02-14T16:58:54.391Z',
    updatedAt: '2024-02-14T16:58:54.391Z'
  },
  movie: {
    id: 32,
    imdbId: 'tt123',
    title: 'Super Mario World 2',
    createdAt: '2024-02-14T16:58:54.391Z',
    updatedAt: '2024-02-14T16:58:54.391Z'
  }
}

@Route('/user/favorites')
export class AddNewUserFavoriteController {
  @Security('authorization')
  @Post()
  @Example(exampleBody)
  @Response('400', 'Invalid Params')
  @Response('404', 'User not found')
  async handle(
    @Header('authorization') @Request() req: any,
    @Request() res: any,
    @Body() reqBody: IAddNewUserFavoriteRequestBody
  ): Promise<IAddNewUserFavoriteResponseBody> {
    exampleBody.movie.imdbId = reqBody.imdbId
    exampleBody.movie.title = reqBody.title
    exampleBody.createdAt = new Date().toISOString()
    exampleBody.updatedAt = new Date().toISOString()
    return res.status(200).send(exampleBody)
  }
}
