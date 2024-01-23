import { Request, Response } from "express"
import { userRepository } from "../repositories/userRepository"
import { userFavoriteRepository } from "../repositories/userFavoriteRepository"

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body
    
    // TODO implement a cool validator
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'You must provide a name, email and password.' })
    }

    try {
      const newUser = userRepository.create({
        name, email, password
      })

      await userRepository.save(newUser)
      return res.status(201).json({ newUser })
    } catch (error: any) {
      if (error.code === '23505') {
        return res.status(409).json({ message: `Email: ${email} already registered!` })
      }
      return res.status(500).json({ message: error.detail })
    }
  }

  async addFavorite(req: Request, res: Response) {
    const { userId } = req.params
    const { imdbId, category, movieName } = req.body

    try {
      const user = await userRepository.findOneBy({ id: Number(userId) })

      // TODO implement cool validators
      if (!user) {
        return res.status(404).json({ message: 'You must be registered to add an favorite.' })
      }
      if (!imdbId || !category || !movieName) {
        return res.status(404).json({ message: 'You must provide an imdbId, category and movieName.' })
      }

      const newFavorite = userFavoriteRepository.create({
        category,
        user,
        movie_name: movieName,
        imdb_id: imdbId,
      })

      await userFavoriteRepository.save(newFavorite)

      return res.status(200).json({ message: 'Favorite added successfully!' })

    } catch (error: any) {
      return res.status(500).json({ message: error.detail })
    }
  }  
}