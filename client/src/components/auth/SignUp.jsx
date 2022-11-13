import React from 'react';
import { useNavigate } from 'react-router-dom';

import { signup } from '../../utils/api-list';
import InputForm from '../ui/InputForm';

const SignUp = () => {
  const navigate = useNavigate();
  const { mutate, error, isError } = signup();

  const submitHandler = async (userData) => {
    mutate(userData, {
      onSuccess: () => {
        navigate('/login');
      },
    });
  };

  return (
    <>
      <div className="flex flex-col bg-primary-main px-4 py-4 rounded-2xl gap-2 text-white-100 w-[20rem]">
        {isError && <p className="text-error">{error.message}</p>}
        <p className="heading-h4">Sign up</p>
        <InputForm onSubmit={submitHandler} />
      </div>
    </>
  );
};

export default SignUp;
