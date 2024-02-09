import { In, Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Movie } from '../entities'
import { IMovie } from '../interfaces/entities'
import { IMovieRepository } from '../interfaces/repositories'

export class MovieRepository implements IMovieRepository {
  private repository: Repository<IMovie>

  constructor() {
    this.repository = AppDataSource.getRepository(Movie)
  }
  getManyById(moviesId: number[]): Promise<IMovie[] | undefined> {
    const result = this.repository.findBy({ id: In(moviesId) })
    return result ?? undefined
  }

  async getByImdb(imdbId: string): Promise<IMovie | undefined> {
    const movie = await this.repository.findOneBy({ imdbId })
    return movie ?? undefined
  }

  async save(imdbId: string, title: string): Promise<IMovie | undefined> {
    const newMovie = this.repository.create({ imdbId, title })
    const saved = await this.repository.save(newMovie)
    return saved ?? undefined
  }
}
