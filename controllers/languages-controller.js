const knex = require('knex')(require('../knexfile'));

const createLanguage = async (req, res) => {
  const { description } = req.body;

  try {
    const [languageId] = await knex('languages').insert({ description });
    const newLanguage = await knex('languages').where('id', languageId).first();
    res.status(201).json(newLanguage);
  } catch (error) {
    res.status(500).json({ error: `Error creating language: ${error}` });
  }
};

const getAllLanguages = async (req, res) => {
  try {
    const languages = await knex('languages').select('*');
    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ error: `Error getting languages: ${error}` });
  }
};

const getLanguageById = async (req, res) => {
  const { id } = req.params;

  try {
    const language = await knex('languages').where('id', id).first();

    if (!language) {
      return res.status(404).json({ message: `Language with ID ${id} not found.` });
    }

    res.status(200).json(language);
  } catch (error) {
    res.status(500).json({ error: `Error getting language: ${error}` });
  }
};

const updateLanguage = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const languageUpdatedCount = await knex('languages').where('id', id).update({ description });

    if (languageUpdatedCount === 0) {
      return res.status(404).json({ message: `Language with ID ${id} not found.` });
    }

    const updatedLanguage = await knex('languages').where('id', id).first();
    res.status(200).json(updatedLanguage);
  } catch (error) {
    res.status(500).json({ error: `Error updating language: ${error}` });
  }
};

const deleteLanguage = async (req, res) => {
  const { id } = req.params;

  try {
    const languageDeletedCount = await knex('languages').where('id', id).del();

    if (languageDeletedCount === 0) {
      return res.status(404).json({ message: `Language with ID ${id} not found.` });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: `Error deleting language: ${error}` });
  }
};

module.exports = {
  createLanguage,
  getAllLanguages,
  getLanguageById,
  updateLanguage,
  deleteLanguage,
};
