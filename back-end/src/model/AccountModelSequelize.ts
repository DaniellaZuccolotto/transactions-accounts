import { Transaction } from 'sequelize/types';
import Accounts from '../database/models/Accounts';

class AccountModelSequelize {
  findOne = async (id:number): Promise<Accounts | null> => {
    const user = await Accounts.findOne({ where: { id } });
    return user;
  };

  createAccount = async (
    balance: number,
    t: Transaction,
  ): Promise<Accounts> => Accounts.create({ balance }, { transaction: t });

  updateBalance = (
    id: number,
    balance: number,
    t: Transaction,
  ): Promise<unknown> => Accounts.update({ balance }, { where: { id }, transaction: t });
}

export default AccountModelSequelize;
