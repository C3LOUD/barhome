import PropTypes from 'prop-types';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import Icon from '../ui/Icon';

export default function CounterRecipe({ counter, onDecrement, onIncrement }) {
  return (
    <div className="flex w-full justify-between py-2">
      <Icon
        name="remove"
        className={twMerge(
          'md hydrated text-2xl text-error transition-all',
          counter === 1
            ? 'cursor-not-allowed'
            : 'cursor-pointer active:scale-150',
        )}
        onClick={onDecrement}
      />
      <p className="paragraph-large font-semibold">{counter}</p>
      <Icon
        name="add"
        className="cursor-pointer text-2xl text-success transition-all active:scale-150"
        onClick={onIncrement}
      />
    </div>
  );
}

CounterRecipe.propTypes = {
  counter: PropTypes.number.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
};
