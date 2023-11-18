const express = require('express');
const router = express.Router();
const phonicsController = require('../controllers/phonics-controller');

router
  .route('/api/phonics')
  .get(phonicsController.getAllPhonics)
  .post(phonicsController.createPhonic);

router
  .route('/api/phonics/:id')
  .get(phonicsController.getPhonicById)
  .put(phonicsController.updatePhonic)
  .delete(phonicsController.deletePhonic);

module.exports = router;
