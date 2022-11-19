import { Transaction } from 'sequelize/types';
import Transactions from '../database/models/Transactions';

class TransactionsModelSequelize {
  findTransactions = async (search: string, type: string): Promise<Transactions[] | null> => {
    switch (type) {
      case 'debitedAccountId':
        return Transactions.findAll({ where: { debitedAccountId: search } });
      case 'creditedAccountId':
        return Transactions.findAll({ where: { creditedAccountId: search } });
      case 'createdAt':
        return Transactions.findAll({ where: { createdAt: search } });
      default:
        break;
    }
    return null;
  };

  createTransaction = async (
    debitedAccountId: number,
    creditedAccountId: number,
    value: number,
    t: Transaction,
  ): Promise<Transactions> => Transactions.create({
    debitedAccountId,
    creditedAccountId,
    value,
    createdAt: new Date() }, { transaction: t });
}

export default TransactionsModelSequelize;
