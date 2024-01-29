import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { UserMovie } from '../entities'
import { IUser, IUserMovie, IMovie } from '../interfaces/entities'
import { IUserMovieRepository } from '../interfaces/repositories'

export class UserMovieRepository implements IUserMovieRepository {
  private repository: Repository<IUserMovie>

  constructor() {
    this.repository = AppDataSource.getRepository(UserMovie)
  }

  async getByUserId(id: number): Promise<IUserMovie[] | undefined> {
    const userFavorites = await this.repository.findBy({ user: { id } })
    return userFavorites ?? undefined
  }

  async save(user: IUser, movie: IMovie): Promise<IUserMovie | undefined> {
    const newFavoriteMovie = this.repository.create({ movie, user })
    const saved = this.repository.save(newFavoriteMovie)
    return saved ?? undefined
  }
}
