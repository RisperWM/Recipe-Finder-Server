const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors middleware
const recipesRouter = require('./routes/recipeRoutes'); // Import your recipes router

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });

// Defining my routes
app.get('/', (req, res) => {
  res.send('Recipe Finder API');
});

// Setting up the recipes router for /recipes endpoint
app.use('/recipes', recipesRouter);

const PORT = process.env.PORT || 5000;

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
