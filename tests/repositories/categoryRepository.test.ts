import { ICategory } from '../../src/domains/entities'
import { CategoryRepository } from '../../src/repositories'

describe('categoryRepository', () => {
  it('should retrieve a category by its ID when it exists', async () => {
    const mockRepository: any = {
      findOneBy: jest
        .fn()
        .mockResolvedValue({ id: 1, title: 'Category 1', createdAt: new Date(), updatedAt: new Date() })
    }

    const categoryRepository = new CategoryRepository()
    categoryRepository.setRepository(mockRepository)
    const result = await categoryRepository.getById(1)

    expect(result).toEqual({ id: 1, title: 'Category 1', createdAt: expect.any(Date), updatedAt: expect.any(Date) })
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 })
  })

  it('should handle a invalid id parameter', async () => {
    const mockRepository: any = {
      findOneBy: jest.fn().mockResolvedValue(undefined)
    }

    const categoryRepository = new CategoryRepository()
    categoryRepository.setRepository(mockRepository)

    const result = await categoryRepository.getById(Number())

    expect(result).toBeUndefined()
  })

  it('should return an array of categories when given an array of valid category IDs', async () => {
    const categoriesMock: ICategory[] = [
      {
        id: 1,
        title: 'Test Category',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'Test Category 2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: 'Test Category 3',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    const mockRepository: any = {
      find: jest.fn().mockResolvedValue(categoriesMock)
    }
    const validIds = [1, 2, 3]

    const categoryRepository = new CategoryRepository()
    categoryRepository.setRepository(mockRepository)

    const result = await categoryRepository.getManyByIds(validIds)

    expect(result).toEqual(expect.any(Array))
    expect(result?.length).toBe(validIds.length)
  })

  it('should return undefined when given an array of invalid category IDs', async () => {
    const categoriesMock = null
    const mockRepository: any = {
      find: jest.fn().mockResolvedValue(categoriesMock)
    }
    const invalidIds = [1, 2, 3]

    const categoryRepository = new CategoryRepository()
    categoryRepository.setRepository(mockRepository)

    const result = await categoryRepository.getManyByIds(invalidIds)

    expect(result).toEqual(undefined)
    expect(result?.length).not.toBe(invalidIds.length)
  })
})
