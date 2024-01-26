import { Request, Response } from "express"
import { userRepository } from "../repositories/userRepository"
import { userMovieRepository } from "../repositories/userMovieRepository"
import { validate } from "email-validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { userTokenRepository } from "../repositories/userTokenRepository";
import { movieRepository } from "../repositories/movieRepository";
import { categoryRepository } from "../repositories/categoryRepository";
  async addFavorite(req: Request, res: Response): Promise<Response> {
    const { userId } = req
    const { imdbId, categoryId, title } = req.body

    try {
      const user = await userRepository.findOneBy({ id: Number(userId) })

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

  async login(req: Request, res: Response) {
    const { email, password } = req.body

    try {
      
      const userFound = await userRepository.findOneByOrFail({ email })
      
      const successLogin = await bcrypt.compare(password, userFound.password)

      if (successLogin) {
        const accessToken = jwt.sign({ id: userFound.id }, process.env.JWT_SECRET || "", {
          expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
        });

        const refreshToken = jwt.sign({ id: userFound.id }, process.env.JWT_SECRET || "", {
          expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        });

        const refreshTokenFound = await userTokenRepository.findOneBy({ user: { id: userFound.id } })

        if (refreshTokenFound) {
          userTokenRepository.update({ user: {id: userFound.id }}, { refreshToken })
        } else {
          const newUserToken = userTokenRepository.create({ refreshToken, user: userFound })
          userTokenRepository.save(newUserToken)
        }

        return res
          .header('Authorization', accessToken)
          .header('refreshToken', refreshToken)
          .status(200)
          .json({ message: 'Sign in Successfully!' })
      } else {
        return res.status(400).json({ message: 'Wrong Email or Password' })
      }

    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }
}