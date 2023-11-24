const knex = require('knex')(require('../knexfile'));

const groupQuizzes = async (quizId, searchName = null) => {
    let query = knex('quizzes')
        .innerJoin('quiz_word', 'quizzes.id', 'quiz_word.quiz_id')
        .select(
            'quizzes.id',
            'quizzes.name',
            'quizzes.description',
            'quizzes.createdUser_id',
            'quiz_word.word_id'
        );

    if (quizId !== null && quizId !== undefined) {
        query = query.where('quizzes.id', quizId);
    }
    if (searchName !== null && searchName !== undefined) {
        query = query.where('quizzes.name', 'like', `%${searchName}%`);
    }

    const quizzes = await query;

    const groupedQuizzes = quizzes.reduce((acc, quiz) => {
        const existingQuiz = acc.find((q) => q.id === quiz.id);

        if (existingQuiz) {
            existingQuiz.words.push({ word_id: quiz.word_id });
        } else {
            acc.push({
                id: quiz.id,
                name: quiz.name,
                description: quiz.description,
                createdUser_id: quiz.createdUser_id,
                words: [{ word_id: quiz.word_id }],
            });
        }

        return acc;
    }, []);

    return groupedQuizzes;
};

const getQuizById = async (req, res) => {
    const quizId = req.params.id;
  
    try {
        const quiz = await groupQuizzes(quizId);
        if (!quiz) {
            return res.status(404).json({ message: `Quiz with ID ${quizId} not found.` });
        }
    
        res.status(200).json(quiz);
    } catch (error) {
      res.status(500).json({ error: `Error getting quiz: ${error}` });
    }
};

const getQuizByName = async (req, res) => {
    const searchName = req.params.searchQuiz;
    try {
        const groupedQuizzes = await groupQuizzes(null, searchName);
        res.status(200).json(groupedQuizzes);

    } catch (error) {
      res.status(500).json({ error: `Error getting quizzes: ${error}` });
    }
}
  
const getAllQuizzes = async (req, res) => {
    try {
        const groupedQuizzes = await groupQuizzes();
        res.status(200).json(groupedQuizzes);

    } catch (error) {
      res.status(500).json({ error: `Error getting quizzes: ${error}` });
    }
};

const getQuizzesUser = async (req, res) => {

    const {quiz_id, user_id} = req.body;
    if (!quiz_id || !user_id){
        return res.status(400).json({ error: 'All fields are required.' });
    }
    try {
        const quizUser = await knex('quiz_user')
            .where({quiz_id: quiz_id, user_id: user_id })
            .select('*')
            .first();

        return res.status(200).json(quizUser);

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
        const wordExistencePromises = words.map(async (word) => {
            const { word_id } = word;
            const foundWord = await wordExists(word_id);
            if (!foundWord) {
              throw new Error(`Word id ${word_id} not found.`);
            }
        });
        await Promise.all(wordExistencePromises);

        const wordInserts = words.map((word) => ({ quiz_id: quizId, word_id: word.word_id }));
        await trx('quiz_word').insert(wordInserts);
      }

      await trx.commit();
  
      const newQuiz = await groupQuizzes(quizId);
  
      res.status(201).json(newQuiz);
    } catch (error) {
        await trx.rollback();
        res.status(500).json({ error: `Error creating quiz: ${error}` });
    }
};

const updateQuiz = async (req, res) => {
    if (!valNotNull(req.body)) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    const { name, description, createdUser_id, words } = req.body;
    const quizId = req.params.id;

    const foundUser = await userExists(createdUser_id);
    if (!foundUser) {
        return res.status(404).json({ error: `User id ${createdUser_id} not found.` });
    }

    const trx = await knex.transaction();

    try {
        await trx('quiz_word').where('quiz_id', quizId).del();
        if (words && words.length > 0) {
            const wordExistencePromises = words.map(async (word) => {
                const { word_id } = word;
                const foundWord = await wordExists(word_id);
                if (!foundWord) {
                    throw new Error(`Word id ${word_id} not found.`);
                }
            });

            await Promise.all(wordExistencePromises);
            const wordInserts = words.map((word) => ({ quiz_id: quizId, word_id: word.word_id }));
            await trx('quiz_word').insert(wordInserts);
        }
        await trx('quizzes').where('id', quizId).update({ name, description, createdUser_id });
        await trx.commit();

        const updatedQuiz = await groupQuizzes(quizId);

        res.status(200).json(updatedQuiz);
    } catch (error) {
        await trx.rollback();
        res.status(500).json({ error: `Error updating quiz: ${error.message}` });
    }
};
  
const deleteQuiz = async (req, res) => {
    const quizId = req.params.id;
  
    try {
      const deletedRows = await knex('quizzes').where('id', quizId).del();
      if (deletedRows === 0) {
        return res.status(404).json({ message: `Quiz with ID ${quizId} not found.` });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: `Error deleting quiz: ${quizId}, error: ${error}` });
    }
};

module.exports = {
    getQuizById,
    getAllQuizzes,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    getQuizzesUser,
    getQuizByName
}