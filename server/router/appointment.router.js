const router = require("express").Router();

const AppointmentController = require("../controllers/appointment.controller");

router.post("/appointments", AppointmentController.postAppointments);
router.get("/getappointments", AppointmentController.getAppointments);
router.get("/getappointmentsbyemail", AppointmentController.getappointmentsbyemail);
router.get("/appointments/count", AppointmentController.countAppointments);
router.post("/post/doctor/appointment", AppointmentController.postDoctorAppointment);
router.get("/getappointmentsbydate", AppointmentController.getAppointmentsByDate); 
router.post("/appointmentcancel", AppointmentController.cancelAppointment);
router.post("/getpositioninqueue", AppointmentController.getPositionInQueue);
router.get("/getAppointmentsByDateAndDoctor", AppointmentController.getAppointmentsByDateAndDoctor);
router.put("/updateappointment/:id", AppointmentController.updateappointment);

module.exports = router;