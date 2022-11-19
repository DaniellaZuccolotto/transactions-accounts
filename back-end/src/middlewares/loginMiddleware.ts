import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../interfaces/IUser';

export default (req: Request, _res: Response, next: NextFunction) => {
  const { username, password } = req.body as ILogin;
  const regexPassword = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/;
  if (!username || !password) {
    return next({ code: 400, message: 'All fields must be filled' });
  }
  if (username.length < 3) {
    return next({ code: 400, message: 'Username must have at least 3 characters' });
  }
  if (!password.match(regexPassword)) {
    return next({
      code: 400,
      message: 'Password must contain at least one uppercase letter,'
      + 'one number and at least 8 characters',
    });
  }
  next();
};
