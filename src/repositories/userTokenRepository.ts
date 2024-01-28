import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { UserToken } from "../entities/UserToken";
import { IUserToken } from "../interfaces/entities/IUserToken";
import { IUserTokenRepository } from "../interfaces/repositories/IUserTokenRepository";
import { IUser } from "../interfaces/entities/IUser";

export class UserTokenRepository implements IUserTokenRepository {
  private repository: Repository<IUserToken>

  constructor() {
    this.repository = AppDataSource.getRepository(UserToken)
  }

  async save(refreshToken: string, user: IUser): Promise<IUserToken | undefined> {
    const newUserToken = this.repository.create({ refreshToken, user })
    return this.repository.save(newUserToken)
  }

  async update(userId: number, refreshToken: string): Promise<number | undefined> {
    const { affected } = await this.repository.update({ user: { id: userId } }, { refreshToken })
    return affected ?? undefined
  }

  async getByUserId(userId: number): Promise<IUserToken | undefined> {
    const refreshToken = await this.repository.findOneBy({ user: { id: userId } })
    return refreshToken ?? undefined
  }

  // async getByRefreshToken(refreshToken: string): Promise<IUserToken | undefined> {
  //   throw new Error("Method not implemented.");
  // }
}
