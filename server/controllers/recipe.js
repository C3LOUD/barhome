const Recipe = require('../models/recipe');

exports.addNewRecipe = (req, res, next) => {
  const recipe = new Recipe(req.body);
  recipe.save().then((result) => {
    res.status(200).json({
      message: 'success',
    });
  });
};

exports.getAllRecipes = async (req, res, next) => {
  try {
    const currentPage = req.body.page || 1;
    const perPage = 24;
    const totalRecipes = await Recipe.find().countDocuments();
    const recipes = await Recipe.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    res.status(200).json({
      message: 'Fetching posts successfully.',
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
