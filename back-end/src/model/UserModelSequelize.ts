import { IUser } from '../interfaces/IUser';
import Users from '../database/models/Users';
import { Transaction } from 'sequelize/types';

export default class UserModelSequelize {

  public async findOne(username:string): Promise<IUser | null> {
    const user = await Users.findOne({ where: { username } });
    return user;
  }

  public async findAll(): Promise<IUser[]> {
    const users = await Users.findAll();
    return users;
  }

  public async deleteUser(username:string): Promise<void> {
    await Users.destroy({ where: { username } });
  }

  public async createUser(username:string, password:string, accountId: number, t: Transaction): Promise<IUser> {
    const user = await Users.create({ username, password, accountId }, { transaction: t });
    return user;
  }
}
