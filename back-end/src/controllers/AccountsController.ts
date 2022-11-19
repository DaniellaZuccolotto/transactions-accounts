import { Request, Response } from 'express';
import AccountsService from '../services/AccountsService';

export default class AccountsController {
  private accountsService: AccountsService;

  constructor() {
    this.accountsService = new AccountsService();
  }

  getUserAccount = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { code, account } = await this.accountsService.getUserAccount(Number(id));
    return res.status(code).json({ account });
  };
}
