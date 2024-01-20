const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user');
const Recipe = require('./models/recipe');

const seed = async () => {
  await mongoose.connect(process.env.MONGODB);
  const password = await bcrypt.hash('Test1234', 12);
  const user = new User({
    email: 'test@email.com',
    password,
    name: 'test',
  });
  await user.save();

  for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
    const url = new URL(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${String.fromCharCode(i)}`,
    );
    const res = await fetch(url.href);
    const json = await res.json();

    if (!json.drinks) continue;
    const recipeTitles = json.drinks.map((recipe) => recipe.strDrink);

    const existingRecipes = await Recipe.find({ title: { $in: recipeTitles } });

    for (const recipe of json.drinks) {
      if (existingRecipes.some((el) => el.title === recipe.strDrink)) continue;
      const ingredients = [];

      for (let j = 1; j <= 15; j++) {
        const ingredient = recipe[`strIngredient${j}`];
        if (!ingredient) break;
        const measure = recipe[`strMeasure${j}`];
        let quantity = 0;
        const unitArr = [];
        if (measure) {
          measure.split(' ').map((el) => {
            if (!isNaN(Number(el))) {
              quantity += Number(el);
            } else if (el.split('/').every((num) => !isNaN(Number(num)))) {
              quantity += eval(el);
            } else {
              unitArr.push(el);
            }
          });
        }
        const unit = unitArr.join(' ');
        ingredients.push({
          ingredient: ingredient.trim(),
          ...(quantity !== 0 && { quantity }),
          ...(unit !== '' && { unit }),
        });
      }

      await Recipe.create({
        title: recipe.strDrink,
        alcoholic: recipe.strAlcoholic,
        category: recipe.strAlcoholic,
        instructions: recipe.strInstructions,
        thumbnail: recipe.strDrinkThumb,
        ingredients,
        ...(recipe.strTags && {
          tags: recipe.strTags.split(',').map((el) => el.trim()),
        }),
      });
    }
  }
};

seed()
  .then(() => {
    mongoose.connection.close();
    console.log('success');
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
