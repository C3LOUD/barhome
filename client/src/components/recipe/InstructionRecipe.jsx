import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../ui/Icon';

export default function InstructionRecipe({ instructions }) {
  const instructionArr = instructions.split('.');

  return (
    <div className="flex w-full flex-col gap-4 py-2">
      {instructionArr.map((instruction, i) => {
        if (!instruction) return;

        return (
          <div className="flex gap-2" key={i}>
            <Icon name="pin" style="text-xl text-accent-dark-main" />
            <p
              className="paragraph-medium font-secondary font-normal"
              key={instruction}
            >
              {`${instruction}.`}
            </p>
          </div>
        );
      })}
    </div>
  );
}

InstructionRecipe.propTypes = {
  instructions: PropTypes.string.isRequired,
};
