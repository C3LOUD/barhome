import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { useFetchRecipe } from '../../utils/api-list';
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

  const { isLoading, isError, error, data } = useFetchRecipe(id);
  if (isLoading) return <Loading />;
  if (isError) throw new Error(error);

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
        <p className="display-small font-primary pb-2 font-bold">{title}</p>
        <div className="scrollbar-none 2xs:w-full flex w-fit gap-2 overflow-x-auto px-6 pb-8">
          {[alcoholic, category, ...tags].map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
        </div>
        <div className="2xs:grid-cols-1 grid w-full grid-cols-2 gap-6">
          <div className="2xs:mx-auto 2xs:w-2/3 relative">
            <img
              className="inline-block aspect-square"
              src={thumbnail}
              alt={`${title}`}
            />
            <SavedBtn />
          </div>
          <div className="2xs:max-w-full 2xs:px-4 max-w-sm">
            <div className="flex w-full" onClick={switchHandler}>
              {['Ingredients', 'Instructions'].map((label) => (
                <div
                  key={label}
                  className={twMerge(
                    'heading-h5 font-primary w-full cursor-pointer overflow-hidden rounded-t-2xl py-2 text-center font-bold',
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
        <a className="paragraph-small group-hover:paragraph-medium font-secondary text-primary-main pt-4 font-semibold transition-all">
          ADD A POST
        </a>
        <Icon
          name="add"
          className="border-primary-main text-primary-main group-hover:bg-primary-main group-hover:text-white-100 rounded-full border-2 px-2 py-2 text-2xl transition-all"
        />
      </div>
    </ModalCard>
  );
}

Recipe.propTypes = {
  onEdit: PropTypes.func.isRequired,
};
