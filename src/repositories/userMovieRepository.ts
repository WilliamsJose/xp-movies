import { AppDataSource } from "../data-source";
import { UserMovie } from "../entities/UserMovie";

export const userMovieRepository = AppDataSource.getRepository(UserMovie)