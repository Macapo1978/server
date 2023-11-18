const knex = require('knex')(require('../knexfile'));

const getAudiologyById = async (req, res) => {
  const audiologyId = req.params.id;

  try {
    const audiology = await knex('audiologies')
      .where('id', audiologyId)
      .first();

    if (!audiology) {
      return res.status(404).json({ message: `Audiology with ID ${audiologyId} not found.` });
    }

    res.status(200).json(audiology);
  } catch (error) {
    res.status(500).json({ error: `Error getting audiology: ${error}` });
  }
};

const getAllAudiologies = async (req, res) => {
  try {
    const audiologies = await knex('audiologies');
    res.status(200).json(audiologies);
  } catch (error) {
    res.status(500).json({ error: `Error getting audiologies: ${error}` });
  }
};

const createAudiology = async (req, res) => {
  const { name, last_name, user_id } = req.body;

  try {
    const [audiologyId] = await knex('audiologies').insert({ name, last_name, user_id });
    const newAudiology = await knex('audiologies').where('id', audiologyId).first();
    res.status(201).json(newAudiology);
  } catch (error) {
    res.status(500).json({ error: `Error creating audiology: ${error}` });
  }
};

const updateAudiology = async (req, res) => {
  const audiologyId = req.params.id;
  const { name, last_name, user_id } = req.body;

  try {
    const updatedRows = await knex('audiologies').where('id', audiologyId).update({ name, last_name, user_id });
    if (updatedRows === 0) {
      return res.status(404).json({ message: `Audiology with ID ${audiologyId} not found.` });
    }
    const updatedAudiology = await knex('audiologies').where('id', audiologyId).first();
    res.status(200).json(updatedAudiology);
  } catch (error) {
    res.status(500).json({ error: `Error updating audiology: ${error}` });
  }
};

const deleteAudiology = async (req, res) => {
  const audiologyId = req.params.id;

  try {
    const deletedRows = await knex('audiologies').where('id', audiologyId).del();
    if (deletedRows === 0) {
      return res.status(404).json({ message: `Audiology with ID ${audiologyId} not found.` });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: `Error deleting audiology: ${error}` });
  }
};

module.exports = {
  getAudiologyById,
  getAllAudiologies,
  createAudiology,
  updateAudiology,
  deleteAudiology,
};
