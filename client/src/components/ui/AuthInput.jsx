import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

import useInput from '../../hooks/useInput';

const AuthInput = forwardRef(
  ({ validator, id, onValid, initial, type, mode }, ref) => {
    const {
      value,
      validationResult,
      hasError,
      valueChangeHandler,
      inputBlurHandler,
      reset,
      initialize,
    } = useInput(validator);

    useImperativeHandle(ref, () => ({
      getValue: () => value,
      reset,
    }));

    useEffect(() => {
      onValid(validationResult);
    }, [onValid, validationResult]);

    useEffect(() => {
      if (!initial) return;
      initialize(initial);
    }, [initial]);

    return (
      <div className="inline-block h-20 w-full">
        <label
          htmlFor={id}
          className="paragraph-small w-full pb-1 font-secondary font-semibold"
        >
          {`${id[0].toUpperCase() + id.slice(1)}:`}
        </label>
        <input
          className="paragraph-small w-full rounded bg-white-100 px-2 py-2 font-secondary font-normal text-black-100 dark:shadow-md"
          type={type}
          name={id}
          id={id}
          value={value}
          onChange={valueChangeHandler}
          onBlur={inputBlurHandler}
        />
        {mode && hasError && (
          <p className="paragraph-xsmall font-secondary font-semibold text-error">
            {value ? validationResult : null}
          </p>
        )}
        {!mode && hasError && (
          <p className="paragraph-xsmall font-secondary font-semibold text-error">
            {validationResult}
          </p>
        )}
      </div>
    );
  },
);

AuthInput.propTypes = {
  id: PropTypes.string.isRequired,
  validator: PropTypes.func.isRequired,
  onValid: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  initial: PropTypes.string,
  mode: PropTypes.bool,
};

AuthInput.defaultProps = {
  initial: undefined,
  mode: undefined,
};

export default AuthInput;
