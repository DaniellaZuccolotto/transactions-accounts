import React from 'react';
import PropTypes from 'prop-types';
import { ISelect } from '../../interfaces/ISelect';

function CheckBoxInput({ selectUser, name, type }: ISelect) {
  return (
    <label
      className="w-32"
      htmlFor={ name }
    >      
      <input
        id={ name }
        className="mr-2"
        type="radio"
        name="selectUser"
        onClick={ () => selectUser(type) }
      />
      { name }
    </label>
  );
}

CheckBoxInput.propTypes = {
  selectUser: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default CheckBoxInput;