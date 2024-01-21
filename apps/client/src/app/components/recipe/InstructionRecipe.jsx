import React from 'react';
import PropTypes from 'prop-types';

export default function InstructionRecipe({ instructions }) {
  const instructionArr = instructions.split('.');

  return (
    <div className="flex w-full flex-col gap-4 py-2">
      {instructionArr.map((instruction, i) => {
        if (instruction) {
          return (
            <div className="flex gap-2" key={i}>
              <span className="text-accent-dark-main flex text-xl">
                <ion-icon name="pin" />
              </span>
              <p
                className="paragraph-medium font-secondary font-normal"
                key={instruction}
              >
                {`${instruction}.`}
              </p>
            </div>
          );
        }
      })}
    </div>
  );
}

InstructionRecipe.propTypes = {
  instructions: PropTypes.string.isRequired,
};
