const router = require("express").Router();

const PatientController = require("../controllers/patients.controller");

router.post("/patientsinfo", PatientController.patientsInfo);
router.post("/checkpatient", PatientController.checkPatient);
router.get("/patients/:email", PatientController.getPatientbyEmail);
router.get("/patients/:email", PatientController.getPatientbyEmail);


module.exports = router;