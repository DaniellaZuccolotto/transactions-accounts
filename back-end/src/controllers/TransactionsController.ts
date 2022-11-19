import { NextFunction, Request, Response } from 'express';
import TransactionsService from '../services/TransactionsService';

interface NewRequest {
  usernameD: string,
  usernameC: string,
  value: number,
}

export default class LoginController {
  private transactionsService: TransactionsService;

  constructor() {
    this.transactionsService = new TransactionsService();
  }

  createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    const { usernameC, usernameD, value } = req.body as NewRequest;
    console.log(req.body);
    
    const { code, message } = await this.transactionsService.createTransaction(usernameD, usernameC, value);
    res.status(code).json({ message });
  };
}
