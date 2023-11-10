import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { signup } from '../../utils/api-list';
import InputForm from '../ui/InputForm';

export default function SignUp() {
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
    <div className="flex w-[20rem] flex-col gap-2 rounded-2xl bg-primary-main px-4 py-4 text-white-100">
      {isError && <p className="text-error">{error.message}</p>}
      <p className="heading-h4">Sign up</p>
      <InputForm onSubmit={submitHandler} />
      <Link
        to="/login"
        className="paragraph-xsmall text-end text-white-100/50 transition-all hover:text-white-100"
      >
        Already have account?
      </Link>
    </div>
  );
}
