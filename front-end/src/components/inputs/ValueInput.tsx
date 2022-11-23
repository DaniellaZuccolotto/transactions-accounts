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
        className="w-52 h-8 text-center shadow-md shadow-slate-500 mt-2"
        id="value"
        type="value"
        placeholder="Valor de transferência"
        { ...register('value') }
      />

    </label>
  );
}

ValueInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default ValueInput;