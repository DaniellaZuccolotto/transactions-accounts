import React from 'react';
import PropTypes from 'prop-types';
import { input } from '../../styles/LoginPageStyles';

interface Register {
  register: any;
}

function PasswordInput({ register }: Register) {

  return (
    <label
      htmlFor="password"
    >
      <input
        id="password"
        className="w-48 h-8 text-center shadow-md shadow-slate-500"
        type="password"
        placeholder="Senha"
        { ...register('password', {
          required: true
        }) }
      />

    </label>
  );
}

PasswordInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default PasswordInput;