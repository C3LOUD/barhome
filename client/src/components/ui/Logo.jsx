import React from 'react';
import { useNavigate } from 'react-router-dom';

import logoSvg from '../../assets/LOGO.svg';

export default function Logo() {
  const navigate = useNavigate();

  const homeHandler = () => {
    navigate('/');
  };

  return (
    <img
      src={logoSvg}
      alt="logo"
      onClick={homeHandler}
      className="cursor-pointer transition-all hover:scale-95 sm:scale-90"
    />
  );
}
