import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { User } from '../entities'
import { IUser } from '../interfaces/entities'
import { IUserRepository } from '../interfaces/repositories'

export class UserRepository implements IUserRepository {
  private repository: Repository<IUser>

  constructor() {
    this.repository = AppDataSource.getRepository(User)
  }

  async getById(id: number): Promise<IUser | undefined> {
    const user = await this.repository.findOneBy({ id })
    return user ?? undefined
  }

  async getByEmail(email: string): Promise<IUser | undefined> {
    const user = await this.repository.findOneBy({ email })
    return user ?? undefined
  }

  async save(name: string, email: string, password: string): Promise<IUser | undefined> {
    const newUser = {
      name,
      email,
      password
    }

    const createdUser = this.repository.create(newUser)
    const saved = await this.repository.save(createdUser)

    return saved ?? undefined
  }
}
