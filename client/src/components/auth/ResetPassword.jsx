import React, { useCallback, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { resetPassword } from '../../utils/api-list';
import {
  confirmPasswordValidator,
  passwordValidator,
} from '../../utils/input-validator';
import AuthInput from '../ui/AuthInput';
import timer from '../../utils/timer';

export default function ResetPassword() {
  const [passwordInvalid, setPasswordValid] = useState(true);
  const [confirmPasswordInvalid, setConfirmPasswordValid] = useState(true);

  const { token } = useParams();
  const navigate = useNavigate();

  const { mutate, isSuccess, isError, error } = resetPassword();

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const passwordValidHandler = useCallback((validationResult) => {
    setPasswordValid(validationResult);
  }, []);

  const confirmPasswordValidHandler = useCallback((validationResult) => {
    setConfirmPasswordValid(validationResult);
  }, []);

  const formInValid = passwordInvalid || confirmPasswordInvalid;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (formInValid) return;
    const password = passwordRef.current.getValue();
    mutate(
      {
        password,
        token,
      },
      {
        onSuccess: async () => {
          await timer(3);
          navigate('/login', { replace: true });
        },
      },
    );
  };

  return (
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
            Redirect to login page.
          </p>
        </div>
      )}
      <form onSubmit={submitHandler}>
        <AuthInput
          id="password"
          validator={passwordValidator}
          ref={passwordRef}
          onValid={passwordValidHandler}
          type="password"
        />
        <AuthInput
          id="confirmPassword"
          validator={confirmPasswordValidator(passwordRef.current?.getValue())}
          ref={confirmPasswordRef}
          onValid={confirmPasswordValidHandler}
          type="password"
        />
        <button
          disabled={formInValid}
          type="submit"
          className={twMerge(
            'mt-4 w-fit rounded px-4 py-2',
            !formInValid
              ? 'cursor-pointer bg-secondary-main'
              : 'cursor-not-allowed bg-gray-100',
          )}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
