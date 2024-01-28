import { IUser } from "../entities/IUser";
import { IUserToken } from "../entities/IUserToken";

export interface IUserTokenRepository {
  // getByRefreshToken(refreshToken: string): Promise<IUserToken | undefined>
  getByUserId(userId: number): Promise<IUserToken | undefined>
  update(userId: number, newRefreshToken: string): Promise<number | undefined>
  save(newRefreshToken: string, user: IUser): Promise<IUserToken | undefined>
}
