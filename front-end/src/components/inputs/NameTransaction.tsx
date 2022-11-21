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
        id="usernameC"
        type="usernameC"
        placeholder="Nome para a transação"
        { ...register('usernameC') }
      />

    </label>
  );
}

NameTransaction.propTypes = {
  register: PropTypes.func.isRequired,
};

export default NameTransaction;