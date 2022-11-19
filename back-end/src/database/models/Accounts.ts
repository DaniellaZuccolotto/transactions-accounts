import { Model, INTEGER, DECIMAL } from 'sequelize';
import db from '.';
import Transactions from './Transactions';
import Users from './Users';

class Accounts extends Model {
  id!: number;
  balance!: number;
}

Accounts.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: {
    type: DECIMAL,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'accounts',
  timestamps: false,
});

Accounts.belongsTo(Users, { foreignKey: 'id', as: 'account' });

Accounts.hasMany(Transactions, {
  foreignKey: 'id',
  as: 'debitedTransaction',
});
Accounts.hasMany(Transactions, {
  foreignKey: 'id',
  as: 'creditedTransaction',
});

export default Accounts;
