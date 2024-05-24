const router = require("express").Router();

const PatientController = require("../controllers/patients.controller");

router.post("/patientsinfo", PatientController.patientsInfo);
router.post("/checkpatient", PatientController.checkPatient);
router.get("/patients/:email", PatientController.getPatientbyEmail);
router.get("/getpatients", PatientController.getPatients);
router.delete("/deletepatients/:email", PatientController.deletePatientByEmail);
router.put("/updatepatients/:email", PatientController.updatePatientByEmail); 
router.get("/patientstatnum", PatientController.patientNumbersStat); 

module.exports = router;