import { Route, Request, Body, Example, Response, Post, OperationId } from 'tsoa'
import jwt from 'jsonwebtoken'

interface IAuthRequestBody {
  email: string
  password: string
}

interface IAuthResponseBody {
  message: string
}

const exampleBody: IAuthResponseBody = {
  message: 'User logged in successfully!'
}

@Route('/login')
export class AuthController {
  /**
   * Given an email and password, validate and return if user are logged in successfully
   * @summary Perform user login
   * @param body With user email and password
   * @returns An message login success or fail
   */
  @Post()
  @Example(exampleBody)
  @Response('404', 'User not found')
  @Response('400', 'Invalid Credentials')
  @OperationId('handleAuthController')
  async handle(
    @Request() req: any,
    @Request() res: any,
    @Body() reqBody: IAuthRequestBody
  ): Promise<IAuthResponseBody> {
    const access = jwt.sign(reqBody.email, '123')
    const refresh = jwt.sign(reqBody.email, '321')
    const headers = {
      authorization: access,
      refreshtoken: refresh
    }
    return res.header(headers).status(200).send(exampleBody)
  }
}
