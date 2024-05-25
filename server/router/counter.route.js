const router = require("express").Router();

const CounterController = require("../controllers/counter.controller");


router.get("/stats", CounterController.countStats);
router.get("/patientstats/:email", CounterController.countDataByPatientEmail);
router.get("/doctorstats/:email", CounterController.countDataByDoctorEmail);
router.get('/stats/sample-collections/status', CounterController.countSampleCollectionsByStatus);

module.exports = router;
