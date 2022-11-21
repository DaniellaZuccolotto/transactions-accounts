import { Transaction } from 'sequelize/types';
import { IUser } from '../interfaces/IUser';
import Users from '../database/models/Users';

export default class UserModelSequelize {
  findOne = async (username:string): Promise<IUser | null> => {
    const user = await Users.findOne({ where: { username } });
    return user;
  };

  findById = async (id:number): Promise<IUser | null> => {
    const user = await Users.findOne({ where: { id } });
    return user;
  };

  findAll = async (): Promise<IUser[]> => {
    const users = await Users.findAll({
      attributes: ['username', 'accountId'],
    });
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
