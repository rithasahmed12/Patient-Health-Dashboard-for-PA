import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';

interface JwtPayload {
  _id: string;
  role:string
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ message: 'Access denied. No token provided.' });
      return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await UserModel.findOne({_id:decoded._id,role:decoded.role});

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    next();

  } catch (error) {
    console.error('Authorization error:', error);
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export default authMiddleware;
