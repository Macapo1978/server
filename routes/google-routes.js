const express = require('express');
const router = express.Router();
const googleTransController = require('../controllers/google-controller');

router.post('/api/translate', googleTransController.getTranslate);

module.exports = router;