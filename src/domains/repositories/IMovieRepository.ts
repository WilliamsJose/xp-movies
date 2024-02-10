import { IMovie } from '../entities'

export interface IMovieRepository {
  getByImdb(imdbId: string): Promise<IMovie | undefined>
  getManyById(moviesId: number[]): Promise<IMovie[] | undefined>
  save(imdbId: string, title: string): Promise<IMovie | undefined>
}
