import { createContext, Dispatch } from 'react';
import { IAccount } from '../interfaces/IAccount';
import { ITransactionGet } from '../interfaces/ITransactionsGet';

export interface ContextInterface {
  accountUser: IAccount;
  setAccountUser: Dispatch<IAccount>;
  transactions: ITransactionGet[];
  setTransactions: Dispatch<ITransactionGet[]>;
  users: any; 
  setUsers: Dispatch<any>;
}

const Context = createContext<ContextInterface | null>(null);

export default Context;