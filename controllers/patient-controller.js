const knex = require('knex')(require('../knexfile'));

const getPatientById = async (req, res) => {
  const patientId = req.params.id;

  try {
    const patient = await knex('patients')
      .where('id', patientId)
      .first();

    if (!patient) {
      return res.status(404).json({ message: `Patient with ID ${patientId} not found.` });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: `Error getting patient: ${error}` });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patients = await knex('patients');
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: `Error getting patients: ${error}` });
  }
};

const createPatient = async (req, res) => {
  const { name, last_name, user_id } = req.body;

  try {
    const [patientId] = await knex('patients').insert({ name, last_name, user_id });
    const newPatient = await knex('patients').where('id', patientId).first();
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ error: `Error creating patient: ${error}` });
  }
};

const updatePatient = async (req, res) => {
  const patientId = req.params.id;
  const { name, last_name, user_id } = req.body;

  try {
    const updatedRows = await knex('patients').where('id', patientId).update({ name, last_name, user_id });
    if (updatedRows === 0) {
      return res.status(404).json({ message: `Patient with ID ${patientId} not found.` });
    }
    const updatedPatient = await knex('patients').where('id', patientId).first();
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ error: `Error updating patient: ${error}` });
  }
};

const deletePatient = async (req, res) => {
  const patientId = req.params.id;

  try {
    const deletedRows = await knex('patients').where('id', patientId).del();
    if (deletedRows === 0) {
      return res.status(404).json({ message: `Patient with ID ${patientId} not found.` });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: `Error deleting patient: ${error}` });
  }
};

module.exports = {
  getPatientById,
  getAllPatients,
  createPatient,
  updatePatient,
  deletePatient,
};
