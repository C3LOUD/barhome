import React from 'react';

import Icon from '../ui/Icon';

const InstructionRecipe = (props) => {
  const instructionArr = props.instructions.split('.');

  return (
    <div className="flex flex-col py-2 gap-4">
      {instructionArr.map((instruction, i) => {
        if (!instruction) return;

        return (
          <div className="flex gap-2" key={i}>
            <Icon name="pin" style="text-xl text-accent-dark-main" />
            <p
              className="paragraph-medium font-normal font-secondary"
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
