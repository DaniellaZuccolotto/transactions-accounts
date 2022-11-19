import { Model, INTEGER, DATE, DECIMAL } from 'sequelize';
import db from '.';

class Transactions extends Model {
  id!: number;
  debitedAccountId!: number;
  creditedAccountId!: number;
  value!: number;
  createdAt!: string;
}

Transactions.init(
  {
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
      type: DECIMAL,
      allowNull: false,
    },
    createdAt: {
      type: DATE,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'transactions',
    updatedAt: false,
  },
);

export default Transactions;
