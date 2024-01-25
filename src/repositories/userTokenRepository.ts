import { AppDataSource } from "../data-source";
import { UserToken } from "../entities/UserToken";

export const userTokenRepository = AppDataSource.getRepository(UserToken)