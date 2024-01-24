import jwt from "jsonwebtoken"

export default function verifyToken(req, res, next) {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(401).json({ message: 'Access denied' })
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "")
    req.body.userId = decodedToken.id
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}