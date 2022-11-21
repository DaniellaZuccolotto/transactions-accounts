import React from 'react';
import PropTypes from 'prop-types';

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
        type="password"
        placeholder="User password"
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