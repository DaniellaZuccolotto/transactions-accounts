import React from 'react';
import PropTypes from 'prop-types';

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
        type="name"
        placeholder="User Name"
        { ...register('username') }
      />

    </label>
  );
}

NameInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default NameInput;