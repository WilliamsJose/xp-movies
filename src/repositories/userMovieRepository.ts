import { DeleteResult, Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { UserMovie } from '../entities'
import { IUser, IUserMovie, IMovie } from '../domains/entities'
import { IUserMovieRepository } from '../domains/repositories'

export class UserMovieRepository implements IUserMovieRepository {
  private repository: Repository<IUserMovie>

  constructor() {
    this.repository = AppDataSource.getRepository(UserMovie)
  }

  async deleteByUserMovieId(id: number): Promise<DeleteResult | undefined> {
    const deletedUserMovie = await this.repository.delete({ id })
    return deletedUserMovie ?? undefined
  }

  async getByUserId(id: number): Promise<IUserMovie[] | undefined> {
    const userFavorites = await this.repository.find({
      select: { id: true, createdAt: true, updatedAt: true, user: { id: true, name: true, email: true } },
      where: { user: { id } },
      relations: { user: true, movie: true }
    })
    return userFavorites ?? undefined
  }

  async save(user: IUser, movie: IMovie): Promise<IUserMovie | undefined> {
    const newFavoriteMovie = this.repository.create({ movie, user })
    const saved = this.repository.save(newFavoriteMovie)
    return saved ?? undefined
  }
}
