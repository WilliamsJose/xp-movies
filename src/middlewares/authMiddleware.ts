import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { HTTPStatusCode } from '../enums'

declare module 'express' {
  interface Request {
    userId?: string
  }
}

export async function verifyToken(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
  const token = req.header('authorization')
  if (!token) {
    return res.status(HTTPStatusCode.Unauthorized).json({ message: 'Access denied' })
  }
  try {
    const decodedToken: any = jwt.verify(token, process.env.ACCESS_SECRET || '')
    req.query['userId'] = decodedToken.id
    next()
  } catch (error) {
    res.status(HTTPStatusCode.Unauthorized).json({ message: 'Invalid token' })
  }
}
