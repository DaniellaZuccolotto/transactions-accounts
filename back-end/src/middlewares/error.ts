import { NextFunction, Request, Response } from 'express';

interface ICustomError extends Error {
  code: number,
  message: string,
}

export default (err: ICustomError, _req: Request, res: Response, _next: NextFunction) => {
  // console.log('erro:', err);

  if (err.code) {
    return res.status(err.code).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ message: 'Internal server error' });
};
