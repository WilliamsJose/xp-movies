import { Post, Route, Security, Body, Example, Header } from 'tsoa'
import { IControllerResponse } from '../../src/domains/controllers'
import { HTTPStatusCode } from '../../src/enums'

interface AddNewUserFavoriteControllerBody {
  imdbId: string
  categoriesIds: number[]
  title: string
}

@Route('/user/favorites')
export class AddNewUserFavoriteController {
  @Security('authorization')
  @Post()
  @Example<IControllerResponse>({
    status: HTTPStatusCode.OK,
    body: {
      id: 1,
      createdAt: '2024-01-29T00:17:33.741Z',
      updatedAt: '2024-01-29T00:17:33.741Z',
      user: {
        id: 10
      },
      movie: {
        id: 32
      }
    },
    headers: ''
  })
  handle(@Header('authorization') req: any, @Body() reqBody: AddNewUserFavoriteControllerBody): IControllerResponse {
    return {
      status: 200,
      headers: '',
      body: reqBody
    }
  }
}
