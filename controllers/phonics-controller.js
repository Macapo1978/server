const knex = require('knex')(require('../knexfile'));

const getAllPhonics = async (req, res) => {
  try {
    const phonics = await knex('phonics_sounds').select('*');
    res.json(phonics);
  } catch (error) {
    res.status(500).json({ error: `Error getting phonics sounds: ${error}` });
  }
};

const getPhonicById = async (req, res) => {
  const { id } = req.params;
  try {
    const phonic = await knex('phonics_sounds').where('id', id).first();
    if (!phonic) {
      return res.status(404).json({ message: 'Phonic not found' });
    }
    res.json(phonic);
  } catch (error) {
    res.status(500).json({ error: `Error getting phonic: ${error}` });
  }
};

const createPhonic = async (req, res) => {
  const { phonic, image_mouth, image_sound } = req.body;
  try {
    const [newPhonicId] = await knex('phonics_sounds').insert({
      phonic,
      image_mouth,
      image_sound,
    });
    const newPhonic = await knex('phonics_sounds').where('id', newPhonicId).first();
    res.status(201).json(newPhonic);
  } catch (error) {
    res.status(500).json({ error: `Error creating phonic: ${error}` });
  }
};

const updatePhonic = async (req, res) => {
  const { id } = req.params;
  const { phonic, image_mouth, image_sound } = req.body;
  try {
    const updatedRows = await knex('phonics_sounds')
      .where('id', id)
      .update({ phonic, image_mouth, image_sound });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Phonic not found' });
    }

    const updatedPhonic = await knex('phonics_sounds').where('id', id).first();
    res.json(updatedPhonic);
  } catch (error) {
    res.status(500).json({ error: `Error updating phonic: ${error}` });
  }
};

const deletePhonic = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await knex('phonics_sounds').where('id', id).del();

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Phonic not found' });
    }

    res.json({ message: 'Phonic deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: `Error deleting phonic: ${error}` });
  }
};

module.exports = {
  getAllPhonics,
  getPhonicById,
  createPhonic,
  updatePhonic,
  deletePhonic,
};
