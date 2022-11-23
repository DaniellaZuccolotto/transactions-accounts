import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { NameInput, PasswordInput  } from '../components/inputs';
import requestLogin from '../utils/api/requestLogin';
import { ILogin } from '../interfaces/ILogin';
import { div, div2, h1, main, button, form, h12 } from '../styles/LoginPageStyles';

function FormPage() {
  const { register, handleSubmit } = useForm<ILogin>();
  const history = useNavigate();

  const onSubmit = async (data: ILogin) => {
    const responseUser = await requestLogin(data);  
    if (!responseUser.token) {
      alert(responseUser.data.message);
      return null
    }
    localStorage.setItem('user', JSON.stringify(responseUser));
    history(`/home/${responseUser.id}`);
  };

  return (
    <div className="flex justify-center bg-[#f6f6f6] h-screen">
      <aside className="flex justify-center items-center bg-[#f8d117] fixed w-full text-center h-14">
        <h1 className="text-xl text-[#0a39ab] font-bold">Autoatendimento</h1>
      </aside>
      <main className="flex flex-col justify-center h-72 w-60 self-center bg-[#f8d117] shadow-md shadow-slate-500">
        <h1 className="self-center mt-5 text-xl text-[#222222]">Login</h1>
        <form
          className="flex flex-col justify-evenly items-center h-56"
          onSubmit={handleSubmit(onSubmit)}
        >
          <NameInput register={ register } />
          <PasswordInput register={ register } />
          <button className="self-center w-48 h-8 bg-[#1194f6] text-white text-sm" type="submit">Entrar</button>
        </form>
      </main>
    </div>
  );
}

export default FormPage;