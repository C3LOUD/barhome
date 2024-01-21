import PropTypes from 'prop-types';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function CounterRecipe({ counter, onDecrement, onIncrement }) {
  return (
    <div className="flex w-full justify-between py-2">
      <button
        type="button"
        className={twMerge(
          'md hydrated text-error flex text-2xl transition-all',
          counter === 1
            ? 'cursor-not-allowed'
            : 'cursor-pointer active:scale-150',
        )}
        onClick={onDecrement}
      >
        <ion-icon name="remove" />
      </button>
      <p className="paragraph-large font-semibold">{counter}</p>
      <button
        type="button"
        className="text-success flex cursor-pointer text-2xl transition-all active:scale-150"
        onClick={onIncrement}
      >
        <ion-icon name="add" />
      </button>
    </div>
  );
}

CounterRecipe.propTypes = {
  counter: PropTypes.number.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
};
