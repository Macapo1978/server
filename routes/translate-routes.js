const express = require('express');
const router = express.Router();
const translateController = require('../controllers/translate-controller');

router.post('/api/tranlateText', translateController.translateText);

module.exports = router;