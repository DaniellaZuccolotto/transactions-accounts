import React, { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import getTransactions from '../utils/api/requestGetTransations';
import getUsers from '../utils/api/requestUsers';
import Context, { ContextInterface } from '../provider/Context';
import dateFormater from '../utils/dateFormater';
import { CheckBoxInput, DateFilterInput } from './inputs';
import filterTransactions from '../utils/api/requestFilterTransaction';
import { IUser } from '../interfaces/IUser';

interface IData {
  search: string;
}

function TableTransactions() {
  const { transactions, setTransactions, users, setUsers } = useContext(Context) as ContextInterface;
  const { register, handleSubmit } = useForm<IData>();
  const Thead = [ 'Realizado Por', 'Recebido Por', 'Valor', 'Data' ];
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const getAllTransactions = async () => {
    const transactions = await getTransactions(user.accountId, user.token);
    const users = await getUsers();   
    setTransactions(transactions);
    setUsers(users as IUser[]);
  };

  useEffect(() => {
    if (transactions.length === 0) {
      getAllTransactions();
    }
  });

  const selectUser = async (type: string) => {
    const filter = await filterTransactions(user.accountId, type, user.token);
    if (filter.length === 0) {
      alert('Nenhuma transação encontrada');
      return null;
    }
    setTransactions(filter);  
  };

  const onSubmit = async (data: any) => {
    const transactionsDate = await filterTransactions(user.accountId, 'createdAt', user.token);    
    const filter = transactionsDate.filter((transaction: any) => transaction.createdAt
      .includes(data.search));
    if (filter.length === 0) {
      alert('Não existem transações nessa data');
      return null;
    }   
    setTransactions(filter);    
  };  
  
  return (
    <div>
      <CheckBoxInput selectUser={ selectUser } name="Todos" type="createdAt" />
      <CheckBoxInput selectUser={ selectUser } name="Cash-in" type="creditedAccountId" />
      <CheckBoxInput selectUser={ selectUser } name="Cash-out" type="debitedAccountId" />
      <form onSubmit={handleSubmit(onSubmit)} >
        <DateFilterInput  register={ register }/>
        <button type="submit">Send</button>
      </form>
    <table>
      <thead>
        <tr>
        {Thead.map((item) => <th key={item}>{item}</th>)}
        </tr>
      </thead>
      <tbody>
         { !transactions || !users ? <tr><td>Carregando...</td></tr> :
            transactions.map((transaction, i) => (
            <tr key={i}>
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
    </div>
  );
}

export default TableTransactions;