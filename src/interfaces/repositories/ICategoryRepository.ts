import { ICategory } from "../entities/ICategory";

export interface ICategoryRepository {
  getById(id: number): Promise<ICategory | undefined>
  getManyByIds(id: number[]): Promise<ICategory[] | undefined>
}