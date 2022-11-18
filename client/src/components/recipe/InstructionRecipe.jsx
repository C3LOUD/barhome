import React from 'react';

import Icon from '../ui/Icon';

const InstructionRecipe = (props) => {
  const instructionArr = props.instructions.split('.');

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
};

export default InstructionRecipe;
