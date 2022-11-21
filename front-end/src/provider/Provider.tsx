import React, { ReactNode, useState } from 'react';
import Context, { ContextInterface } from './Context';
import { ITransactionGet } from '../interfaces/ITransactionsGet';

interface Props {
  children: ReactNode;
}

function Provider({ children }: Props) {
  const [accountUser, setAccountUser] = useState({
    id: '',
    balance: '',
  });
  const [transactions, setTransactions] = useState([] as ITransactionGet[]);

  const value: ContextInterface = {
    accountUser,
    setAccountUser,
    transactions,
    setTransactions,
  };

  return (
    <Context.Provider value={ value }>
      {children}
    </Context.Provider>
  );
}

export default Provider;