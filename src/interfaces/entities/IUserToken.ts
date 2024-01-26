import { IUser } from "./IUser"

export interface IUserToken {
  id: number
  createdAt: Date
  updatedAt: Date
  refreshToken: string
  user: IUser
}