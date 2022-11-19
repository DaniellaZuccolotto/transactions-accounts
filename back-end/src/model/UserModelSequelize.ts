import { Transaction } from 'sequelize/types';
import { IUser } from '../interfaces/IUser';
import Users from '../database/models/Users';

export default class UserModelSequelize {
  findOne = async (username:string): Promise<IUser | null> => {
    const user = await Users.findOne({ where: { username } });
    return user;
  };

  findAll = async (): Promise<IUser[]> => {
    const users = await Users.findAll();
    return users;
  };

  deleteUser = async (username:string): Promise<void> => {
    await Users.destroy({ where: { username } });
  };

  createUser = async (
    username:string,
    password:string,
    accountId: number,
    t: Transaction,
  ): Promise<IUser> => {
    const user = await Users.create({ username, password, accountId }, { transaction: t });
    return user;
  };
}
