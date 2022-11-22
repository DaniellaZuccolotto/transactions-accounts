import React from 'react';
import PropTypes from 'prop-types';

interface Register {
  register: any;
}

function DateFilterInput({ register }: Register) {

  return (
    <label
      htmlFor="data"
    >
      <input
        id="data"
        type="date"
        placeholder="Data"
        { ...register('search') }
      />

    </label>
  );
}

DateFilterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default DateFilterInput;