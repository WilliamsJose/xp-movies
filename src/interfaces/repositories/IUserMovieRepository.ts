import { IUserMovie } from "../entities/IUserMovie";

export interface IUserMovieRepository {
  getByUserId(id: number): Promise<IUserMovie[] | undefined>
}