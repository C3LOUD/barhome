import React from 'react';
import PropTypes from 'prop-types';

export default function IngredientRecipe({ ingredient, counter }) {
  return (
    <div className="paragraph-large flex justify-between font-semibold">
      <div className="flex gap-2">
        <p>
          {ingredient.quantity === 0
            ? ingredient.unit
            : Math.round(ingredient.quantity * counter * 100) / 100}
        </p>
        <p className="paragraph-small self-center text-accent-dark-main">
          {ingredient.quantity !== 0 && ingredient.unit}
        </p>
      </div>
      <p>{ingredient.ingredient}</p>
    </div>
  );
}

IngredientRecipe.propTypes = {
  ingredient: PropTypes.shape({
    quantity: PropTypes.number,
    unit: PropTypes.string,
    ingredient: PropTypes.string,
  }).isRequired,
  counter: PropTypes.number.isRequired,
};
