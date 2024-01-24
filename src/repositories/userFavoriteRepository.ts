import { AppDataSource } from "../data-source";
import { UserFavorite } from "../entities/UserFavorite";

export const userFavoriteRepository = AppDataSource.getRepository(UserFavorite)