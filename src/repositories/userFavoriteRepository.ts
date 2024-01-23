import { AppDataSource } from "../data-source";
import { UserFavorite } from "../entities/UserFavotire";

export const userFavoriteRepository = AppDataSource.getRepository(UserFavorite)