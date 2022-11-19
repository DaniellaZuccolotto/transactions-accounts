import createToken from '../helpers/createToken';
import { ILogin } from '../interfaces/IUser';
import UserModel from '../model/UserModelSequelize';
import AccountModel from '../model/AccountModelSequelize';
import sequelize from '../database/models'
const md5 = require('md5');

export default class LoginService {

  constructor(
    private userModel = new UserModel(),
    private accountModel = new AccountModel) { }

  findUser = async (username: string) => this.userModel.findOne(username);

  login = async (user: ILogin) => {
    const userResponse = await this.userModel.findOne(user.username);

    if (!userResponse) return { code: 401, message: 'Incorrect email or password' };

    if (userResponse.password !== md5(user.password)) {
      return { code: 401, message: 'Incorrect email or password' };
    }

    const token = createToken(user.username);
    return { code: 202, data: { username: user.username,  token } };
  };

  createUser = async (user: ILogin) => {
    const { username, password } = user;
    const userResponse = await this.userModel.findOne(username);

    if (userResponse) return { code: 409, message: 'User already registered' };
    
    const t = await sequelize.transaction();
   
    try {
      const { id } = await this.accountModel.createAccount(100, t);
      await this.userModel.createUser(username, md5(password), id, t);
      await t.commit();
      const token = createToken(user.username);
      return { code: 201, data: { username: user.username,  token } };
    } catch (error) {  
      await t.rollback();
      return { code: 500, message: 'Internal server error' };
    }
  };
}
