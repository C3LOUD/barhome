const Recipe = require('../models/recipe');
const User = require('../models/user');

exports.addNewRecipe = async (req, res, next) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(200).json({
      message: 'success',
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllRecipes = async (req, res, next) => {
  try {
    const currentPage = req.query.page || 1;
    const perPage = 24;
    const totalRecipes = await Recipe.find().countDocuments().exec();
    const recipes = await Recipe.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .exec();
    res.status(200).json({
      message: 'Fetching recipes successfully.',
      recipes,
      totalRecipes,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findOne({ title: req.params.id }).exec();
    if (!recipe) {
      const error = new Error('Find no recipe.');
      error.statusCode = 422;
      throw error;
    }

    res.status(200).json({
      message: 'fetching recipe success.',
      recipe,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.findRecipeByIngredient = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({
      'ingredients.ingredient': req.params.ingredient,
    }).exec();
    if (!recipes) {
      const error = new Error('Find no recipes.');
      error.statusCode = 422;
      throw error;
    }

    res.status(200).json({
      message: `fetching recipe by ${req.params.ingredient} success.`,
      recipes,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.searchRecipe = async (req, res, next) => {
  try {
    const recipes = await Recipe.find(
      {
        title: { $regex: req.query.q, $options: 'i' },
      },
      'title'
    ).exec();
    if (recipes.length === 0) {
      return res.status(200).json({
        message: `Your search - ${req.query.q} - did not match any documents.`,
        recipes: [],
      });
    }

    res.status(200).json({ message: `Search ${req.query.q} success`, recipes });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.savedRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findOne({ title: req.body.title }).exec();
    const user = await User.findById(req.userId);
    if (user.saved.some((el) => el === recipe.title)) {
      user.saved = user.saved.filter((el) => el !== recipe.title);
    } else {
      user.saved.push(recipe.title);
    }
    await user.save();
    res.status(200).json({ message: 'Saved recipes successfully.' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getSavedRecipes = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    const recipes = await Recipe.find({ title: user.saved });
    res
      .status(200)
      .json({ message: 'fetching user saved recipes success', recipes });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getRandomRecipe = async (req, res, next) => {
  try {
    const totalRecipes = await Recipe.find().countDocuments().exec();
    const randomNumber = Math.floor(Math.random() * totalRecipes);
    const recipe = await Recipe.findOne().skip(randomNumber).exec();
    res.status(200).json({
      message: 'Fetching recipes successfully.',
      title: recipe.title,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
