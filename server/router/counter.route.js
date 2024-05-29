const router = require("express").Router();

const CounterController = require("../controllers/counter.controller");


router.get("/stats", CounterController.countStats);
router.get("/patientstats", CounterController.countDataByPatientEmail);
router.get("/doctorstats", CounterController.countDataByDoctorEmail);
router.get('/stats/sample-collections/status', CounterController.countSampleCollectionsByStatus);

module.exports = router;
