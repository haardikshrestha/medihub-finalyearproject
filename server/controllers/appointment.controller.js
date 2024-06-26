const express = require("express");
const Appointment = require("../models/patient-models/appointmentsSchema");
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

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

    const appointments = await Appointment.find({ apptPatient: email });

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

const postDoctorAppointment = async (req, res) => {
  const generateRandomId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }
    return id;
  };

  try {
    const { apptDate, apptPatient, apptTime, apptDoctor, apptReason } = req.body;

    const existingAppointments = await Appointment.find({
      apptDate,
      apptTime,
      apptDoctor,
    });

    if (existingAppointments.length > 0) {
      return res.status(400).json({ message: 'Appointment time is already booked' });
    }

    let apptID = generateRandomId();
    let existingAppointment = await Appointment.findOne({ apptID });

    while (existingAppointment) {
      apptID = generateRandomId();
      existingAppointment = await Appointment.findOne({ apptID });
    }

    const newAppointment = new Appointment({
      apptID,
      apptDate,
      apptPatient,
      apptTime,
      apptDoctor,
      apptReason,
    });

    await newAppointment.save();

    const mailOptions = {
      from: 'your-email@example.com',
      to: apptPatient,
      subject: 'Appointment Confirmation',
      text: `Dear Patient,

Your appointment with Dr. ${newAppointment.apptDoctor} has been scheduled for ${newAppointment.apptDate} at ${newAppointment.apptTime}.

Reason: ${newAppointment.apptReason}

You will be notified after confirmation.

Regards,
MediHub Team`,
    };

    await transporter.sendMail(mailOptions);

    const doctorMailOptions = {
      from: 'your-email@example.com',
      to: newAppointment.apptDoctor,
      subject: 'New Appointment Scheduled',
      text: `Dear Doctor, A new appointment has been scheduled for you with ${newAppointment.apptPatient} on ${newAppointment.apptDate} at ${newAppointment.apptTime}. Reason: ${newAppointment.apptReason} Please confirm the appointment at your earliest convenience. Regards, MediHub Team`,
    };
    await transporter.sendMail(doctorMailOptions);

    res.status(201).json(newAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const getAppointmentsByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const appointments = await Appointment.find({ apptDate: date, apptStatus: "Scheduled" });

    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAppointmentsByDateAndDoctor= async (req, res) => {
  const { date, doctorEmail } = req.query;

  if (!date || !doctorEmail) {
    return res.status(400).json({ error: 'Date and doctorEmail are required' });
  }

  const filteredAppointments = appointments.filter(
    (appt) => appt.apptDate === date && appt.apptDoctor === doctorEmail
  );

  res.json(filteredAppointments);
};

const mongoose = require('mongoose');

const cancelAppointment = async (req, res) => {
  const { apptID } = req.body;
  console.log("jhi")
  console.log(apptID);

  try {
    const appointment = await Appointment.findOneAndUpdate(
      { apptID: apptID }, 
      { $set: { apptStatus: "Cancelled" } }, 
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment cancelled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


const getPositionInQueue = async (req, res) => {
  try {
    const { appointmentId } = req.query;

    if (!appointmentId) {
      return res.status(400).json({ message: "Appointment ID is required" });
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const appointmentsOnSameDay = await Appointment.find({
      apptDate: appointment.apptDate,
      apptStatus: 'Pending'
    }).sort({ apptDate: 1, apptTime: 1 });

    const position = appointmentsOnSameDay.findIndex(appt => appt._id.toString() === appointmentId) + 1;

    res.status(200).json({ position });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'app.medihub@gmail.com', 
    to: to,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const updateappointment = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { apptStatus: status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const subject = `Appointment ${status}`;
    const text = `Dear Patient,

Your appointment with Dr. ${appointment.apptDoctor} has been ${status.toLowerCase()}.

Appointment Details:
- Date: ${new Date(appointment.apptDate).toLocaleDateString()}
- Time: ${appointment.apptTime}
- Reason: ${appointment.apptReason}

Regards,
MediHub Team`;

    await sendEmail(appointment.apptPatient, subject, text);

    res.json(appointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const AppointmentController = {
  postAppointments,
  getAppointments,
  getappointmentsbyemail,
  countAppointments,
  postDoctorAppointment,
  getAppointmentsByDate,
  cancelAppointment,
  getPositionInQueue,
  getAppointmentsByDateAndDoctor,
  updateappointment
};

module.exports = AppointmentController;
