import React, { useRef, useState, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

import AuthInput from '../ui/AuthInput';
import { emailValidator } from '../../utils/input-validator';
import { forgetPassword } from '../../utils/api-list';

export default function ForgetPassword() {
  const [emailInvalid, setEmailValid] = useState(true);
  const emailRef = useRef();

  const { mutate, isSuccess, isError, error } = forgetPassword();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (emailInvalid) return;
    const email = emailRef.current.getValue();
    mutate({ email });
  };

  const emailValidHandler = useCallback((validationResult) => {
    setEmailValid(validationResult);
  }, []);

  return (
    <form onSubmit={submitHandler}>
      <div className="relative flex w-[20rem] flex-col gap-2 rounded-2xl bg-primary-main px-4 py-4 text-white-100">
        {isError && (
          <div className="absolute -top-24 left-0 w-full rounded bg-error px-2 py-4">
            <p className="paragraph-small font-secondary font-bold">
              {error.message}
            </p>
          </div>
        )}
        {isSuccess && (
          <div className="absolute -top-24 left-0 w-full rounded bg-success px-2 py-4">
            <p className="paragraph-small font-secondary font-bold">
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
          className={twMerge(
            'w-fit rounded px-4 py-2',
            !emailInvalid ? 'bg-secondary-main' : 'bg-gray-100',
          )}
        >
          Reset Password
        </button>
      </div>
    </form>
  );
}
