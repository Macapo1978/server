const router = require("express").Router();
const patientController = require("../controllers/patient-controller");

router
    .route('/api/patients')
    .post(patientController.createPatient)
    .get(patientController.getAllPatients);

router
    .route('/api/patients/:id')
    .get(patientController.getPatientById)
    .put(patientController.updatePatient)
    .delete(patientController.deletePatient);

router
    .route('/api/patients/searchbyname/:search') 
    .get(patientController.getPatientsByName);
    
module.exports = router;