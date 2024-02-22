import { In, Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Category } from '../entities'
import { ICategory } from '../domains/entities'
import { ICategoryRepository } from '../domains/repositories'

export class CategoryRepository implements ICategoryRepository {
  private repository: Repository<ICategory>

  constructor() {
    this.repository = AppDataSource.getRepository(Category)
  }

  setRepository(repo: Repository<ICategory>) {
    this.repository = repo
  }

  async getById(id: number): Promise<ICategory | undefined> {
    const category = await this.repository.findOneBy({ id })
    return category ?? undefined
  }

  async getManyByIds(id: number[]): Promise<ICategory[] | undefined> {
    const categories = await this.repository.find({
      where: {
        id: In(id)
      },
      select: ['id', 'title', 'createdAt', 'updatedAt'],
      order: { id: 'ASC' }
    })

    return categories ?? undefined
  }
}
