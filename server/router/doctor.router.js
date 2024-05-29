const router = require("express").Router();

const DoctorController = require("../controllers/doctors.controller");

router.get("/api/doctors", DoctorController.getDoctorUsers);
router.post("/doctor/resetpassword", DoctorController.doctorReset);
router.get("/getdoctorsbyexpertise/:expertise", DoctorController.getDoctorbyExpertise);
router.get("/getdoctorbyemail/:email", DoctorController.getDoctorbyEmail);
router.post("/deleteDoctor", DoctorController.deleteDoctor);
router.post("/newdoctor", DoctorController.newDoctor);
router.post("/savediagnosis", DoctorController.newDiagnosis);

// -----



module.exports = router;