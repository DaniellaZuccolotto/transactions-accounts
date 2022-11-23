import React from 'react';
import ButtonNavigate from '../components/ButtonNavigate';

function InitialPage() {
  return (
    <div className="flex justify-center bg-[#f6f6f6] h-screen">
      <div className="flex justify-center items-center bg-[#f8d117] fixed w-full text-center h-14">
        <h1 className="text-xl text-[#0a39ab] font-bold">Autoatendimento</h1>
      </div>
      <main className="flex flex-col justify-center h-72 w-60 self-center bg-[#f8d117] shadow-md shadow-slate-500">
        <h1 className="self-center mt-10 text-xl text-[#222222]">Bem-Vindo</h1>
        <nav className="flex flex-col justify-center items-center h-36 mt-10">
          <ButtonNavigate navigate="/login" name="ENTRAR" />
          <ButtonNavigate navigate="/register" name="REGISTRAR" />
        </nav>
      </main>
    </div>
  );
}

export default InitialPage;