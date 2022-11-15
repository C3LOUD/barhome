import React, { useRef, useState, useCallback } from 'react';

import AuthInput from '../ui/AuthInput';
import { emailValidator } from '../../utils/input-validator';
import { forgetPassword } from '../../utils/api-list';

const ForgetPassword = () => {
  const [emailInvalid, setEmailValid] = useState(true);
  const emailRef = useRef();

  const { mutate, isSuccess, isError, error } = forgetPassword();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (emailInvalid) return;
    const email = emailRef.current.getValue();
    mutate({ email: email });
  };

  const emailValidHandler = useCallback((validationResult) => {
    setEmailValid(validationResult);
  });

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col bg-primary-main px-4 py-4 rounded-2xl gap-2 text-white-100 w-[20rem] relative">
          {isError && (
            <div className="absolute -top-24 bg-error rounded px-2 py-4 w-full left-0">
              <p className="font-secondary paragraph-small font-bold">
                {error.message}
              </p>
            </div>
          )}
          {isSuccess && (
            <div className="absolute -top-24 bg-success rounded px-2 py-4 w-full left-0">
              <p className="font-secondary paragraph-small font-bold">
                Reset Email has been sent to your address.
              </p>
            </div>
          )}
          <p className="heading-h4">Forget Password</p>
          <AuthInput
            id="email"
            validator={emailValidator}
            ref={emailRef}
            onValid={emailValidHandler}
            type="email"
          />
          <button
            disabled={emailInvalid}
            type="submit"
            className={` px-4 py-2 w-fit rounded ${
              !emailInvalid ? 'bg-secondary-main' : 'bg-gray-100'
            }`}
          >
            Reset Password
          </button>
        </div>
      </form>
    </>
  );
};

export default ForgetPassword;
