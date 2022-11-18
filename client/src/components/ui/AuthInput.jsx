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
    <div className="inline-block h-20 w-full">
      <label
        htmlFor={props.id}
        className="paragraph-small w-full pb-1 font-secondary font-semibold"
      >
        {props.id[0].toUpperCase() + props.id.slice(1) + ':'}
      </label>
      <input
        className="paragraph-small w-full rounded bg-white-100 px-2 py-2 font-secondary font-normal text-black-100 dark:shadow-md"
        type={props.type}
        name={props.id}
        id={props.id}
        value={value}
        onChange={valueChangeHandler}
        onBlur={inputBlurHandler}
      />
      {props.mode && hasError && (
        <p className="paragraph-xsmall font-secondary font-semibold text-error">
          {value ? validationResult : null}
        </p>
      )}
      {!props.mode && hasError && (
        <p className="paragraph-xsmall font-secondary font-semibold text-error">
          {validationResult}
        </p>
      )}
    </div>
  );
});

export default AuthInput;
