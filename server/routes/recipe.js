const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/is-auth');
const {
  addNewRecipe,
  getAllRecipes,
  getRecipe,
  findRecipeByIngredient,
  searchRecipe,
  getRandomRecipe,
  savedRecipe,
  getSavedRecipes,
} = require('../controllers/recipe');

router.get('/search', isAuth, searchRecipe);

router.get('/random', isAuth, getRandomRecipe);

router.get('/saved', isAuth, getSavedRecipes);

router.put('/saved', isAuth, savedRecipe);

router.get('/:id', isAuth, getRecipe);

router.get('/ingredient/:ingredient', isAuth, findRecipeByIngredient);

router.get('/', isAuth, getAllRecipes);

router.post('/origin', isAuth, addNewRecipe);

module.exports = router;
