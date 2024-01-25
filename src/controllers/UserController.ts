import { Request, Response } from "express"
import { userRepository } from "../repositories/userRepository"
import { userFavoriteRepository } from "../repositories/userFavoriteRepository"
import { validate } from "email-validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

function isEmpty(...args: any[]) {
  args.forEach((element: any) => {
    if (String(element).trim() === '' ) {
      return true
    }
  });
  return false
}

export class UserController {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'You must provide a name, email and password.' })
    }

    if (!validate(email)) {
      return res.status(400).json({ message: 'Email is not valid' })
    }

    try {
      const encryptedPass = await bcrypt.hash(password, 10)

      const newUser = userRepository.create({
        name, email, password: encryptedPass
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
    const { userId } = req.body
    const { imdbId, category, movieName } = req.body

    try {
      const user = await userRepository.findOneBy({ id: Number(userId) })

      // TODO implement cool validators
      if (!user) {
        return res.status(404).json({ message: 'You must be registered to add an favorite.' })
      }
      if (!imdbId || !category || !movieName) {
        return res.status(400).json({ message: 'You must provide an imdbId, category and movieName.' })
      }

      const newFavorite = userFavoriteRepository.create({
        category,
        user,
        movie_name: movieName,
        imdb_id: imdbId,
      })

      await userFavoriteRepository.save(newFavorite)

      return res.status(200).json(newFavorite)

    } catch (error: any) {
      return res.status(500).json({ message: error.detail })
    }
  }  

  async findAllUserFavorites(req: Request, res: Response) {
    const { userId } = req.body

    try {
      const userFavorites = await userFavoriteRepository.findBy({ user: {
        id: Number(userId)
      } })

      res.status(200).json({ userId, userFavorites })

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
          userTokenRepository.update({ user: {id: userFound.id }}, { refresh_token: refreshToken })
        } else {
          const newUserToken = userTokenRepository.create({ refresh_token: refreshToken, user: userFound })
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