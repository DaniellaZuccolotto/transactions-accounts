import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
// import UserModel from '../model/userModelSequelize';
import LoginService from '../services/LoginService';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

interface IToken {
  id: number,
  username: string,
}

// interface NewRequest extends Request {
//   userRole?: string,
// }

export default async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token || token.length === 0) {
      return next({ code: 401, message: 'Token not found' });
    }
    const validateToken: IToken = verify(token, JWT_SECRET) as IToken;
    const service = new LoginService();
    const userResponse = await service.findUser(validateToken.username);
    if (!userResponse) return next({ code: 401, message: 'Token must be a valid token' });

    next();
  } catch (err) {
    next({ code: 401, message: 'Token must be a valid token' });
  }
};
