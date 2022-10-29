const { Schema, default: mongoose } = require('mongoose');

const recipeSchema = new Schema({
  id: Number,
  title: String,
  thumbnail: String,
  alcoholic: String,
  category: String,
  instructions: String,
  tags: [String],
  ingredients: [
    {
      ingredient: String,
      quantity: Number,
      unit: String,
    },
  ],
});

module.exports = mongoose.model('Recipe', recipeSchema);
