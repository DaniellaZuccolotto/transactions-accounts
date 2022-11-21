import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { NameInput, PasswordInput  } from '../components/inputs';
import requestUser from '../utils/api/requestCreate';
import { ILogin } from '../interfaces/ILogin';

function RegisterPage() {
  const { register, handleSubmit } = useForm<ILogin>();
  const history = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const onSubmit = async (data: ILogin) => {
    const responseUser = await requestUser(data);
    if (responseUser.data) {
      setMessage(responseUser.data.message);
      setError(true);
      return null
    }
    console.log(responseUser);    
    localStorage.setItem('user', JSON.stringify(responseUser));
    history(`/home/${responseUser.accountId}`);  
  };

  return (
    <div>
        <aside>
          <h1>Registre-se aqui</h1>
        </aside>
        <main>
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <NameInput register={ register } />
            <PasswordInput register={ register } />
            <button type="submit">Send</button>
          </form>
          {error && <p>{ message }</p>}
        </main>
    </div>
  );
}

export default RegisterPage;