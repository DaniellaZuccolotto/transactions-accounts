import UserModel from '../model/UserModelSequelize';
import AccountModel from '../model/AccountModelSequelize';
import Transactions from '../model/TransactionsModelSequelize';
import sequelize from '../database/models'
const md5 = require('md5');

export default class TransactionService {
  constructor(
    private userModel = new UserModel(),
    private accountModel = new AccountModel(),
    private transactionsModel = new Transactions(),
    ) { }

  public async createTransaction(usernameD: string, usernameC: string, value: number): Promise<any> {
    if (usernameD === usernameC) return { code: 400, message: 'You cannot transfer to yourself' };
    const userDebited = await this.userModel.findOne(usernameD);
    const userCredited = await this.userModel.findOne(usernameC);
    if (!userDebited || !userCredited ) return { code: 401, message: 'Incorrect email or password' };
    const balanceDebited = await this.accountModel.findOne(userDebited.accountId);    
    const balanceCredited = await this.accountModel.findOne(userCredited.accountId);
    if (!balanceCredited || !balanceDebited) return { code: 401, message: 'Incorrect email or password' };
    if (Number(balanceDebited.balance) < value || value < 0) {
      return { code: 400, message: 'Insufficient funds' };
    }
    const newBalanceDebited = Number(balanceDebited.balance) - value;
    const newBalanceCredited = Number(balanceCredited.balance) + value;

    const t = await sequelize.transaction();

    try {
      await this.accountModel.updateBalance(userDebited.accountId, newBalanceDebited, t);
      await this.accountModel.updateBalance(userCredited.accountId, newBalanceCredited, t);
      await this.transactionsModel.createTransaction(
        userDebited.accountId, userCredited.accountId, value, t);
      await t.commit();
      return { code: 200, message: 'Transaction successful' };      
    } catch (error) {
      await t.rollback();
      console.log(error);      
      return { code: 500, message: 'Internal server error' };
    }    
  };

  public async findTransactions(search: string): Promise<any> {
    const transactions = await this.transactionsModel.findTransactions(search);
    if (!transactions) return { code: 404, message: 'Transactions not found' };
    return { code: 200, message: 'Transaction found', transactions };
  }
}
