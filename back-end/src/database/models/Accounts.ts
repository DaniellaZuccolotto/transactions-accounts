import { Model, INTEGER } from 'sequelize';
import db from '.';
import Users from './Users';
import Transactions from './Transactions';

class Accounts extends Model {
  id!: number;
  balance!: string;
}

Accounts.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'accounts',
  timestamps: false,
});

// Transactions.belongsTo(Accounts, { foreignKey: 'id', as: 'account' });
Accounts.hasMany(Transactions, { foreignKey: 'id', as: 'debitedAccount' });
Accounts.hasMany(Transactions, { foreignKey: 'id', as: 'creditedAccount' });
Accounts.belongsTo(Users, { foreignKey: 'id', as: 'user' });

export default Accounts;