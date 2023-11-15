const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();

const PORT = process.env.PORT || 8080;
// MIDDLEWARE
app.use(cors());
app.use(express.json());
// ROUTES
const categoryRoutes = require('./routes/category-routes');
app.use(categoryRoutes);
const languageRoutes = require('./routes/languages-routes');
app.use(languageRoutes);
// test api
app.get('/', (req, res) => {
  res.send('Hello! This is the API');
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});