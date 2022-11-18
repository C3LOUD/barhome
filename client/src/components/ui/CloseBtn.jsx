import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Icon from '../ui/Icon';

const CloseBtn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Icon
      name="close-sharp"
      style="absolute top-2 right-2 z-50 text-5xl hover:text-black-100/50 text-black-100 cursor-pointer"
      onClick={() =>
        navigate(location.pathname.split('/').slice(0, -1).join('/'))
      }
    />
  );
};

export default CloseBtn;
