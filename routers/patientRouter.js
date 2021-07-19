const express = require('express');
const patientController = require('./../controllers/patientController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);
router.post('/imagetotext',patientController.uploadUserPhoto,patientController.imagetotext);
router.post('/updatePatientDocuments',patientController.uploadUserPhoto,patientController.updatePatientDocuments);
router.post('/addpatient',patientController.addPatient);
router.get('/getpatient',patientController.getPatients);
router.post('/updatePatient',patientController.updatePatient);

module.exports = router;