const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  ingredients: [String],
  steps: [String],
  cookingTime: Number,
  servings: Number,
  cuisine: String,
  mealType: String,
  dietaryRestrictions: [String],
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    fat: Number,
    carbohydrates: Number
  },
  image: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
