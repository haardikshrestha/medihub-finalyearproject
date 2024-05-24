const router = require("express").Router();

const DiagnosisController = require("../controllers/diagnosis.controller");

router.post("/newdiagnosis", DiagnosisController.newDiagnosis);

module.exports = router;