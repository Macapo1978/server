const express = require('express');
const router = express.Router();
const languageController = require('../controllers/languages-controller');

router
  .route('/api/languages')
  .post(languageController.createLanguage)
  .get(languageController.getAllLanguages);

router
  .route('/api/languages/:id')
  .get(languageController.getLanguageById)
  .put(languageController.updateLanguage)
  .delete(languageController.deleteLanguage);

module.exports = router;
