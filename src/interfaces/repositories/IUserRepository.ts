import { IUser } from "../entities/IUser";

export interface IUserRepository {
  getById(id: number): Promise<IUser | undefined>
}