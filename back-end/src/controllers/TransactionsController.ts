import { Request, Response } from 'express';
import TransactionsService from '../services/TransactionsService';
import { Transaction } from '../interfaces/Transaction';
import { FindTransaction } from '../interfaces/FindTransaction';

export default class TransactionsController {
  private transactionsService: TransactionsService;

  constructor() {
    this.transactionsService = new TransactionsService();
  }

  createTransaction = async (req: Request, res: Response) => {
    const { usernameC, usernameD, value } = req.body as Transaction;
    const { code, message } = await this
      .transactionsService.createTransaction(usernameD, usernameC, value);
    res.status(code).json({ message });
  };

  findTransactions = async (req: Request, res: Response) => {
    const { search, type } = req.query as unknown as FindTransaction;

    const { code, message, transactions } = await this
      .transactionsService.findTransactions(search, type);
    res.status(code).json({ message, transactions });
  };
}
