import { Request, Response } from "express"
import { UserRepository } from "../repositories/userRepository"

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body
    
    // TODO implement a cool validator
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'You must provide a name, email and password.' })
    }

    try {
      const newUser = UserRepository.create({
        name, email, password
      })

      await UserRepository.save(newUser)
      return res.status(201).json({ newUser })
    } catch (error: any) {
      if (error.code === '23505') {
        return res.status(409).json({ message: `Email: ${email} already registered!` })
      }
      return res.status(500).json({ message: error.detail })
    }
  }
}