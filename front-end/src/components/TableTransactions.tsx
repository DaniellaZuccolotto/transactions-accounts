import React, { useEffect, useContext, useState } from 'react';
import getTransactions from '../utils/api/requestGetTransations';
import getUsers from '../utils/api/requestUsers';
import Context, { ContextInterface } from '../provider/Context';
import dateFormater from '../utils/dateFormater';

function TableTransactions() {
  const { transactions, setTransactions } = useContext(Context) as ContextInterface;
  const [users, setUsers] = useState([] as any);
  const Thead = [ 'Realizado Por', 'Recebido Por', 'Valor', 'Data' ];

  const getAllTransactions = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const transactions = await getTransactions(user.accountId, user.token);
    const users = await getUsers();
    setTransactions(transactions);
    setUsers(users);
  };

  useEffect(() => {
    if (transactions.length === 0) {
      getAllTransactions();
    }
  });

  return (
    <table>
      <thead>
        <tr>
        {Thead.map((item) => <th key={item}>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{ users.find((user: any) => user.accountId === transaction.creditedAccountId ).username }</td>
            <td>
            { users.find((user: any) => user.accountId === transaction.debitedAccountId ).username }
            </td>
            <td>{transaction.value}</td>
            <td>{ dateFormater(transaction.createdAt) }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableTransactions;