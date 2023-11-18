const knex = require('knex')(require('../knexfile'));

const getQuizById = async (req, res) => {
    const quizId = req.params.id;
  
    try {
      const quiz = await knex('quizzes')
        .where('quizzes.id', quizId)
        .innerJoin('quiz_word', 'quizzes.id', 'quiz_word.quiz_id')
        .select(
          'quizzes.id',
          'quizzes.name',
          'quizzes.description',
          'quizzes.createdUser_id',
          'quiz_word.word_id'
        );
  
      if (!quiz) {
        return res.status(404).json({ message: `Quiz with ID ${quizId} not found.` });
      }
  
      res.status(200).json(quiz);
    } catch (error) {
      res.status(500).json({ error: `Error getting quiz: ${error}` });
    }
};
  
const getAllQuizzes = async (req, res) => {
    try {
      const quizzes = await knex('quizzes')
        .innerJoin('quiz_word', 'quizzes.id', 'quiz_word.quiz_id')
        .select(
          'quizzes.id',
          'quizzes.name',
          'quizzes.description',
          'quizzes.createdUser_id',
          'quiz_word.word_id'
        );
  
        res.status(200).json(quizzes);

    } catch (error) {
      res.status(500).json({ error: `Error getting quizzes: ${error}` });
    }
};

module.exports = {
    getQuizById,
    getAllQuizzes
}