import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import useInput from '../../hooks/useInput';

const AuthInput = forwardRef((props, ref) => {
  const {
    value,
    validationResult,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  } = useInput(props.validator);

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    reset,
  }));

  useEffect(() => {
    props.onValid(validationResult);
  }, [props.onValid, validationResult]);

  return (
    <div className="h-20 w-full">
      <label htmlFor={props.id} className="block w-full pb-2">
        {props.id}
      </label>
      <input
        className="w-full text-black-100 px-2 py-1"
        type={props.type}
        name={props.id}
        id={props.id}
        value={value}
        onChange={valueChangeHandler}
        onBlur={inputBlurHandler}
      />
      {hasError && <p className="text-error">{validationResult}</p>}
    </div>
  );
});

export default AuthInput;
