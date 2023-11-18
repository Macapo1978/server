const express = require('express');
const router = express.Router();
const pexelsController = require('../controllers/pexels-controller');

router.post('/api/pexels/images', pexelsController.getPexelsImages);

module.exports = router;
