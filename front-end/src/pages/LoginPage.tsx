import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { NameInput, PasswordInput  } from '../components/inputs';
import requestLogin from '../utils/api/requestLogin';
import { ILogin } from '../interfaces/ILogin';

function FormPage() {
  const { register, handleSubmit } = useForm<ILogin>();
  const history = useNavigate();

  const onSubmit = async (data: ILogin) => {
    const responseUser = await requestLogin(data);
    localStorage.setItem('user', JSON.stringify(responseUser));
    history(`/home/${responseUser.id}`);
  };

  return (
    <div>
        <aside>
          <h1>LOGIN</h1>
        </aside>
        <main>
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <NameInput register={ register } />
            <PasswordInput register={ register } />
            <button type="submit">Send</button>
          </form>
        </main>
    </div>
  );
}

export default FormPage;