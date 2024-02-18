import {
  ICategoryRepository,
  IMovieCategoryRepository,
  IMovieRepository,
  IUserMovieRepository,
  IUserRepository
} from '../../domains/repositories'
import { AddNewUserFavoriteUseCase } from '../../useCases'
import { UseCaseResponsesEnum } from '../../enums/UseCaseResponsesEnum'

describe('AddNewUserFavoriteUseCase: testing all possible response', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should save a new user favorite movie with valid parameters', async () => {
    const userRepositoryMock: IUserRepository = {
      getById: jest.fn().mockResolvedValue({ id: 1, name: 'John', email: 'john@example.com' }),
      getByEmail: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      save: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const movieRepositoryMock: IMovieRepository = {
      getByImdb: jest.fn().mockResolvedValue(undefined),
      save: jest.fn().mockResolvedValue({ imdbId: '123', title: 'Movie' }),
      getManyById: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const categoryRepositoryMock: ICategoryRepository = {
      getManyByIds: jest.fn().mockResolvedValue([{ id: 1, name: 'Action' }]),
      getById: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const movieCategoryRepositoryMock: IMovieCategoryRepository = {
      save: jest.fn().mockResolvedValue([{ movieId: 1, categoryId: 1 }]),
      getById: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const userMovieRepositoryMock: IUserMovieRepository = {
      save: jest.fn().mockResolvedValue({ userId: 1, movieId: 1 }),
      getByUserId: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      deleteByUserMovieId: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const addNewUserFavoriteUseCase = new AddNewUserFavoriteUseCase(
      userRepositoryMock,
      movieRepositoryMock,
      categoryRepositoryMock,
      movieCategoryRepositoryMock,
      userMovieRepositoryMock
    )

    const result = await addNewUserFavoriteUseCase.execute(1, '123', [1], 'Movie')

    expect(result.code).toBe(UseCaseResponsesEnum.Success)
    expect(result.body).toEqual({ userId: 1, movieId: 1 })
    expect(userRepositoryMock.getById).toHaveBeenCalledWith(1)
    expect(movieRepositoryMock.getByImdb).toHaveBeenCalledWith('123')
    expect(movieRepositoryMock.save).toHaveBeenCalledWith('123', 'Movie')
    expect(categoryRepositoryMock.getManyByIds).toHaveBeenCalledWith([1])
    expect(movieCategoryRepositoryMock.save).toHaveBeenCalledWith({ imdbId: '123', title: 'Movie' }, [
      { id: 1, name: 'Action' }
    ])
    expect(userMovieRepositoryMock.save).toHaveBeenCalledWith(
      { id: 1, name: 'John', email: 'john@example.com' },
      { imdbId: '123', title: 'Movie' }
    )
  })

  it('should not save a new user favorite movie with invalid user ID', async () => {
    const userRepositoryMock: IUserRepository = {
      getById: jest.fn().mockResolvedValue(undefined),
      getByEmail: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      save: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const movieRepositoryMock: IMovieRepository = {
      getByImdb: jest.fn().mockResolvedValue(undefined),
      save: jest.fn().mockResolvedValue({ imdbId: '123', title: 'Movie' }),
      getManyById: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const categoryRepositoryMock: ICategoryRepository = {
      getManyByIds: jest.fn().mockResolvedValue([{ id: 1, name: 'Action' }]),
      getById: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const movieCategoryRepositoryMock: IMovieCategoryRepository = {
      save: jest.fn().mockResolvedValue([{ movieId: 1, categoryId: 1 }]),
      getById: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const userMovieRepositoryMock: IUserMovieRepository = {
      save: jest.fn().mockResolvedValue({ userId: 1, movieId: 1 }),
      getByUserId: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      deleteByUserMovieId: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const addNewUserFavoriteUseCase = new AddNewUserFavoriteUseCase(
      userRepositoryMock,
      movieRepositoryMock,
      categoryRepositoryMock,
      movieCategoryRepositoryMock,
      userMovieRepositoryMock
    )

    const result = await addNewUserFavoriteUseCase.execute(1, '123', [1], 'Movie')

    expect(result.code).toBe(UseCaseResponsesEnum.UserNotFound)
    expect(result.body).toBe('User not found on database.')
    expect(userRepositoryMock.getById).toHaveBeenCalledWith(1)
    expect(movieRepositoryMock.getByImdb).not.toHaveBeenCalled()
    expect(movieRepositoryMock.save).not.toHaveBeenCalled()
    expect(categoryRepositoryMock.getManyByIds).not.toHaveBeenCalled()
    expect(movieCategoryRepositoryMock.save).not.toHaveBeenCalled()
    expect(userMovieRepositoryMock.save).not.toHaveBeenCalled()
  })

  it('should save a new user favorite movie with valid inputs', async () => {
    const userRepositoryMock: IUserRepository = {
      getById: jest.fn().mockResolvedValue({ id: 1, name: 'John', email: 'john@example.com' }),
      getByEmail: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      save: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const movieRepositoryMock: IMovieRepository = {
      getByImdb: jest.fn().mockResolvedValue(undefined),
      save: jest.fn().mockResolvedValue({ imdbId: '123', title: 'Movie' }),
      getManyById: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const categoryRepositoryMock: ICategoryRepository = {
      getManyByIds: jest.fn().mockResolvedValue([{ id: 1, name: 'Action' }]),
      getById: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const movieCategoryRepositoryMock: IMovieCategoryRepository = {
      save: jest.fn().mockResolvedValue([{ movieId: 1, categoryId: 1 }]),
      getById: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const userMovieRepositoryMock: IUserMovieRepository = {
      save: jest.fn().mockResolvedValue({ userId: 1, movieId: 1 }),
      getByUserId: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      deleteByUserMovieId: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const addNewUserFavoriteUseCase = new AddNewUserFavoriteUseCase(
      userRepositoryMock,
      movieRepositoryMock,
      categoryRepositoryMock,
      movieCategoryRepositoryMock,
      userMovieRepositoryMock
    )

    const result = await addNewUserFavoriteUseCase.execute(1, '123', [1], 'Movie')

    expect(result.code).toBe(UseCaseResponsesEnum.Success)
    expect(result.body).toEqual({ userId: 1, movieId: 1 })
    expect(userRepositoryMock.getById).toHaveBeenCalledWith(1)
    expect(movieRepositoryMock.getByImdb).toHaveBeenCalledWith('123')
    expect(movieRepositoryMock.save).toHaveBeenCalledWith('123', 'Movie')
    expect(categoryRepositoryMock.getManyByIds).toHaveBeenCalledWith([1])
    expect(movieCategoryRepositoryMock.save).toHaveBeenCalledWith({ imdbId: '123', title: 'Movie' }, [
      { id: 1, name: 'Action' }
    ])
    expect(userMovieRepositoryMock.save).toHaveBeenCalledWith(
      { id: 1, name: 'John', email: 'john@example.com' },
      { imdbId: '123', title: 'Movie' }
    )
  })

  it('should return invalid cateogires if category provided is not on database', async () => {
    const userRepositoryMock: IUserRepository = {
      getById: jest.fn().mockResolvedValue({ id: 1, name: 'John', email: 'john@example.com' }),
      getByEmail: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      save: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const movieRepositoryMock: IMovieRepository = {
      getByImdb: jest.fn().mockResolvedValue(undefined),
      save: jest.fn().mockResolvedValue({ imdbId: '123', title: 'Movie' }),
      getManyById: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const categoryRepositoryMock: ICategoryRepository = {
      getManyByIds: jest.fn().mockResolvedValue([]),
      getById: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const movieCategoryRepositoryMock: IMovieCategoryRepository = {
      save: jest.fn().mockResolvedValue([{ movieId: 1, categoryId: 1 }]),
      getById: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const userMovieRepositoryMock: IUserMovieRepository = {
      save: jest.fn().mockResolvedValue({ userId: 1, movieId: 1 }),
      getByUserId: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      deleteByUserMovieId: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const addNewUserFavoriteUseCase = new AddNewUserFavoriteUseCase(
      userRepositoryMock,
      movieRepositoryMock,
      categoryRepositoryMock,
      movieCategoryRepositoryMock,
      userMovieRepositoryMock
    )

    const result = await addNewUserFavoriteUseCase.execute(1, '123', [2], 'Movie')

    expect(result.code).toBe(UseCaseResponsesEnum.InvalidCategories)
    expect(result.body).toEqual('Invalid categories.')
    expect(categoryRepositoryMock.getManyByIds).toHaveBeenCalledWith([2])
  })

  // it('should not save a new user favorite movie with duplicate IMDB ID', async () => {
  //   const userRepositoryMock: IUserRepository = {
  //     getById: jest.fn().mockResolvedValue({ id: 1, name: 'John', email: 'john@example.com' }),
  //     getByEmail: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
  //     save: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
  //   }

  //   const movieRepositoryMock: IMovieRepository = {
  //     getByImdb: jest.fn().mockResolvedValue({ imdbId: '123', title: 'Movie' }),
  //     save: jest.fn().mockResolvedValue(undefined),
  //     getManyById: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
  //   }

  //   const categoryRepositoryMock: ICategoryRepository = {
  //     getManyByIds: jest.fn().mockResolvedValue([{ id: 1, name: 'Action' }]),
  //     getById: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
  //   }

  //   const movieCategoryRepositoryMock: IMovieCategoryRepository = {
  //     save: jest.fn().mockResolvedValue([{ movieId: 1, categoryId: 1 }]),
  //     getById: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
  //   }

  //   const userMovieRepositoryMock: IUserMovieRepository = {
  //     save: jest.fn().mockResolvedValue({ userId: 1, movieId: 1 }),
  //     getByUserId: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
  //     deleteByUserMovieId: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
  //   }

  //   const addNewUserFavoriteUseCase = new AddNewUserFavoriteUseCase(
  //     userRepositoryMock,
  //     movieRepositoryMock,
  //     categoryRepositoryMock,
  //     movieCategoryRepositoryMock,
  //     userMovieRepositoryMock
  //   )

  //   const result = await addNewUserFavoriteUseCase.execute(1, '123', [1], 'Movie')

  //   expect(result.code).toBe(UseCaseResponsesEnum.DuplicateImdbId)
  //   expect(result.body).toBe('Duplicate IMDB ID')
  //   expect(userRepositoryMock.getById).toHaveBeenCalledWith(1)
  //   expect(movieRepositoryMock.getByImdb).toHaveBeenCalledWith('123')
  //   expect(movieRepositoryMock.save).not.toHaveBeenCalled()
  //   expect(categoryRepositoryMock.getManyByIds).not.toHaveBeenCalled()
  //   expect(movieCategoryRepositoryMock.save).not.toHaveBeenCalled()
  //   expect(userMovieRepositoryMock.save).not.toHaveBeenCalled()
  // })

  it('should save a new user favorite movie with existing movie and categories', async () => {
    const userRepositoryMock: IUserRepository = {
      getById: jest.fn().mockResolvedValue({ id: 1, name: 'John', email: 'john@example.com' }),
      getByEmail: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      save: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const movieRepositoryMock: IMovieRepository = {
      getByImdb: jest.fn().mockResolvedValue({ imdbId: '123', title: 'Movie' }),
      getManyById: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      save: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const categoryRepositoryMock: ICategoryRepository = {
      getManyByIds: jest.fn().mockResolvedValue([{ id: 1, name: 'Action' }]),
      getById: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const movieCategoryRepositoryMock: IMovieCategoryRepository = {
      save: jest.fn().mockResolvedValue([{ movieId: 1, categoryId: 1 }]),
      getById: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const userMovieRepositoryMock: IUserMovieRepository = {
      save: jest.fn().mockResolvedValue({ userId: 1, movieId: 1 }),
      getByUserId: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      deleteByUserMovieId: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const addNewUserFavoriteUseCase = new AddNewUserFavoriteUseCase(
      userRepositoryMock,
      movieRepositoryMock,
      categoryRepositoryMock,
      movieCategoryRepositoryMock,
      userMovieRepositoryMock
    )

    const result = await addNewUserFavoriteUseCase.execute(1, '123', [1], 'Movie')

    expect(result.code).toBe(UseCaseResponsesEnum.Success)
    expect(result.body).toEqual({ userId: 1, movieId: 1 })
    expect(userRepositoryMock.getById).toHaveBeenCalledWith(1)
    expect(movieRepositoryMock.getByImdb).toHaveBeenCalledWith('123')
    expect(categoryRepositoryMock.getManyByIds).toHaveBeenCalledWith([1])
    expect(movieCategoryRepositoryMock.save).toHaveBeenCalledWith({ imdbId: '123', title: 'Movie' }, [
      { id: 1, name: 'Action' }
    ])
    expect(userMovieRepositoryMock.save).toHaveBeenCalledWith(
      { id: 1, name: 'John', email: 'john@example.com' },
      { imdbId: '123', title: 'Movie' }
    )
  })

  it('should save a new user favorite movie with new movie and categories', async () => {
    const userRepositoryMock: IUserRepository = {
      getById: jest.fn().mockResolvedValue({ id: 1, name: 'John', email: 'john@example.com' }),
      getByEmail: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      save: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const movieRepositoryMock: IMovieRepository = {
      getByImdb: jest.fn().mockResolvedValue(undefined),
      save: jest.fn().mockResolvedValue({ imdbId: '123', title: 'Movie' }),
      getManyById: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const categoryRepositoryMock: ICategoryRepository = {
      getManyByIds: jest.fn().mockResolvedValue([{ id: 1, name: 'Action' }]),
      getById: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const movieCategoryRepositoryMock: IMovieCategoryRepository = {
      save: jest.fn().mockResolvedValue([{ movieId: 1, categoryId: 1 }]),
      getById: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const userMovieRepositoryMock: IUserMovieRepository = {
      save: jest.fn().mockResolvedValue({ userId: 1, movieId: 1 }),
      getByUserId: jest.fn().mockRejectedValue(new Error('Function not implemented.')),
      deleteByUserMovieId: jest.fn().mockRejectedValue(new Error('Function not implemented.'))
    }

    const addNewUserFavoriteUseCase = new AddNewUserFavoriteUseCase(
      userRepositoryMock,
      movieRepositoryMock,
      categoryRepositoryMock,
      movieCategoryRepositoryMock,
      userMovieRepositoryMock
    )

    const result = await addNewUserFavoriteUseCase.execute(1, '123', [1], 'Movie')

    expect(result.code).toBe(UseCaseResponsesEnum.Success)
    expect(result.body).toEqual({ userId: 1, movieId: 1 })
    expect(userRepositoryMock.getById).toHaveBeenCalledWith(1)
    expect(movieRepositoryMock.getByImdb).toHaveBeenCalledWith('123')
    expect(movieRepositoryMock.save).toHaveBeenCalledWith('123', 'Movie')
    expect(categoryRepositoryMock.getManyByIds).toHaveBeenCalledWith([1])
    expect(movieCategoryRepositoryMock.save).toHaveBeenCalledWith({ imdbId: '123', title: 'Movie' }, [
      { id: 1, name: 'Action' }
    ])
    expect(userMovieRepositoryMock.save).toHaveBeenCalledWith(
      { id: 1, name: 'John', email: 'john@example.com' },
      { imdbId: '123', title: 'Movie' }
    )
  })

  it('should return InvalidParameters when userId is missing', async () => {
    const addNewUserFavoriteUseCase = new AddNewUserFavoriteUseCase(
      {} as IUserRepository,
      {} as IMovieRepository,
      {} as ICategoryRepository,
      {} as IMovieCategoryRepository,
      {} as IUserMovieRepository
    )

    const result = await addNewUserFavoriteUseCase.execute(0, '123', [1], 'Movie')

    expect(result.code).toBe(UseCaseResponsesEnum.InvalidParameters)
    expect(result.body).toBe('Missing params: userId, imdbId, categoriesIds or title.')
  })

  it('should return InvalidParameters when imdbId is missing', async () => {
    const addNewUserFavoriteUseCase = new AddNewUserFavoriteUseCase(
      {} as IUserRepository,
      {} as IMovieRepository,
      {} as ICategoryRepository,
      {} as IMovieCategoryRepository,
      {} as IUserMovieRepository
    )

    const result = await addNewUserFavoriteUseCase.execute(1, '', [1], 'Movie')

    expect(result.code).toBe(UseCaseResponsesEnum.InvalidParameters)
    expect(result.body).toBe('Missing params: userId, imdbId, categoriesIds or title.')
  })

  it('should return InvalidParameters when categoriesIds is empty', async () => {
    const addNewUserFavoriteUseCase = new AddNewUserFavoriteUseCase(
      {} as IUserRepository,
      {} as IMovieRepository,
      {} as ICategoryRepository,
      {} as IMovieCategoryRepository,
      {} as IUserMovieRepository
    )

    const result = await addNewUserFavoriteUseCase.execute(1, '123', [], 'Movie')

    expect(result.code).toBe(UseCaseResponsesEnum.InvalidParameters)
    expect(result.body).toBe('Missing params: userId, imdbId, categoriesIds or title.')
  })
})
