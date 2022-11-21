import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NameTransaction, ValueInput  } from '../components/inputs';
import { IDataTransaction } from '../interfaces/ITransaction';
import createTransaction from '../utils/api/requestTransaction';

function FormTransaction() {
  const { register, handleSubmit } = useForm<IDataTransaction>();
  const [message, setMessage] = useState('');

  const onSubmit = async (data: IDataTransaction) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const body = {
      usernameD: user.username,
      usernameC: data.usernameC,
      value: data.value,
    }
    const transaction = await createTransaction(body, user.token);
    if (transaction.data) {
      setMessage(transaction.data.message);
      return null;
    }
    setMessage(transaction.message); 
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <NameTransaction register={ register } />
        <ValueInput register={ register } />
        <button type="submit">Realizar Transferência</button>
      </form>
      { message !== '' && <p>{ message }</p>  }
    </section>
  );
}

export default FormTransaction;