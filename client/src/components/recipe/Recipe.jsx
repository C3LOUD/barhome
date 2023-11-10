import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';

import { fetchRecipe } from '../../utils/api-list';
import CloseBtn from '../ui/CloseBtn';
import Icon from '../ui/Icon';
import Loading from '../ui/Loading';
import ModalCard from '../ui/ModalCard';
import SavedBtn from '../ui/SavedBtn';
import Tag from '../ui/Tag';
import CounterRecipe from './CounterRecipe';
import IngredientRecipe from './IngredientRecipe';
import InstructionRecipe from './InstructionRecipe';

export default function Recipe({ onEdit }) {
  const [currentShow, setCurrentShow] = useState('Ingredients');
  const [counter, setCounter] = useState(1);
  const { id } = useParams();

  const { isLoading, isError, error, data } = fetchRecipe(id);
  if (!data) return <Loading />;

  const {
    title,
    category,
    alcoholic,
    thumbnail,
    ingredients,
    instructions,
    tags,
  } = data.recipe;

  const switchHandler = (e) => {
    setCurrentShow(e.target.innerText);
  };

  const decrementHandler = (e) => {
    setCounter((prev) => {
      if (prev === 1) return prev;
      return prev - 1;
    });
  };

  const incrementHandler = (e) => {
    setCounter((prev) => prev + 1);
  };

  return (
    <ModalCard>
      <CloseBtn />
      <div className="flex w-full flex-col items-center" data-id={title}>
        <p className="display-small pb-2 font-primary font-bold">{title}</p>
        <div className="flex w-fit gap-2 overflow-x-scroll px-6 pb-8 scrollbar-none 2xs:w-full">
          {[alcoholic, category, ...tags].map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
        </div>
        <div className="grid w-full grid-cols-2 gap-6 2xs:grid-cols-1">
          <div className="relative 2xs:mx-auto 2xs:w-2/3">
            <img
              className="inline-block aspect-square"
              src={thumbnail}
              alt={`${title}`}
            />
            <SavedBtn />
          </div>
          <div className="max-w-sm pr-6 2xs:max-w-full 2xs:px-4">
            <div className="flex w-full" onClick={switchHandler}>
              {['Ingredients', 'Instructions'].map((label) => (
                <div
                  key={label}
                  className={twMerge(
                    'heading-h5 w-full cursor-pointer overflow-hidden rounded-t-2xl py-2 text-center font-primary font-bold',
                    label === currentShow
                      ? 'bg-accent-dark-main text-white-100'
                      : 'text-accent-dark-main',
                  )}
                >
                  <p className="transition-all hover:scale-110">{label}</p>
                </div>
              ))}
            </div>
            {currentShow === 'Instructions' ? (
              <InstructionRecipe instructions={instructions} />
            ) : (
              <>
                <CounterRecipe
                  counter={counter}
                  onDecrement={decrementHandler}
                  onIncrement={incrementHandler}
                />
                {ingredients &&
                  ingredients.map((ingredient, i) => (
                    <IngredientRecipe
                      ingredient={ingredient}
                      key={i}
                      counter={counter}
                    />
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className="group flex cursor-pointer flex-col items-center gap-2"
        onClick={onEdit}
      >
        <a className="paragraph-small group-hover:paragraph-medium pt-4 font-secondary font-semibold text-primary-main transition-all">
          ADD A POST
        </a>
        <Icon
          name="add"
          style="transition-all text-primary-main text-2xl border-2 rounded-full border-primary-main px-2 py-2 group-hover:bg-primary-main group-hover:text-white-100"
        />
      </div>
    </ModalCard>
  );
}

Recipe.propTypes = {
  onEdit: PropTypes.func.isRequired,
};
