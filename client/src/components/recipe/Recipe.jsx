import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchRecipes from '../../hooks/useFetchRecipes';
import Icon from '../ui/Icon';
import ModalCard from '../ui/ModalCard';
import Tag from '../ui/Tag';
import CounterRecipe from './CounterRecipe';
import IngredientRecipe from './IngredientRecipe';
import InstructionRecipe from './InstructionRecipe';

const Recipe = (props) => {
  const [currentShow, setCurrentShow] = useState('Ingredients');
  const [counter, setCounter] = useState(1);
  const { id } = useParams();

  const { recievedData } = useFetchRecipes({ method: 'GET', api: id });
  const {
    title,
    category,
    alcoholic,
    thumbnail,
    ingredients,
    instructions,
    tags,
  } = recievedData;

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
      <div className="flex flex-col items-center w-full">
        <p className="font-primary display-small font-bold pb-2">{title}</p>
        <div className="flex gap-2 pb-8">
          {recievedData.length !== 0 &&
            [alcoholic, category, ...tags].map((tag, i) => (
              <Tag key={i}>{tag}</Tag>
            ))}
        </div>
        <div className="w-full grid grid-cols-2 gap-6">
          <img
            className="inline-block aspect-square"
            src={thumbnail}
            alt={`${title} photo`}
          />
          <div className="max-w-sm mr-6">
            <div className="flex" onClick={switchHandler}>
              {['Ingredients', 'Instructions'].map((label) => {
                return (
                  <div
                    key={label}
                    className={`w-full rounded-t-2xl py-2 text-center cursor-pointer overflow-hidden heading-h5 font-bold font-primary ${
                      label === currentShow
                        ? 'bg-accent-dark-main text-white-100'
                        : 'text-accent-dark-main'
                    }`}
                  >
                    <p className={`hover:scale-110 transition-all`}>{label}</p>
                  </div>
                );
              })}
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
        className="flex flex-col gap-2 items-center group cursor-pointer"
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
