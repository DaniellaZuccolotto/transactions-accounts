import UserModel from '../model/UserModelSequelize';
import AccountModel from '../model/AccountModelSequelize';
import Transactions from '../model/TransactionsModelSequelize';
import sequelize from '../database/models';
import { IUser } from '../interfaces/IUser';

export default class TransactionService {
  constructor(
    private userModel = new UserModel(),
    private accountModel = new AccountModel(),
    private transactionModel = new Transactions(),
  ) { }

  verifyBalance = async (userDeb: IUser, userCred: IUser, value: number): Promise<any> => {
    const balanceDeb = await this.accountModel.findOne(userDeb.accountId);
    const balanceCred = await this.accountModel.findOne(userCred.accountId);
    if (!balanceCred || !balanceDeb) {
      return { code: 401, message: 'Incorrect email or password' };
    }
    if (Number(balanceDeb.balance) < Number(value) || Number(value) < 0) {
      return { code: 400, message: 'Insufficient funds' };
    }
    const newBalanceDeb = Number(balanceDeb.balance) - Number(value);
    const newBalanceCred = Number(balanceCred.balance) + Number(value);
    return { newBalanceDeb, newBalanceCred };
  };

  verifyUser = async (usernameD: string, usernameC: string): Promise<any> => {
    if (usernameD === usernameC) return { code: 400, message: 'You cannot transfer to yourself' };
    const uDeb = await this.userModel.findOne(usernameD);
    const uCre = await this.userModel.findOne(usernameC);
    if (!uDeb || !uCre) return { code: 401, message: 'User not exists' };
    return { uDeb, uCre };
  };

  createTransaction = async (usernameD: string, usernameC: string, value: number) => {
    const checkUser = await this.verifyUser(usernameD, usernameC);
    if (checkUser.code) return checkUser;
    const checkBal = await this.verifyBalance(checkUser.uDeb, checkUser.uCre, value);
    if (checkBal.code) return checkBal;
    const t = await sequelize.transaction();
    try {
      await this.accountModel.updateBalance(checkUser.uDeb.id, checkBal.newBalanceDeb, t);
      await this.accountModel.updateBalance(checkUser.uCre.id, checkBal.newBalanceCred, t);
      await this.transactionModel.createTransaction(checkUser.uDeb.id, checkUser.uCre.id, value, t);
      await t.commit();
      return { code: 200, message: 'Transaction successful' };
    } catch (error) {
      await t.rollback();
      return { code: 500, message: error };
    }
  };

  findTransactions = async (search: string, type: string) => {
    const transactions = await this.transactionModel.findTransactions(search, type);
    if (!transactions) return { code: 404, message: 'Transactions not found' };
    return { code: 200, transactions };
  };

  findTransactionsUser = async (id: number) => {
    const transactions = await this.transactionModel.findTransactionsUser(id);
    if (!transactions) return { code: 404, message: 'Transactions not found' };
    return { code: 200, transactions };
  };
}
