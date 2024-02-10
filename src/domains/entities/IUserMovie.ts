import { IUser, IMovie } from '.'

export interface IUserMovie {
  id: number
  createdAt: Date
  updatedAt: Date
  user: IUser
  movie: IMovie
}
