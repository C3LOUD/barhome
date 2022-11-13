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
    initialize,
  } = useInput(props.validator);

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    reset,
  }));

  useEffect(() => {
    props.onValid(validationResult);
  }, [props.onValid, validationResult]);

  useEffect(() => {
    if (!props.initial) return;
    initialize(props.initial);
  }, [props.initial]);

  return (
    <div className="w-full inline-block h-20">
      <label
        htmlFor={props.id}
        className="font-secondary paragraph-small font-semibold w-full pb-1"
      >
        {props.id[0].toUpperCase() + props.id.slice(1) + ':'}
      </label>
      <input
        className="w-full text-black-100 px-2 py-2 font-secondary paragraph-small font-normal bg-white-100 rounded"
        type={props.type}
        name={props.id}
        id={props.id}
        value={value}
        onChange={valueChangeHandler}
        onBlur={inputBlurHandler}
      />
      {props.mode && hasError && (
        <p className="text-error font-secondary paragraph-xsmall font-semibold">
          {value ? validationResult : null}
        </p>
      )}
      {!props.mode && hasError && (
        <p className="text-error font-secondary paragraph-xsmall font-semibold">
          {validationResult}
        </p>
      )}
    </div>
  );
});

export default AuthInput;
