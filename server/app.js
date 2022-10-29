const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const recipeRoutes = require('./routes/recipe');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/recipe', recipeRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const { status = 500, message, data } = error;
  res.status(status).json({ message, data });
});

mongoose
  .connect(process.env.MONGODB)
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
