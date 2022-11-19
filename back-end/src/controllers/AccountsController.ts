import { NextFunction, Request, Response } from 'express';
import { ILogin } from '../interfaces/IUser';
import AccountsService from '../services/AccountsService';

interface NewRequest extends Request {
  userRole?: string,
}

export default class LoginController {
  private accountsService: AccountsService;

  constructor() {
    this.accountsService = new AccountsService();
  }

  getUserAccount = async (req: NewRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { code, account } = await this.accountsService.getUserAccount(Number(id));
    return res.status(code).json({ account });
  };
}
