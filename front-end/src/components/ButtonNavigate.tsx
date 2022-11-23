import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { IButtonNavigate } from '../interfaces/IButtonNavigate';

function ButtonNavigate({ navigate, name }: IButtonNavigate) {
  const history = useNavigate();

  const handleClickLocal = () => {
    localStorage.clear();
    history(navigate);
  };

  return (
    <button
    type="button"
    className="self-center w-52 h-8 bg-[#1194f6] text-white mb-4 text-sm"
    onClick={ () => { handleClickLocal() } }
    >
      { name }
    </button>    
  );
}

ButtonNavigate.propTypes = {
  navigate: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ButtonNavigate;