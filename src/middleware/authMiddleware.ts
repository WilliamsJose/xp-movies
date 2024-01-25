import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { userTokenRepository } from "../repositories/userTokenRepository";

declare module 'express' {
  interface Request {
    userId?: string;
  }
}

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(401).json({ message: 'Access denied' })
  }
  try {
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET || "")
    req['userId'] = decodedToken.id
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

export async function refreshToken(req: Request, res: Response) {
  const refreshToken = req.headers['refreshtoken']

  try {
    
    if (!refreshToken) {
      return res.status(403).json({ message: 'No refresh token provided.' })  
    }

    // is token valid?
    const decodedUserToken: any = jwt.verify(String(refreshToken), process.env.JWT_SECRET || "")

    // token exists on database?
    await userTokenRepository.findOneByOrFail({ refresh_token: String(refreshToken) })

    const newAccessToken = jwt.sign({ id: decodedUserToken.id }, process.env.JWT_SECRET || "", {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });

    return res.status(200).header('Authorization', newAccessToken).json({ message: 'New access token generated' })
  } catch (error: any) {
    return res.status(500).json({ message: error.detail })
  }
}