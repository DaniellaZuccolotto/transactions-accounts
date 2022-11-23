import React from 'react';
import PropTypes from 'prop-types';

interface Register {
  register: any;
}

function NameTransaction({ register }: Register) {

  return (
    <label
      htmlFor="usernameC"
    >
      <input
      className="w-52 h-8 text-center shadow-md shadow-slate-500 mt-2"
        id="usernameC"
        type="usernameC"
        placeholder="Nome do beneficiado"
        { ...register('usernameC') }
      />

    </label>
  );
}

NameTransaction.propTypes = {
  register: PropTypes.func.isRequired,
};

export default NameTransaction;