import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Accounts from './Accounts';

class Users extends Model {
  id!: number;
  username!: string;
  password!: string;
  accountId!: number;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING(30),
    allowNull: false,
  },
  password: {
    type: STRING(100),
  },
  accountId: {
    type: INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    references: {
      model: 'accounts',
      key: 'id'
    }
  }
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

// Users.hasOne(Accounts, { foreignKey: 'accountId', as: 'account' });
// Accounts.belongsTo(Users, { foreignKey: 'accountId', as: 'user' });

export default Users;
