import { IMovie } from "./IMovie"
import { IUser } from "./IUser"

export interface IUserMovie {
  id: number
  createdAt: Date
  updatedAt: Date
  user: IUser
  movie: IMovie
}