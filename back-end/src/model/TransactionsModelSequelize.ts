import Transactions from '../database/models/Transactions';
import { Transaction } from 'sequelize/types';

class TransactionsModelSequelize {

  public async findTransactions(search: string): Promise<Transactions[] | null> {
    const transactions = await Transactions.findAll({
      where: { 
        $or:[{ createdAt: search }, { id: search }], 
      }});
    return transactions;
  };

  public async createTransaction(debitedAccountId: number,
    creditedAccountId: number, value: number, t: Transaction): Promise<Transactions> {
    console.log(debitedAccountId, creditedAccountId, value);      
    return Transactions.create({ debitedAccountId, creditedAccountId, value, createdAt: new Date()}, { transaction: t });
  }
}

export default TransactionsModelSequelize;
