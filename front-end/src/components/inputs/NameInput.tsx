import React from 'react';
import PropTypes from 'prop-types';
import { input } from '../../styles/LoginPageStyles';

interface Register {
  register: any;
}

function NameInput({ register }: Register) {

  return (
    <label
      htmlFor="name"
    >
      <input
        id="name"
        className="w-48 h-8 text-center shadow-md shadow-slate-500"
        type="name"
        placeholder="Nome do Usuário"
        { ...register('username') }
      />

    </label>
  );
}

NameInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default NameInput;