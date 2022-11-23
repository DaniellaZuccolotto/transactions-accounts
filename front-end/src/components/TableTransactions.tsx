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
      <aside className="flex flex-col justify-center items-center h-24">
        <div className="flex justify-evenly h-10">
          <CheckBoxInput selectUser={ selectUser } name="Todos" type="createdAt" />
          <CheckBoxInput selectUser={ selectUser } name="Cash-out" type="creditedAccountId" />
          <CheckBoxInput selectUser={ selectUser } name="Cash-in" type="debitedAccountId" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} >
          <DateFilterInput  register={ register }/>
          <button
            className="self-center w-52 h-8 bg-[#1194f6] text-white text-sm"
          type="submit">Buscar</button>
        </form>
      </aside>
    <table className="flex flex-col">
      <thead className="flex self-center w-[42rem] h-10 shadow-md">
        <tr className="flex justify-evenly w-[42rem] h-10">
        {Thead.map((item) => <th className="w-56" key={item}>{item}</th>)}
        </tr>
      </thead>
      <tbody className="flex flex-col self-center w-[42rem] shadow-md">
         { !transactions || !users ? <tr><td>Carregando...</td></tr> :
            transactions.map((transaction, i) => (
            <tr
            className="flex justify-evenly items-center w-[42rem] h-10 shadow-md"
            key={i}>
              <td className="w-56 text-center">{ users.find((user: any) => user.accountId === transaction.creditedAccountId ).username }</td>
              <td className="w-56 text-center">
              { users.find((user: any) => user.accountId === transaction.debitedAccountId ).username }
              </td>
              <td className="w-56 text-center">{transaction.value}</td>
              <td className="w-56 text-center">{ dateFormater(transaction.createdAt) }</td>
            </tr>
          ))}
      </tbody>
    </table>
    </div>
  );
}

export default TableTransactions;