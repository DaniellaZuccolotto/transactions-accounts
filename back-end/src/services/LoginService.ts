import * as md5 from 'md5';
import createToken from '../helpers/createToken';
import { ILogin } from '../interfaces/IUser';
import UserModel from '../model/UserModelSequelize';
import AccountModel from '../model/AccountModelSequelize';
import sequelize from '../database/models';

export default class LoginService {
  constructor(
    private userModel = new UserModel(),
    private accountModel = new AccountModel(),
  ) { }

  findUser = async (username: string) => { this.userModel.findOne(username); };

  login = async (user: ILogin) => {
    const userResponse = await this.userModel.findOne(user.username);

    if (!userResponse) return { code: 401, message: 'User not found' };

    if (userResponse.password !== md5(user.password)) {
      return { code: 401, message: 'Incorrect email or password' };
    }

    const token = createToken(user.username);
    const returnUser = {
      id: userResponse.id,
      username: userResponse.username,
      accountId: userResponse.accountId,
      token
    };
    return { code: 202, data: returnUser };
  };

  sequelizeTransaction = async (username: string, password: string) => {
    const t = await sequelize.transaction();

    try {
      const { id } = await this.accountModel.createAccount(100, t);
      await this.userModel.createUser(username, md5(password), id, t);
      await t.commit();
      const token = createToken(username);
      return { code: 201, data: { id, username, token, accountId: id } };
    } catch (error) {
      await t.rollback();
      return { code: 500, message: error };
    }
  };

  createUser = async (user: ILogin) => {
    const { username, password } = user;
    const userResponse = await this.userModel.findOne(username);

    if (userResponse) return { code: 409, message: 'User already registered' };
    const userCreate = this.sequelizeTransaction(username, password);
    return userCreate;
  };

  findAll = async () => {
    const users = await this.userModel.findAll();
    if (!users) return { code: 404, message: 'Users not found' };
    return { code: 200, data: users };
  };
}
