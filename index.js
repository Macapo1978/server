const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();

const PORT = process.env.PORT || 8080;
// MIDDLEWARE
app.use(cors());
app.use(express.json());
// ROUTES CATEGORIES
const categoryRoutes = require('./routes/category-routes');
app.use(categoryRoutes);
// ROUTES LANGUAGES
const languageRoutes = require('./routes/languages-routes');
app.use(languageRoutes);
// ROUTES PHONICS
const phonicRoutes = require('./routes/phonics-routes');
app.use(phonicRoutes);
// ROUTES WORD
const wordRoutes = require("./routes/words-routes");
app.use(wordRoutes);
// ROUTES USER
const userRoutes = require("./routes/user-routes");
app.use(userRoutes);
// ROUTES PATIENTS
const patientRoutes = require('./routes/patient-routes');
app.use(patientRoutes);
// ROUTES PEXELS
const pexelsRoutes = require('./routes/pexels-routes');
app.use(pexelsRoutes);

// test api
app.get('/', (req, res) => {
  res.send('Hello! This is the API');
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});