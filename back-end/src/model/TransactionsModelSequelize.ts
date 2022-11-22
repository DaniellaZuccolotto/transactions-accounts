import { Transaction } from 'sequelize/types';
import { Op } from 'sequelize';
import Transactions from '../database/models/Transactions';

class TransactionsModelSequelize {
  findTransactions = async (search: string, type: string): Promise<Transactions[] | null> => {
    switch (type) {
      case 'debitedAccountId':
        return Transactions.findAll({ where: { debitedAccountId: search } });
      case 'creditedAccountId':
        return Transactions.findAll({ where: { creditedAccountId: search } });
      case 'createdAt':
        return Transactions.findAll();
      default:
        break;
    }
    return null;
  };

  findTransactionsUser = async (id: number):
  Promise<Transactions[] | null> => Transactions.findAll({ where: {
    [Op.or]: [
      { debitedAccountId: id },
      { creditedAccountId: id },
    ],
  } });

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
