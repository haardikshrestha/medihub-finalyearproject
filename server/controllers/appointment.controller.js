const express = require("express");
const Appointment = require("../models/patient-models/appointmentsSchema");
const app = express();
app.use(express.json());

const postAppointments = async (req, res) => {
  try {
    const newAppointment = new Appointment({
      apptID: req.body.apptID,
      apptDate: req.body.apptDate,
      apptPatient: req.body.apptPatient,
      apptTime: req.body.apptTime,
      apptDoctor: req.body.apptDoctor,
      apptStatus: req.body.apptStatus,
      apptDisease: req.body.apptDisease,
      paymentStatus: req.body.paymentStatus,
      transactionID: req.body.transactionID,
    });

    const savedAppointment = await newAppointment.save();

    res.status(201).json(savedAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();

    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getappointmentsbyemail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const appointments = await Appointment.find({ email });

    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments scheduled yet" });
    }

    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const countAppointments = async (req, res) => {
    try {
      const appointmentCount = await Appointment.countDocuments();
  
      res.status(200).json({ count: appointmentCount });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

const AppointmentController = {
  postAppointments,
  getAppointments,
  getappointmentsbyemail,
  countAppointments
};

module.exports = AppointmentController;
