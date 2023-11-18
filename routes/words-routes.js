const express = require('express');
const router = express.Router();
const wordsController = require('../controllers/words-controller');

console.log("estoy aca linea 5")
router
  .route('/api/words')
  .post(wordsController.createWord)
  .get(wordsController.getAllWords);

router
  .route('/api/words/:id')
  .put(wordsController.updateWord)
  .delete(wordsController.deleteWord)
  .get(wordsController.getWordById);

module.exports = router;
