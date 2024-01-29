import { IMovie } from '../entities/IMovie'
import { IUser } from '../entities/IUser'
import { IUserMovie } from '../entities/IUserMovie'

export interface IUserMovieRepository {
  getByUserId(id: number): Promise<IUserMovie[] | undefined>
  save(user: IUser, movie: IMovie): Promise<IUserMovie | undefined>
}
