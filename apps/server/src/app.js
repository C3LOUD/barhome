const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const recipeRoutes = require('./routes/recipe');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');

const app = express();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

app.use(cors());
app.use(helmet());

app.use('/recipe', recipeRoutes);
app.use('/auth', authRoutes);
app.use('/post', postRoutes);

app.use((error, req, res) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message });
});

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
