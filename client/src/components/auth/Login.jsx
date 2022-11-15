import React, { useRef, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AuthInput from '../ui/AuthInput';
import { emailValidator, passwordValidator } from '../../utils/input-validator';
import { login } from '../../utils/api-list';
import { login as loginThunk } from '../../store/auth-slice';

const Login = () => {
  const [emailInvalid, setEmailValid] = useState(true);
  const [passwordInvalid, setPasswordValid] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();

  const { mutate, isError, error } = login();

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

  const emailValidHandler = useCallback((validationResult) => {
    setEmailValid(validationResult);
  });

  const passwordValidHandler = useCallback((validationResult) => {
    setPasswordValid(validationResult);
  });

  const formValid = emailInvalid || passwordInvalid;

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col bg-primary-main px-4 py-4 rounded-2xl gap-2 text-white-100 w-[20rem]">
          {isError && <p>{error.message}</p>}
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
            className={`px-4 py-2 w-fit rounded ${
              !formValid ? 'bg-secondary-main' : 'bg-gray-100'
            }`}
          >
            Submit
          </button>
          <Link
            className="font-secondary font-normal paragraph-xsmall text-gray-300 hover:text-gray-50"
            to="/forget-password"
          >
            Forget password?
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
