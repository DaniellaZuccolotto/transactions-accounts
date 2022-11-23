import React, { useEffect, useContext, useState } from 'react';
import getUserAccount from '../utils/api/requestAccount';
import Context, { ContextInterface } from '../provider/Context';
import FormTransaction from '../components/FormTransaction';
import TableTransactions from '../components/TableTransactions';
import ButtonNavigate from '../components/ButtonNavigate';
import { div, header } from '../styles/HomePageStyles';

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
    <div className="flex bg-[#f6f6f6] h-screen">
      <header className="flex justify-center items-center bg-[#f8d117] fixed w-full text-center h-14">
        <h1 className="text-xl text-[#0a39ab] font-bold">Autoatendimento</h1>
      </header>
      <main className="flex flex-col justify-evenly h-72 w-60 self-center items-center bg-[#f8d117] shadow-md shadow-slate-500 ml-24">
        <h1 className="text-lg text-[#0a39ab] font-bold">{ `Olá, ${user.username}` }</h1>
        <p>{ `Saldo R$: ${accountUser.balance}` }</p>
        <button
          className="self-center w-52 h-8 bg-[#1194f6] text-white text-sm" 
        type="button" onClick={() => { setTransfer(!transfer) }}>Transferir</button>
        <ButtonNavigate navigate="/" name="Sair" />
      </main>
      <article 
        className="flex flex-col h-[30rem] w-[45rem] self-center items-center bg-[#f8d117] shadow-md shadow-slate-500 ml-24 overflow-y-scroll"
      >
      { transfer && <FormTransaction /> }
      <TableTransactions /> 
      </article>
    </div>
  );
}

export default HomePage;