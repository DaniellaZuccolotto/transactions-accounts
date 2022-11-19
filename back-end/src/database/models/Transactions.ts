import { Model, INTEGER, DATE } from 'sequelize';
import db from '.';
import Accounts from './Accounts';

class Transactions extends Model {
  id!: number;
  debitedAccountId!: number;
  creditedAccountId!: number;
  value!: number;
  createdAt!: Date;
}

Transactions.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  debitedAccountId: {
    type: INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    references: {
      model: 'accounts',
      key: 'id',
    },
  },
  creditedAccountId: {
    type: INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    references: {
      model: 'accounts',
      key: 'id',
    },
  },
  value: {
    type: INTEGER,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DATE,
  },
}, {
  sequelize: db,
  modelName: 'accounts',
  createdAt: true,
  updatedAt: false,
});

// Transactions.belongsTo(Accounts, { foreignKey: 'debitedAccountId', as: 'account' });
// Transactions.belongsTo(Accounts, { foreignKey: 'creditedAccountId', as: 'account' });

export default Transactions;
