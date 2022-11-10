import React, { useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthInput from '../ui/AuthInput';
import {
  nameValidator,
  emailValidator,
  passwordValidator,
  confirmPasswordValidator,
} from '../../utils/input-validator';
import tempAvatar from '../../assets/7007892.jpg';
import Icon from '../ui/Icon';
import AvatarCropper from './AvatarCropper';
import { signup } from '../../utils/api-list';

const SignUp = () => {
  const [nameInvalid, setNameValid] = useState(true);
  const [emailInvalid, setEmailValid] = useState(true);
  const [passwordInvalid, setPasswordValid] = useState(true);
  const [confirmPasswordInvalid, setConfirmPasswordValid] = useState(true);
  const [avatarEditing, setAvatarEditing] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState(tempAvatar);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const navigate = useNavigate();

  const { mutate, error, isError } = signup();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (formValid) return;
    const name = nameRef.current.getValue();
    const email = emailRef.current.getValue();
    const password = passwordRef.current.getValue();
    const check = tempAvatar === tempImageSrc;
    const avatar = check ? null : tempImageSrc;
    const userData = {
      name,
      email,
      password,
      avatar,
    };
    mutate(userData, {
      onSuccess: () => {
        navigate('/login');
      },
    });
  };

  const nameValidHandler = useCallback((validationResult) => {
    setNameValid(validationResult);
  });

  const emailValidHandler = useCallback((validationResult) => {
    setEmailValid(validationResult);
  });

  const passwordValidHandler = useCallback((validationResult) => {
    setPasswordValid(validationResult);
  });

  const confirmPasswordValidHandler = useCallback((validationResult) => {
    setConfirmPasswordValid(validationResult);
  });

  const editHandler = (e) => {
    e && e.stopPropagation();
    setAvatarEditing((prev) => !prev);
  };

  const canvasHandler = (canvas) => {
    setTempImageSrc(canvas);
  };

  const formValid =
    nameInvalid || emailInvalid || passwordInvalid || confirmPasswordInvalid;

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        {avatarEditing && (
          <AvatarCropper onEdit={editHandler} onCanvas={canvasHandler} />
        )}
      </div>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col bg-primary-main px-4 py-4 rounded-2xl gap-2 text-white-100 w-[20rem]">
          {isError && <p>{error.message}</p>}
          <p className="heading-h4">Sign up</p>
          <div className="m-auto relative group rounded-full h-36 w-36 overflow-hidden">
            <img
              src={tempImageSrc}
              alt="user avatar"
              onClick={editHandler}
              className="group-hover:scale-110 transition-all"
            />
            <Icon
              name="camera"
              style="absolute bottom-2 left-1/2 -translate-x-2/4 text-2xl text-primary-main group-hover:bg-white-100 transition-all bg-white-100/50 rounded-full px-1 py-1"
            />
          </div>

          <AuthInput
            id="name"
            validator={nameValidator}
            ref={nameRef}
            onValid={nameValidHandler}
            type="text"
          />
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
          <AuthInput
            id="confirmPassword"
            validator={confirmPasswordValidator(
              passwordRef.current?.getValue()
            )}
            ref={confirmPasswordRef}
            onValid={confirmPasswordValidHandler}
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
        </div>
      </form>
    </>
  );
};

export default SignUp;
