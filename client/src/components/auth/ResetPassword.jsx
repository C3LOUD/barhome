import React, { useCallback, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { resetPassword } from '../../utils/api-list';
import {
  confirmPasswordValidator,
  passwordValidator,
} from '../../utils/input-validator';
import AuthInput from '../ui/AuthInput';
import timer from '../../utils/timer';

const ResetPassword = () => {
  const [passwordInvalid, setPasswordValid] = useState(true);
  const [confirmPasswordInvalid, setConfirmPasswordValid] = useState(true);

  const { token } = useParams();
  const navigate = useNavigate();

  const { mutate, isSuccess, isError, error } = resetPassword();

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

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
      }
    );
  };

  const passwordValidHandler = useCallback((validationResult) => {
    setPasswordValid(validationResult);
  });

  const confirmPasswordValidHandler = useCallback((validationResult) => {
    setConfirmPasswordValid(validationResult);
  });

  const formInValid = passwordInvalid || confirmPasswordInvalid;

  return (
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
          className={`mt-4 px-4 py-2 w-fit rounded ${
            !formInValid
              ? 'bg-secondary-main cursor-pointer'
              : 'bg-gray-100 cursor-not-allowed'
          }`}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
