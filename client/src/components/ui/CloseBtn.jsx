import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Icon from './Icon';

export default function CloseBtn() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Icon
      name="close-sharp"
      className="absolute top-2 right-2 z-50 cursor-pointer text-5xl text-black-100 hover:text-black-100/50"
      onClick={() =>
        navigate(location.pathname.split('/').slice(0, -1).join('/'))
      }
    />
  );
}
