import React, { useEffect, useState } from 'react';

const useFetchRecipes = (props) => {
  const [recievedData, setRecievedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(null);

  const option =
    props.method === 'POST'
      ? {
          body: JSON.stringify({ page: props.currentPage }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      : null;

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      setHasError(false);
      const jsonData = await fetch(
        `http://localhost:8080/recipe/${props.api || ''}`,
        {
          method: props.method,
          ...option,
        }
      );
      const data = await jsonData.json();
      setRecievedData(data.recipes);
      setIsLoading(false);
      data.totalRecipes && setTotalQuantity(data.totalRecipes);
    };

    try {
      fetchRecipes();
    } catch (err) {
      setHasError(true);
    }
  }, [props.currentPage]);

  return { recievedData, isLoading, totalQuantity, hasError };
};

export default useFetchRecipes;
