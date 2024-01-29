import { IMovie } from '../entities/IMovie'

export interface IMovieRepository {
  getByImdb(imdbId: string): Promise<IMovie | undefined>
  save(imdbId: string, title: string): Promise<IMovie | undefined>
}
