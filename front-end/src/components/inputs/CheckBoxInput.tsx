import React from 'react';
import PropTypes from 'prop-types';
import { ISelect } from '../../interfaces/ISelect';

function CheckBoxInput({ selectUser, name, type }: ISelect) {
  return (
    <label
      htmlFor={ name }
    >      
      <input
        id={ name }
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