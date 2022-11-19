import Accounts from '../database/models/Accounts';
import { IAccount } from '../interfaces/IAccounts';
import { Transaction } from 'sequelize/types';

class AccountModelSequelize {

  public async findOne(id:number): Promise<Accounts | null> {
    const user = await Accounts.findOne({ where: { id } });
    return user;
  }

  public async createAccount(balance: number, t: Transaction): Promise<Accounts> {
    return Accounts.create({ balance }, { transaction: t });
  }

  public async updateBalance(id: number, balance: number, t: Transaction): Promise<any> {
    return Accounts.update({ balance }, { where: { id } , transaction: t });
  }
}

export default AccountModelSequelize;
