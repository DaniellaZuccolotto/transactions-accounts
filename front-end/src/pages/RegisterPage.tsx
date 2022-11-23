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
    localStorage.setItem('user', JSON.stringify(responseUser));
    history(`/home/${responseUser.accountId}`);  
  };

  return (
    <div className="flex justify-center bg-[#f6f6f6] h-screen">
      <aside className="flex justify-center items-center bg-[#f8d117] fixed w-full text-center h-14">
        <h1 className="text-xl text-[#0a39ab] font-bold">Autoatendimento</h1>
      </aside>
      <main className="flex flex-col justify-center h-72 w-60 self-center bg-[#f8d117] shadow-md shadow-slate-500">
        <h1 className="self-center mt-5 text-xl text-[#222222]">Cadastre-se</h1>
        <form
          className="flex flex-col justify-evenly items-center h-56"
          onSubmit={handleSubmit(onSubmit)}
        >
          <NameInput register={ register } />
          <PasswordInput register={ register } />
          <button className="self-center w-48 h-8 bg-[#1194f6] text-white text-sm" type="submit">Cadastrar</button>
          { error && <p className="text-xs text-red-600 text-justify w-48">{ message }</p> }
        </form>        
      </main>
    </div>
  );
}

export default RegisterPage;