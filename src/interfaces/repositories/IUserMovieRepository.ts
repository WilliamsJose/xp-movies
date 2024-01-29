import { IMovie, IUser, IUserMovie } from '../entities'

export interface IUserMovieRepository {
  getByUserId(id: number): Promise<IUserMovie[] | undefined>
  save(user: IUser, movie: IMovie): Promise<IUserMovie | undefined>
}
