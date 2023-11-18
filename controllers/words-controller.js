const knex = require('knex')(require('../knexfile'));

const createWord = async (req, res) => {
  const {
    word,
    language_id,
    start_phonics_sounds_id,
    middle_phonics_sounds_id,
    end_phonics_sounds_id,
    syllables,
    category_id
  } = req.body;

  const trx = await knex.transaction();

  try {
    const upperCaseWord = word.toUpperCase();

    const existingWord = await trx('words')
      .where('word', upperCaseWord)
      .first();

    if (existingWord) {
      res.status(400).json({ error: 'Word already exists' });
      return;
    }
    const [wordId] = await trx('words').insert({
        word: upperCaseWord,
        language_id,
        start_phonics_sounds_id,
        middle_phonics_sounds_id,
        end_phonics_sounds_id,
        syllables
    });

    await trx('word_category').insert({
        word_id: wordId,
        category_id: category_id
      });

    await trx.commit();

    const newWord = await knex('words as w')
      .select('w.id as word_id', 'w.word', 'w.language_id', 'w.syllables', 'c.id as category_id', 'c.description as category_description')
      .leftJoin('word_category as wc', 'w.id', 'wc.word_id')
      .leftJoin('categories as c', 'wc.category_id', 'c.id')
      .where('w.id', wordId)
      .first();

    res.status(201).json(newWord);
  } catch (error) {
    await trx.rollback();
    res.status(500).json({ error: `Error creating word: ${error.message}` });
  }
};

// READ
const getAllWords = async (req, res) => {
  try {
    const words = await knex('words')
      .select('words.*', 'languages.description as language_description')
      .leftJoin('languages', 'words.language_id', 'languages.id')
      .leftJoin('phonics_sounds as start_sounds', 'words.start_phonics_sounds_id', 'start_sounds.id')
      .leftJoin('phonics_sounds as middle_sounds', 'words.middle_phonics_sounds_id', 'middle_sounds.id')
      .leftJoin('phonics_sounds as end_sounds', 'words.end_phonics_sounds_id', 'end_sounds.id')
      .select(
        'start_sounds.phonic as start_phonic',
        'middle_sounds.phonic as middle_phonic',
        'end_sounds.phonic as end_phonic'
      );

    res.json(words);
  } catch (error) {
    res.status(500).json({ error: `Error getting words: ${error.message}` });
  }
};

// UPDATE
const updateWord = async (req, res) => {
    const {
      word,
      language_id,
      start_phonics_sounds_id,
      middle_phonics_sounds_id,
      end_phonics_sounds_id,
      syllables,
      category_id  
    } = req.body;
  
    const trx = await knex.transaction();
  
    try {
      const upperCaseWord = word.toUpperCase();
  
      const existingWord = await trx('words')
        .where('word', upperCaseWord)
        .whereNot('id', req.params.id)
        .first();
  
      if (existingWord) {
        res.status(400).json({ error: 'Word already exists' });
        return;
      }
  
      const rowsUpdated = await trx('words')
        .where({ id: req.params.id })
        .update({
          word: upperCaseWord,
          language_id,
          start_phonics_sounds_id,
          middle_phonics_sounds_id,
          end_phonics_sounds_id,
          syllables
        });
  
      if (rowsUpdated === 0) {
        return res.status(404).json({
          message: `Word with ID ${req.params.id} not found`
        });
      }
  
      await trx('word_category')
        .where({ word_id: req.params.id })
        .update({
          word_id: req.params.id,
          category_id: category_id
        });
  
      await trx.commit();
  
      const updatedWord = await knex('words as w')
        .select('w.id', 'w.word', 'w.language_id', 'w.syllables', 'c.id as category_id', 'c.description as category_description')
        .leftJoin('word_category as wc', 'w.id', 'wc.word_id')
        .leftJoin('categories as c', 'wc.category_id', 'c.id')
        .where('w.id', req.params.id)
        .first();
  
      res.status(200).json(updatedWord);
    } catch (error) {
      await trx.rollback();
      res.status(500).json({
        message: `Unable to update word with ID ${req.params.id}: ${error.message}`
      });
    }
  };
  
const deleteWord = async (req, res) => {
  try {
    const rowsDeleted = await knex('words')
      .where({ id: req.params.id })
      .del();

    if (rowsDeleted === 0) {
      return res.status(404).json({
        message: `Word with ID ${req.params.id} not found`
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete word with ID ${req.params.id}: ${error.message}`
    });
  }
};

const getWordById = async (req, res) => {
    try {
      const word = await knex('words')
        .select('words.*', 'languages.description as language_description')
        .leftJoin('languages', 'words.language_id', 'languages.id')
        .leftJoin('phonics_sounds as start_sounds', 'words.start_phonics_sounds_id', 'start_sounds.id')
        .leftJoin('phonics_sounds as middle_sounds', 'words.middle_phonics_sounds_id', 'middle_sounds.id')
        .leftJoin('phonics_sounds as end_sounds', 'words.end_phonics_sounds_id', 'end_sounds.id')
        .select(
          'start_sounds.phonic as start_phonic',
          'middle_sounds.phonic as middle_phonic',
          'end_sounds.phonic as end_phonic'
        )
        .where('words.id', req.params.id)
        .first();
  
      if (!word) {
        return res.status(404).json({
          message: `Word with ID ${req.params.id} not found`
        });
      }
  
      res.json(word);
    } catch (error) {
      res.status(500).json({ error: `Error getting word by ID: ${error.message}` });
    }
  };
  

module.exports = {
  createWord,
  getAllWords,
  getWordById,
  updateWord,
  deleteWord
};
