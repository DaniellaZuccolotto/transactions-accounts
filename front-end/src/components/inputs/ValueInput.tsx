import React from 'react';
import PropTypes from 'prop-types';

interface Register {
  register: any;
}

function ValueInput({ register }: Register) {

  return (
    <label
      htmlFor="value"
    >
      <input
        id="value"
        type="value"
        placeholder="Digite o valor de transferência"
        { ...register('value') }
      />

    </label>
  );
}

ValueInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default ValueInput;