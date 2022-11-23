import React from 'react';
import { useForm } from 'react-hook-form';
import { NameTransaction, ValueInput  } from '../components/inputs';
import { IDataTransaction } from '../interfaces/ITransaction';
import createTransaction from '../utils/api/requestTransaction';

function FormTransaction() {
  const { register, handleSubmit } = useForm<IDataTransaction>();

  const onSubmit = async (data: IDataTransaction) => {    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const body = {
      usernameD: user.username,
      usernameC: data.usernameC,
      value: data.value,
    }
    const transaction = await createTransaction(body, user.token);
    console.log(transaction);
    
    if (transaction.data) {
      alert(transaction.data.message);
      return null;
    }
    alert(transaction.message);
    window.location.reload(); 
  };

  return (
    <section className="mt-4 h-36 flex flex-col">
      <form
        className='flex flex-col items-center justify-evenly'
        onSubmit={handleSubmit(onSubmit)}
      >
        <NameTransaction register={ register } />
        <ValueInput register={ register } />
        <button
        className="self-center w-52 h-8 bg-[#1194f6] text-white text-sm mt-4"
        type="submit">Tranferir</button>
      </form>
    </section>
  );
}

export default FormTransaction;