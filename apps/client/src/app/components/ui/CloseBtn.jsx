import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CloseBtn() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <button
      className="text-black-100 hover:text-black-100/50 absolute right-2 top-2 z-50 flex cursor-pointer text-5xl"
      onClick={() =>
        navigate(location.pathname.split('/').slice(0, -1).join('/'))
      }
    >
      <ion-icon name="close-sharp" />
    </button>
  );
}
