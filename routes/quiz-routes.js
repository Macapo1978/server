const express = require('express');
const router = express.Router();
const quizzesController = require('../controllers/quizz-controller');

router
    .route('/api/quizzes')
    .post(quizzesController.createQuiz)
    .get(quizzesController.getAllQuizzes);

router
    .route('/api/quizzes/:id')    
    .put(quizzesController.updateQuiz)
    .delete(quizzesController.deleteQuiz)
    .get(quizzesController.getQuizById);

router.route('/api/quizzesUser')    
    .post(quizzesController.getQuizzesUser);


module.exports = router;    