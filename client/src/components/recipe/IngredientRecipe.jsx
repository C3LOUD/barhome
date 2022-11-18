import React from 'react';

const IngredientRecipe = (props) => {
  return (
    <div className="paragraph-large flex justify-between font-semibold">
      <div className="flex gap-2">
        <p>
          {props.ingredient.quantity === 0
            ? props.ingredient.unit
            : Math.round(props.ingredient.quantity * props.counter * 100) / 100}
        </p>
        <p className="paragraph-small self-center text-accent-dark-main">
          {props.ingredient.quantity !== 0 && props.ingredient.unit}
        </p>
      </div>
      <p>{props.ingredient.ingredient}</p>
    </div>
  );
};

export default IngredientRecipe;
