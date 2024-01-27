import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { userTokenRepository } from "../repositories/userTokenRepository";
import { HTTPStatusCode } from "../enums/HTTPStatusCode";

declare module 'express' {
  interface Request {
    userId?: string;
  }
}

export async function verifyToken(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(HTTPStatusCode.Unauthorized).json({ message: 'Access denied' })
  }
  try {
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET || "")
    req['userId'] = decodedToken.id
    next()
  } catch (error) {
    res.status(HTTPStatusCode.Unauthorized).json({ message: 'Invalid token' })
  }
}

export async function refreshToken(req: Request, res: Response): Promise<Response | undefined>  {
  const refreshToken = req.headers['refreshtoken']

  try {
    
    if (!refreshToken) {
      return res.status(HTTPStatusCode.BadRequest).json({ message: 'No refresh token provided.' })  
    }

    // is token valid?
    const decodedUserToken: any = jwt.verify(String(refreshToken), process.env.JWT_SECRET || "")

    // token exists on database?
    await userTokenRepository.getByRefreshToken(refreshToken.toString())

    const newAccessToken = jwt.sign({ id: decodedUserToken.id }, process.env.JWT_SECRET || "", {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });

    return res.status(HTTPStatusCode.OK).header('Authorization', newAccessToken).json({ message: 'New access token generated' })
  } catch (error: any) {
    return res.status(HTTPStatusCode.InternalServerError).json({ message: error })
  }
}