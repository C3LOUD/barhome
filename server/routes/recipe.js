const express = require('express');
const {
  addNewRecipe,
  getAllRecipes,
  getRecipe,
} = require('../controllers/recipe');

const router = express.Router();

router.post('/', getAllRecipes);

router.get('/:id', getRecipe);

router.post('/origin', addNewRecipe);

module.exports = router;
