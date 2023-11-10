import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../ui/Icon';

export default function CounterRecipe({ counter, onDecrement, onIncrement }) {
  return (
    <div className="flex w-full justify-between py-2">
      <Icon
        name="remove"
        style={`transition-all text-2xl text-error md hydrated ${
          counter === 1
            ? 'cursor-not-allowed'
            : 'cursor-pointer active:scale-150'
        }`}
        onClick={onDecrement}
      />
      <p className="paragraph-large font-semibold">{counter}</p>
      <Icon
        name="add"
        style="transition-all active:scale-150 text-2xl text-success cursor-pointer"
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
