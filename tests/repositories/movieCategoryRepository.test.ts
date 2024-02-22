import { IMovie, IMovieCategory } from '../../src/domains/entities'
import { MovieCategoryRepository } from '../../src/repositories'

describe('MovieCategoryRepository', () => {
  it('should return the movie by id if exists', async () => {
    const movieCategoryRepository = new MovieCategoryRepository()
    const movieCategoryMock: IMovieCategory = {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      category: {
        id: 1,
        title: 'Action',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      movie: {
        id: 1,
        imdbId: 'tt123',
        createdAt: new Date(),
        updatedAt: new Date(),
        title: 'Mario'
      }
    }

    jest.spyOn(movieCategoryRepository, 'getById').mockResolvedValue(movieCategoryMock)

    const result = await movieCategoryRepository.getById(1)

    expect(result).toEqual(movieCategoryMock)
  })

  it('should return undefined if the movie not exists', async () => {
    const movieCategoryRepository = new MovieCategoryRepository()
    jest.spyOn(movieCategoryRepository, 'getById').mockResolvedValue(undefined)

    const result = await movieCategoryRepository.getById(1)

    expect(result).toBeUndefined()
  })

  it('should save movieCategory given a movie and a list of categories', async () => {
    const movieCategoryRepository = new MovieCategoryRepository()
    const movieCategoryMock: IMovieCategory = {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      category: {
        id: 1,
        title: 'Action',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      movie: {
        id: 1,
        imdbId: 'tt123',
        createdAt: new Date(),
        updatedAt: new Date(),
        title: 'Mario'
      }
    }
    jest.spyOn(movieCategoryRepository, 'save').mockResolvedValue([movieCategoryMock])

    const result = await movieCategoryRepository.save(movieCategoryMock.movie, [movieCategoryMock.category])

    expect(result).toEqual([movieCategoryMock])
  })

  it('should return undefined if the params not provided', async () => {
    const movieCategoryRepository = new MovieCategoryRepository()
    jest.spyOn(movieCategoryRepository, 'save').mockResolvedValue(undefined)

    const result = await movieCategoryRepository.save({} as IMovie, [])

    expect(result).toBeUndefined()
  })
})
