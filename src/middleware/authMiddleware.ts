import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { userTokenRepository } from "../repositories/userTokenRepository";
import { ApiResponse } from "../enums/ApiResponse";

declare module 'express' {
  interface Request {
    userId?: string;
  }
}

export async function verifyToken(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(ApiResponse.Unauthorized).json({ message: 'Access denied' })
  }
  try {
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET || "")
    req['userId'] = decodedToken.id
    next()
  } catch (error) {
    res.status(ApiResponse.Unauthorized).json({ message: 'Invalid token' })
  }
}

export async function refreshToken(req: Request, res: Response): Promise<Response | undefined>  {
  const refreshToken = req.headers['refreshtoken']

  try {
    
    if (!refreshToken) {
      return res.status(ApiResponse.BadRequest).json({ message: 'No refresh token provided.' })  
    }

    // is token valid?
    const decodedUserToken: any = jwt.verify(String(refreshToken), process.env.JWT_SECRET || "")

    // token exists on database?
    await userTokenRepository.getByRefreshToken(refreshToken.toString())

    const newAccessToken = jwt.sign({ id: decodedUserToken.id }, process.env.JWT_SECRET || "", {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });

    return res.status(ApiResponse.OK).header('Authorization', newAccessToken).json({ message: 'New access token generated' })
  } catch (error: any) {
    return res.status(ApiResponse.InternalServerError).json({ message: error.detail })
  }
}