import { Request, Response } from "express"
import { userRepository } from "../repositories/userRepository"
import { userMovieRepository } from "../repositories/userMovieRepository"
import { movieRepository } from "../repositories/movieRepository";
import { categoryRepository } from "../repositories/categoryRepository";
import { IUserController } from "../interfaces/controllers/IUserController";

export class UserController implements IUserController {
  async addFavorite(req: Request, res: Response): Promise<Response> {
    const { userId } = req
    const { imdbId, categoryId, title } = req.body

    
    try {
      if(!userId) throw new Error('Missing param userId')
      
      const user = await userRepository.getById(+userId)

      // TODO implement cool validators
      if (!user) {
        return res.status(404).json({ message: 'You must be registered to add an favorite.' })
      }
      if (!imdbId || !categoryId || !title) {
        return res.status(400).json({ message: 'You must provide an imdbId, categoryId and title.' })
      }

      let movie = await movieRepository.findOneBy({ imdbId })
      const categoryExists = await categoryRepository.findOneByOrFail({ id: categoryId })

      if (!movie) {
        movie = movieRepository.create({ imdbId, title, movieCategory: [categoryExists] })
        await movieRepository.save(movie)
      }

      const newFavoriteMovie = userMovieRepository.create({ movie, user })
      await userMovieRepository.save(newFavoriteMovie)

      return res.status(200).json({ message: 'New favorite movie added!' })
    } catch (error: any) {
      // TODO treat better and not return everything
      return res.status(500).json({ message: error })
    }
  }  

  async getAllFavorites(req: Request, res: Response): Promise<Response> {
    const { userId } = req

    try {
      const userFavorites = await userMovieRepository.findBy({ user: {
        id: Number(userId)
      } })

      return res.status(200).json({ userId, userFavorites })
    } catch (error: any) {
      return res.status(500).json({ message: error.detail })
    }
  }
}