import React, { useRef, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { twMerge } from 'tailwind-merge';

import AuthInput from '../ui/AuthInput';
import { emailValidator, passwordValidator } from '../../utils/input-validator';
import { useLogin } from '../../utils/api-list';
import { login as loginThunk } from '../../store/auth-slice';

export default function Login() {
  const [emailInvalid, setEmailValid] = useState(true);
  const [passwordInvalid, setPasswordValid] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();

  const { mutate, isError, error } = useLogin();

  const emailValidHandler = useCallback((validationResult) => {
    setEmailValid(validationResult);
  }, []);

  const passwordValidHandler = useCallback((validationResult) => {
    setPasswordValid(validationResult);
  }, []);

  const formValid = emailInvalid || passwordInvalid;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (formValid) return;
    const email = emailRef.current.getValue();
    const password = passwordRef.current.getValue();
    const userData = {
      email,
      password,
    };
    mutate(userData, {
      onSuccess: (data) => {
        const { token, expirationTime } = data;
        dispatch(loginThunk({ token, expirationTime }));
        navigate('/');
      },
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="bg-primary-main text-white-100 flex w-[20rem] flex-col gap-2 rounded-2xl px-4 py-4">
        {isError && <p className="text-error">{error.message}</p>}
        <p className="heading-h4">Login</p>
        <AuthInput
          id="email"
          validator={emailValidator}
          ref={emailRef}
          onValid={emailValidHandler}
          type="email"
        />
        <AuthInput
          id="password"
          validator={passwordValidator}
          ref={passwordRef}
          onValid={passwordValidHandler}
          type="password"
        />
        <button
          disabled={formValid}
          type="submit"
          className={twMerge(
            'w-fit rounded px-4 py-2',
            !formValid ? 'bg-secondary-main' : 'bg-gray-100',
          )}
        >
          Submit
        </button>
        <Link
          className="paragraph-xsmall font-secondary font-normal text-gray-300 hover:text-gray-50"
          to="/forget-password"
        >
          Forget password?
        </Link>
      </div>
    </form>
  );
}
