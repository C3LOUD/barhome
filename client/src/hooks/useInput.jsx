import { useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT')
    return { value: action.value, isTouched: state.isTouched };
  if (action.type === 'BLUR') return { isTouched: true, value: state.value };
  if (action.type === 'RESET') return { isTouched: false, value: '' };
  if (action.type === 'INITIALIZE')
    return { isTouched: state.isTouched, value: action.value };
  return inputStateReducer;
};

const useInput = (validator) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const validationResult = validator(inputState.value);
  const hasError = validationResult && inputState.isTouched;

  const initialize = (value) => {
    dispatch({ type: 'INITIALIZE', value: value });
  };

  const valueChangeHandler = (event) => {
    dispatch({ type: 'INPUT', value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    validationResult,
    hasError,
    initialize,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
