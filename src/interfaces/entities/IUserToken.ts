import { IUser } from './'

export interface IUserToken {
  id: number
  createdAt: Date
  updatedAt: Date
  refreshToken: string
  user: IUser
}
