import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import secretConfig from '../secretConfig'


export const auth = (req: any, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {

    const token = req.headers.authorization?.split(' ')[1] // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: 'No auth, try again' })
    }

    const decoded = jwt.verify(token, secretConfig.jwtKey)
    req.user = decoded
    next()

  } catch (e) {
    res.status(401).json({ message: 'No auth, try again' })
  }
}