import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Icon from './ui/Icon';

const Recipe = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const startEditingHandler = (e) => {
    setIsEditing(true);
    props.onEdit(isEditing);
  };

  const { id } = useParams();

  return (
    <div className="w-9/12 h-full bg-white-100 rounded flex flex-col justify-between items-center pt-12 pb-6">
      <p className="font-primary display-small font-bold">{id}</p>
      <div
        className="flex flex-col gap-2 items-center group"
        onClick={startEditingHandler}
      >
        <a className="transition-all font-secondary paragraph-small font-semibold text-primary-main group-hover:paragraph-medium">
          ADD A POST
        </a>
        <Icon
          name="add"
          style="transition-all text-primary-main text-2xl border-2 rounded-full border-primary-main px-2 py-2 group-hover:bg-primary-main group-hover:text-white-100"
        />
      </div>
    </div>
  );
};

export default Recipe;
