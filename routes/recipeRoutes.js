const express = require('express');
const Recipe = require('../models/Recipe');
const router = express.Router();

// POST a new recipe
router.post('/', async (req, res) => {
  try {
    const recipe = new Recipe({
      title: req.body.title,
      ingredients: req.body.ingredients,
      steps: req.body.steps,
      cookingTime: req.body.cookingTime,
      servings: req.body.servings,
      cuisine: req.body.cuisine,
      mealType: req.body.mealType,
      dietaryRestrictions: req.body.dietaryRestrictions,
      nutritionalInfo: req.body.nutritionalInfo,
      image: req.body.image,
      user: req.body.user
    });

    // Saving the recipe to database
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET recipe by ID
router.get('/:id', getRecipe, (req, res) => {
  res.json(res.recipe);
});

// GET recipe by title (unique)
router.get('/title/:title', async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ title: req.params.title });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE recipe by ID
router.delete('/:id', getRecipe, async (req, res) => {
  try {
    await res.recipe.remove();
    res.json({ message: 'Deleted Recipe' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to fetch recipe by ID
async function getRecipe(req, res, next) {
  let recipe;
  try {
    recipe = await Recipe.findById(req.params.id);
    if (recipe == null) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.recipe = recipe;
  next();
}

module.exports = router;
