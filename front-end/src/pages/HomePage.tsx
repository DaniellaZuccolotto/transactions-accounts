import React, { useEffect, useContext, useState } from 'react';
import getUserAccount from '../utils/api/requestAccount';
import Context, { ContextInterface } from '../provider/Context';
import FormTransaction from '../components/FormTransaction';
import TableTransactions from '../components/TableTransactions';

function HomePage() {
  const { accountUser, setAccountUser } = useContext(Context) as ContextInterface;
  const [transfer, setTransfer] = useState(false);
  const [transactions, setTransactions] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');  
  
  const getAccount = async () => {    
    const account = await getUserAccount(user.accountId, user.token);
    setAccountUser(account);   
  };

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>{ `Olá, ${user.username}` }</p>
      <p>{ `R$: ${accountUser.balance}` }</p>
      <button type="button" onClick={() => { setTransfer(!transfer) }}>Transferir</button>
      <button type="button" onClick={() => { setTransactions(!transactions) }}>Visualizar Transações</button>
      { transfer && <FormTransaction /> }
      { transactions && <TableTransactions /> }
    </div>
  );
}

export default HomePage;