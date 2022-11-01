import React from 'react';

import Icon from '../ui/Icon';

const CounterRecipe = (props) => {
  return (
    <div className="flex justify-between py-2">
      <Icon
        name="remove"
        style={`transition-all text-2xl text-error md hydrated ${
          props.counter === 1
            ? 'cursor-not-allowed'
            : 'cursor-pointer active:scale-150'
        }`}
        onClick={props.onDecrement}
      />
      <p className="paragraph-large font-semibold">{props.counter}</p>
      <Icon
        name="add"
        style="transition-all active:scale-150 text-2xl text-success cursor-pointer"
        onClick={props.onIncrement}
      />
    </div>
  );
};

export default CounterRecipe;
