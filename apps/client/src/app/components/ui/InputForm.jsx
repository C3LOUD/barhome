import React, { useCallback, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';

import tempAvatar from '../../../assets/7007892.png';
import {
  confirmPasswordValidator,
  emailValidator,
  nameValidator,
  passwordValidator,
} from '../../utils/input-validator';
import AvatarCropper from '../auth/AvatarCropper';
import AuthInput from './AuthInput';
import Icon from './Icon';

export default function InputForm({ admin, onSubmit }) {
  const [nameInvalid, setNameValid] = useState(true);
  const [emailInvalid, setEmailValid] = useState(true);
  const [currentPasswordInvalid, setCurrentPasswordValid] = useState(true);
  const [passwordInvalid, setPasswordValid] = useState(true);
  const [confirmPasswordInvalid, setConfirmPasswordValid] = useState(true);
  const [avatarEditing, setAvatarEditing] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState(tempAvatar);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const currentPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const nameValidHandler = useCallback((validationResult) => {
    setNameValid(validationResult);
  }, []);

  const emailValidHandler = useCallback((validationResult) => {
    setEmailValid(validationResult);
  }, []);

  const currentPasswordValidHandler = useCallback((validationResult) => {
    setCurrentPasswordValid(validationResult);
  }, []);

  const passwordValidHandler = useCallback((validationResult) => {
    setPasswordValid(validationResult);
  }, []);

  const confirmPasswordValidHandler = useCallback((validationResult) => {
    setConfirmPasswordValid(validationResult);
  }, []);

  const editHandler = () => {
    setAvatarEditing((prev) => !prev);
  };

  const canvasHandler = (canvas) => {
    setTempImageSrc(canvas);
  };

  const formInValid =
    nameInvalid || emailInvalid || passwordInvalid || confirmPasswordInvalid;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (admin ? false : formInValid) return;
    const name = nameRef.current.getValue();
    const email = emailRef.current.getValue();
    const password = passwordRef.current.getValue();
    const check = tempAvatar === tempImageSrc;
    const avatar = check ? null : tempImageSrc;
    const currentPassword = admin && currentPasswordRef.current.getValue();
    const userData = {
      name,
      email,
      password,
      avatar,
      currentPassword,
    };
    onSubmit(userData);
  };

  useEffect(() => {
    if (!admin?.imgUrl) return;
    setTempImageSrc(admin.imgUrl);
  }, [admin]);

  return (
    <>
      {avatarEditing && (
        <button
          type="button"
          className="absolute left-0 top-0 z-10 flex h-full w-full cursor-pointer items-center justify-center bg-accent-dark-shade-800/80"
          onClick={editHandler}
        >
          <AvatarCropper onEdit={editHandler} onCanvas={canvasHandler} />
        </button>
      )}
      <form onSubmit={submitHandler}>
        <button
          type="button"
          className="group relative mx-auto mb-6 h-40 w-40 cursor-pointer overflow-hidden rounded-full dark:shadow-md"
          onClick={editHandler}
        >
          <img
            src={tempImageSrc}
            alt="user avatar"
            className="transition-all group-hover:scale-110"
          />
          <Icon
            name="camera"
            className="absolute bottom-2 left-1/2 -translate-x-2/4 rounded-full bg-white-100/50 px-1 py-1 text-2xl text-primary-main transition-all group-hover:bg-white-100"
          />
        </button>

        <AuthInput
          id="name"
          validator={nameValidator}
          ref={nameRef}
          onValid={nameValidHandler}
          type="text"
          initial={admin?.name}
          mode={admin}
        />
        <AuthInput
          id="email"
          validator={emailValidator}
          ref={emailRef}
          onValid={emailValidHandler}
          type="email"
          initial={admin?.email}
          mode={admin}
        />
        {admin && (
          <AuthInput
            id="currentPassword"
            validator={passwordValidator}
            ref={currentPasswordRef}
            onValid={currentPasswordValidHandler}
            type="password"
            mode={admin}
          />
        )}
        <AuthInput
          id="password"
          validator={passwordValidator}
          ref={passwordRef}
          onValid={passwordValidHandler}
          type="password"
          mode={admin}
        />
        <AuthInput
          id="confirmPassword"
          validator={(inputPassword) => {
            confirmPasswordValidator(
              inputPassword,
              passwordRef.current?.getValue(),
            );
          }}
          ref={confirmPasswordRef}
          onValid={confirmPasswordValidHandler}
          type="password"
          mode={admin}
        />
        <button
          disabled={admin ? false : formInValid}
          type="submit"
          className={twMerge(
            'paragraph-large mt-4 w-fit rounded px-4 py-2 font-secondary transition-all  dark:text-white-100',
            !formInValid || admin
              ? 'cursor-pointer bg-secondary-main hover:bg-secondary-tint-200'
              : 'cursor-not-allowed bg-gray-100',
          )}
        >
          Submit
        </button>
      </form>
    </>
  );
}

InputForm.propTypes = {
  admin: PropTypes.shape({
    imgUrl: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};

InputForm.defaultProps = {
  admin: undefined,
};
