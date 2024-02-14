import { Route, Request, Example, OperationId, Post, Body } from 'tsoa'
import jwt from 'jsonwebtoken'

interface IRegisterRequestBody {
  name: string
  email: string
  password: string
}

interface IRegisterResponseBody {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  email: string
  password: string
}

const exampleBody: IRegisterResponseBody = {
  id: 33,
  createdAt: '2024-02-14T21:43:20.761Z',
  updatedAt: '2024-02-14T21:43:20.761Z',
  name: 'luqinha',
  email: 'luqinha@mail.com',
  password: '$2b$12$sLb6ajqLl79sePdBuh4SL.m9FKMdfXAEzSCcm1pFkyTyuDt2g/PLa'
}

@Route('/register')
export class RegisterController {
  /**
   *
   * @summary Create new user
   * @param body user
   * @returns new user created
   */
  @Post()
  @Example(exampleBody)
  @OperationId('handleRegisterController')
  async handle(
    @Request() req: any,
    @Request() res: any,
    @Body() reqBody: IRegisterRequestBody
  ): Promise<IRegisterResponseBody> {
    // fake controller logic, just to return a value without communicate with api
    exampleBody.id = 12
    exampleBody.createdAt = new Date().toISOString()
    exampleBody.updatedAt = new Date().toISOString()
    exampleBody.password = jwt.sign(reqBody.password, '321')
    return res.status(200).send(reqBody)
  }
}
