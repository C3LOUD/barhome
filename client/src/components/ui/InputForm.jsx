import React, { useCallback, useEffect, useRef, useState } from 'react';

import tempAvatar from '../../assets/7007892.jpg';
import {
  confirmPasswordValidator,
  emailValidator,
  nameValidator,
  passwordValidator,
} from '../../utils/input-validator';
import AvatarCropper from '../auth/AvatarCropper';
import AuthInput from '../ui/AuthInput';
import Icon from '../ui/Icon';

const InputForm = (props) => {
  const [nameInvalid, setNameValid] = useState(true);
  const [emailInvalid, setEmailValid] = useState(true);
  const [currentPasswordInvalid, setCurrentPasswordValid] = useState(true);
  const [passwordInvalid, setPasswordValid] = useState(true);
  const [confirmPasswordInvalid, setConfirmPasswordValid] = useState(true);
  const [avatarEditing, setAvatarEditing] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState(tempAvatar);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const currentPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (props.admin ? false : formInValid) return;
    const name = nameRef.current.getValue();
    const email = emailRef.current.getValue();
    const password = passwordRef.current.getValue();
    const check = tempAvatar === tempImageSrc;
    const avatar = check ? null : tempImageSrc;
    const currentPassword =
      props.admin && currentPasswordRef.current.getValue();
    const userData = {
      name,
      email,
      password,
      avatar,
      currentPassword,
    };
    props.onSubmit(userData);
  };

  const nameValidHandler = useCallback((validationResult) => {
    setNameValid(validationResult);
  });

  const emailValidHandler = useCallback((validationResult) => {
    setEmailValid(validationResult);
  });

  const currentPasswordValidHandler = useCallback((validationResult) => {
    setCurrentPasswordValid(validationResult);
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

  const formInValid =
    nameInvalid || emailInvalid || passwordInvalid || confirmPasswordInvalid;

  useEffect(() => {
    if (!props.admin?.imgUrl) return;
    setTempImageSrc(props.admin.imgUrl);
  }, [props.admin]);

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        {avatarEditing && (
          <AvatarCropper onEdit={editHandler} onCanvas={canvasHandler} />
        )}
      </div>
      <form onSubmit={submitHandler}>
        <div
          className="m-auto relative group rounded-full h-40 w-40 overflow-hidden cursor-pointer mb-6"
          onClick={editHandler}
        >
          <img
            src={tempImageSrc}
            alt="user avatar"
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
          initial={props.admin?.name}
          mode={props.admin}
        />
        <AuthInput
          id="email"
          validator={emailValidator}
          ref={emailRef}
          onValid={emailValidHandler}
          type="email"
          initial={props.admin?.email}
          mode={props.admin}
        />
        {props.admin && (
          <AuthInput
            id="currentPassword"
            validator={passwordValidator}
            ref={currentPasswordRef}
            onValid={currentPasswordValidHandler}
            type="password"
            mode={props.admin}
          />
        )}
        <AuthInput
          id="password"
          validator={passwordValidator}
          ref={passwordRef}
          onValid={passwordValidHandler}
          type="password"
          mode={props.admin}
        />
        <AuthInput
          id="confirmPassword"
          validator={confirmPasswordValidator(passwordRef.current?.getValue())}
          ref={confirmPasswordRef}
          onValid={confirmPasswordValidHandler}
          type="password"
          mode={props.admin}
        />
        <button
          disabled={props.admin ? false : formInValid}
          type="submit"
          className={`mt-4 px-4 py-2 w-fit rounded ${
            !formInValid || props.admin
              ? 'bg-secondary-main cursor-pointer'
              : 'bg-gray-100 cursor-not-allowed'
          }`}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default InputForm;
