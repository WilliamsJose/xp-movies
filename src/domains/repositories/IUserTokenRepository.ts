import { IUser, IUserToken } from '../entities'

export interface IUserTokenRepository {
  getNewAccessToken(refreshToken: string): Promise<IUserToken | undefined>
  getByUserId(userId: number): Promise<IUserToken | undefined>
  update(userId: number, newRefreshToken: string): Promise<number | undefined>
  save(newRefreshToken: string, user: IUser): Promise<IUserToken | undefined>
}
