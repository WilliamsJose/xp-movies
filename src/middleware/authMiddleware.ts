import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

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
