import { Route, Request, Example, Response, OperationId, Get, Header, Security } from 'tsoa'
import jwt from 'jsonwebtoken'

interface IRefreshTokenResponseBody {
  message: string
}

const exampleBody: IRefreshTokenResponseBody = {
  message: 'New access token generated!'
}

@Route('token/refresh')
export class RefreshTokenController {
  /**
   * Given a Refresh Token, generates one new Access Token (authorization)
   * @summary Generate new Access Token
   * @param refreshtoken Refresh Token
   * @returns New Access Token
   */
  @Get()
  @Example(exampleBody)
  @Security('refreshtoken')
  @Response('400', 'Invalid Token')
  @OperationId('handleRefreshTokenController')
  async handle(@Header('refreshtoken') @Request() req: any, @Request() res: any): Promise<IRefreshTokenResponseBody> {
    // fake controller logic, just to return a value without communicate with the real api
    const access = jwt.sign(req.headers['refreshtoken'], '123')
    const headers = {
      authorization: access
    }
    return res.header(headers).status(200).send(exampleBody)
  }
}
