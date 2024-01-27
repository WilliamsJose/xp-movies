import { Request, Response } from "express"
import { userRepository } from "../repositories/userRepository"
import { userMovieRepository } from "../repositories/userMovieRepository"
import { movieRepository } from "../repositories/movieRepository";
import { categoryRepository } from "../repositories/categoryRepository";
import { IUserController } from "../interfaces/controllers/IUserController";
import { movieCategoryRepository } from "../repositories/movieCategoryRepository";
import { HTTPStatusCode } from "../enums/HTTPStatusCode";

export class UserController implements IUserController {
  async addFavorite(req: Request, res: Response): Promise<Response> {
    const { userId } = req
    const { imdbId, categoriesIds, title } = req.body

    try {
      if(!userId) throw new Error('Missing param userId')
      
      const user = await userRepository.getById(+userId)

      // TODO implement cool validators
      if (!user) {
        return res.status(HTTPStatusCode.BadRequest).json({ message: 'You must be registered to add an favorite.' })
      }
      if (!imdbId || Array(categoriesIds).length < 1 || !title) {
        return res.status(HTTPStatusCode.BadRequest).json({ message: 'You must provide an imdbId, categoriesIds and title.' })
      }

      let movie = await movieRepository.getByImdb(imdbId) 
      if (!movie) {
        movie = await movieRepository.save(imdbId, title)
      }

      const categories = await categoryRepository.getManyByIds(categoriesIds)
      if (!categories || categories.length === 0) {
        return res.status(HTTPStatusCode.BadRequest).json({ message: 'Invalid categories.' })
      }

      if (movie) {
        await movieCategoryRepository.save(movie, categories) 
        await userMovieRepository.save(user, movie)
      }

      return res.status(HTTPStatusCode.OK).json({ message: 'New favorite movie added!' })
    } catch (error: any) {
      // TODO treat better and not return everything
      return res.status(HTTPStatusCode.InternalServerError).json({ message: error })
    }
  }  

  async getAllFavorites(req: Request, res: Response): Promise<Response> {
    const { userId } = req

    try {

      if (!userId) {
        return res.status(HTTPStatusCode.BadRequest).json({ message: 'You must provide an userId' })
      }

      const userFavorites = await userMovieRepository.getByUserId(+userId)

      return res.status(HTTPStatusCode.OK).json({ userId, userFavorites })
    } catch (error: any) {
      return res.status(HTTPStatusCode.InternalServerError).json({ message: error })
    }
  }
}