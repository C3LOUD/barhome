const express = require('express');
const { addNewRecipe, getAllRecipes } = require('../controllers/recipe');

const router = express.Router();

router.post('/', getAllRecipes);

router.post('/origin', addNewRecipe);

module.exports = router;
