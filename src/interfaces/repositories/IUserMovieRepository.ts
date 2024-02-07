import { DeleteResult } from 'typeorm'
import { IMovie, IUser, IUserMovie } from '../entities'

export interface IUserMovieRepository {
  getByUserId(id: number): Promise<IUserMovie[] | undefined>
  deleteByUserMovieId(id: number): Promise<DeleteResult | undefined>
  save(user: IUser, movie: IMovie): Promise<IUserMovie | undefined>
}
