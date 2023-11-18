const knex = require('knex')(require('../knexfile'));

const getPatientById = async (req, res) => {
  const patientId = req.params.id;

  try {
    const patient =  await knex('patients')
        .where('patients.id', patientId)
        .innerJoin('patients_audiologies', 'patients.id', 'patients_audiologies.patient_id')
        .innerJoin('audiologies', 'patients_audiologies.audiology_id', 'audiologies.id')
        .select('patients.id', 'patients.name', 'patients.last_name', 'audiologies.id as audiology_id', 'audiologies.name as audiology_name', 'audiologies.last_name as audiology_last_name')
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
    const patients = await knex('patients')
        .where('patients.id', patientId)
        .innerJoin('patients_audiologies', 'patients.id', 'patients_audiologies.patient_id')
        .innerJoin('audiologies', 'patients_audiologies.audiology_id', 'audiologies.id')
        .select('patients.id', 'patients.name', 'patients.last_name', 'audiologies.id as audiology_id', 'audiologies.name as audiology_name', 'audiologies.last_name as audiology_last_name');

    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: `Error getting patients: ${error}` });
  }
};

const valNotNull = ( inputPatient ) => {
    const { name, last_name, user_id, audiology_id } = inputPatient;

    if (!name || !last_name || !user_id || !audiology_id) {
        return false;
    }
    return true;
}

const audiologyExists = async ( audiology_id) => {
    const audiologyExists = await knex('audiologies').where('id', audiology_id).first();

    if (!audiologyExists) {
      return false;
    }
    return true;
}

const createPatient = async (req, res) => {
    if (!valNotNull(req.body)) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    if (!audiologyExists (req.body.audiology_id)) {
      return res.status(404).json({ error: 'Audiology not found.' });
    }

    const { name, last_name, user_id, audiology_id } = req.body;
    try {
        await knex.transaction(async (trx) => {
            const [patientId] = await trx('patients').insert({ name, last_name, user_id });
            await trx('patients_audiologies').insert({ patient_id: patientId, audiology_id});

            await trx.commit();

            const newPatient = await knex('patients')
                .where('patients.id', patientId)
                .innerJoin('patients_audiologies', 'patients.id', 'patients_audiologies.patient_id')
                .innerJoin('audiologies', 'patients_audiologies.audiology_id', 'audiologies.id')
                .select('patients.id', 'patients.name', 'patients.last_name', 'audiologies.id as audiology_id', 'audiologies.name as audiology_name', 'audiologies.last_name as audiology_last_name')
                .first();

            res.status(201).json(newPatient);
        
        });
    } catch (error) {
        await trx.rollback();
        res.status(500).json({ error: `Error creating patient: ${error}` });
    }
};

const updatePatient = async (req, res) => {
    if (!valNotNull(req.body)) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    if (!audiologyExists (req.body.audiology_id)) {
        return res.status(404).json({ error: 'Audiology not found.' });
    }
    
    const patientId = req.params.id;
    const { name, last_name, user_id, audiology_id } = req.body;

    try {
        await knex.transaction( async (txt) => { 
            const updatedRows = await trx('patients').where('id', patientId).update({ name, last_name, user_id });
            if (updatedRows === 0) {
                trx.rollback();
                return res.status(404).json({ message: `Patient with ID ${patientId} not found.` });
            }
            await trx('patients_audiologies').where('patient_id', patientId).update({audiology_id});
            trx.commit();

            const updatedPatient = await knex('patients')
                .where('patients.id', patientId)
                .innerJoin('patients_audiologies', 'patients.id', 'patients_audiologies.patient_id')
                .innerJoin('audiologies', 'patients_audiologies.audiology_id', 'audiologies.id')
                .select('patients.id', 'patients.name', 'patients.last_name', 'audiologies.id as audiology_id', 'audiologies.name as audiology_name', 'audiologies.last_name as audiology_last_name')
                .first();

            res.status(200).json(updatedPatient);

        });
    } catch (error) {
        await trx.rollback();
        res.status(500).json({ error: `Error updating patient: ${patientId} error: ${error}` });
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
