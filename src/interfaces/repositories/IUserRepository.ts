import { IUser } from '../entities'

export interface IUserRepository {
  getById(id: number): Promise<IUser | undefined>
  getByEmail(email: string): Promise<IUser | undefined>
  save(name: string, email: string, password: string): Promise<IUser | undefined>
}
