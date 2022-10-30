import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchRecipes from '../hooks/useFetchRecipes';
import Icon from './ui/Icon';
import ModalCard from './ui/ModalCard';
import Tag from './ui/Tag';

const Recipe = (props) => {
  const { id } = useParams();

  const { recievedData } = useFetchRecipes({ method: 'GET', api: id });
  const {
    title,
    category,
    alcoholic,
    thumbnail,
    ingredients,
    instruction,
    tags,
  } = recievedData;

  return (
    <ModalCard>
      <p className="font-primary display-small font-bold">{title}</p>
      <div className="flex gap-2">
        {recievedData.length !== 0 &&
          [alcoholic, category, ...tags].map((tag) => <Tag>{tag}</Tag>)}
      </div>
      <div className="w-full">
        <img
          className="inline-block aspect-square w-1/2"
          src={thumbnail}
          alt={`${title} photo`}
        />
      </div>
      <div
        className="flex flex-col gap-2 items-center group"
        onClick={props.onEdit}
      >
        <a className="transition-all font-secondary paragraph-small font-semibold text-primary-main group-hover:paragraph-medium">
          ADD A POST
        </a>
        <Icon
          name="add"
          style="transition-all text-primary-main text-2xl border-2 rounded-full border-primary-main px-2 py-2 group-hover:bg-primary-main group-hover:text-white-100"
        />
      </div>
    </ModalCard>
  );
};

export default Recipe;
