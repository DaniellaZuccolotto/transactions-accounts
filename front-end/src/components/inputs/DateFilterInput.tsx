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
        className="w-48 h-8 text-center text-gray-500"
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