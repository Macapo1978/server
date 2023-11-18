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
const valNotNull = ( inputFields ) => {
    const { name, description, createdUser_id, words } = inputFields;

    if (!name || !description || !createdUser_id || !words) {
        return false;
    }
    return true;
}
const userExists = async ( user_id ) => {
    const user = await knex('users').where('id', user_id).first();
    return !!user;
}
const wordExists = async (word_id) => {
    const word = await knex('words').where('id', word_id).first();
    return !!word;
}
const createQuiz = async (req, res) => {
    if (!valNotNull(req.body)) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const { name, description, createdUser_id, words } = req.body;
    const foundUser = await userExists(createdUser_id);
    if (!foundUser) {
      return res.status(404).json({ error: `User id ${createdUser_id} not found.` });
    }
    const trx = await knex.transaction();
  
    try {
      const [quizId] = await trx('quizzes').insert({ name, description, createdUser_id });

      if (words && words.length > 0) {
        const wordExistencePromises = words.map(async (word_id) => {
            const foundWord = await wordExists(word_id);
            if (!foundWord) {
              throw new Error(`Word id ${word_id} not found.`);
            }
        });
        await Promise.all(wordExistencePromises);

        const wordInserts = words.map((word_id) => ({ quiz_id: quizId, word_id }));
        await trx('quiz_word').insert(wordInserts);
      }

      await trx.commit();
  
      const newQuiz = await knex('quizzes')
        .where('quizzes.id', quizId)
        .innerJoin('quiz_word', 'quizzes.id', 'quiz_word.quiz_id')
        .innerJoin('words', 'quiz_word.word_id', 'words.id')
        .select(
            'quizzes.id',
            'quizzes.name',
            'quizzes.description',
            'quizzes.createdUser_id',
            'quiz_word.word_id',
            'words.word'
      );
  
      res.status(201).json(newQuiz);
    } catch (error) {
        await trx.rollback();
        res.status(500).json({ error: `Error creating quiz: ${error}` });
    }
  };
  

module.exports = {
    getQuizById,
    getAllQuizzes,
    createQuiz
}