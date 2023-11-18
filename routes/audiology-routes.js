const router = require("express").Router();
const auiologyController = require('../controllers/audiology-controller');

router
    .route('/api/audiologies')
    .post(auiologyController.createAudiology)
    .get(auiologyController.getAllAudiologies);

router
    .route('/api/audiologies/:id')    
    .get(auiologyController.getAudiologyById)
    .put(auiologyController.updateAudiology)
    .delete(auiologyController.deleteAudiology);

module.exports = router;    