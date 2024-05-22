const router = require("express").Router();

const AppointmentController = require("../controllers/appointment.controller");

router.post("/appointments", AppointmentController.postAppointments);
router.get("/getappointments", AppointmentController.getAppointments);
router.get("/getappointmentsbyemail", AppointmentController.getappointmentsbyemail);
router.get("/appointments/count", AppointmentController.countAppointments);
router.post("/post/doctor/appointment", AppointmentController.postDoctorAppointment);
router.get("/getappointmentsbydate", AppointmentController.getAppointmentsByDate); 



module.exports = router;