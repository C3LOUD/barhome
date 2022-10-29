import fetch from 'node-fetch';

const fetchData = async (letter) => {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
  );

  const datas = await res.json();
  if (!datas.drinks) return;

  datas.drinks.map((el) => {
    const {
      idDrink,
      strDrink: title,
      strDrinkThumb: thumbnail,
      strAlcoholic: alcoholic,
      strCategory: category,
      strInstructions: instructions,
      strTags: tagsRaw,
    } = el;

    let tags;
    if (tagsRaw) tags = tagsRaw.split(',');

    const ingredients = [];
    for (let i = 1; i < 16; i++) {
      let ingredient = el['strIngredient' + i];
      let measure = el['strMeasure' + i];

      if (ingredient === null && measure === null) break;

      ingredient = ingredient?.trim();
      measure = measure?.trim().split(' ');

      const unitArr = [];
      let quantity = 0;
      measure?.forEach((el) => {
        if (el === 'undefined') return;
        if (isNaN(el) && !el.includes('/')) return unitArr.push(el);

        if (el.includes('/')) {
          const [a, b] = el.split('/');
          return (quantity +=
            Math.round((Number(a) / Number(b)) * 1000) / 1000);
        }
        return (quantity += +el);
      });

      const unit = unitArr.join(' ');

      ingredients.push({
        ingredient,
        quantity,
        unit,
      });
    }

    const id = Number(idDrink);

    const recipe = {
      id,
      title,
      thumbnail,
      alcoholic,
      category,
      instructions,
      tags,
      ingredients,
    };

    fetch('http://localhost:8080/recipe/origin', {
      method: 'POST',
      body: JSON.stringify(recipe),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  });
};

for (let letter = 97; letter < 123; letter++) {
  const alphabet = String.fromCharCode(letter);

  try {
    await fetchData(alphabet);
  } catch (error) {
    console.log(error);
  }
}
