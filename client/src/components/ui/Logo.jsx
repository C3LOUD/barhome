import React from 'react';
import { useNavigate } from 'react-router-dom';

import logoSvg from '../../assets/LOGO.svg';

const Logo = () => {
  const navigate = useNavigate();

  const homeHandler = () => {
    navigate('/');
  };

  return (
    <img
      src={logoSvg}
      alt="logo"
      onClick={homeHandler}
      className="cursor-pointer"
    />
  );
};

export default Logo;
