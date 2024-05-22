const express = require("express");
const Patient = require("../models/patient-models/patientSchema");
const User = require("../models/userSchema");
const app = express();
app.use(express.json());
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const generatePatientId = async () => {
  let patientId;
  let isUnique = false;

  while (!isUnique) {
    const randomNumber = Math.floor(Math.random() * 10000);
    patientId = `PAT${String(randomNumber).padStart(4, "0")}`;

    const existingPatient = await Patient.findOne({ patientId });
    if (!existingPatient) {
      isUnique = true;
    }
  }

  return patientId;
};

const patientsInfo = async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      gender,
      dateofbirth,
      chronicillness,
      address,
      bloodgroup,
    } = req.body;

    const birthDate = new Date(dateofbirth);
    const ageDiffMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiffMs);
    const userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (userAge < 18) {
      return res
        .status(400)
        .json({ error: "User must be at least 18 years old." });
    }
    

    const patientId = await generatePatientId();

    console.log(patientId)

    const newPatient = new Patient({
      patientId,
      email,
      firstName,
      lastName,
      gender,
      dateofbirth,
      chronicillness,
      address,
      bloodgroup,
    });
    await newPatient.save();

    const mailOptions = {
      from: "app.medihub@gmail.com",
      to: email,
      subject: "Patient Information",
      html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
      
                body {
                  font-family: 'Poppins', sans-serif;
                  background-color: #f7f7f7;
                  margin: 0;
                  padding: 0;
                }
      
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 30px;
                  border-radius: 10px;
                  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                }
      
                h1 {
                  color: #333333;
                  text-align: center;
                  margin-bottom: 30px;
                }
      
                p {
                  color: #555555;
                  line-height: 1.6;
                  margin-bottom: 20px;
                }
      
                .patient-info {
                  background-color: #f9f9f9;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
      
                .patient-info p {
                  margin-bottom: 10px;
                }
      
                .patient-info p:last-child {
                  margin-bottom: 0;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Patient Information</h1>
                <p>Hello ${firstName},</p>
                <p>Here is your patient information:</p>
                <div class="patient-info">
                <p><strong>Patient ID:</strong> ${patientId}</p>
                  <p><strong>First Name:</strong> ${firstName}</p>
                  <p><strong>Last Name:</strong> ${lastName}</p>
                  <p><strong>Gender:</strong> ${gender}</p>
                  <p><strong>Date of Birth:</strong> ${dateofbirth}</p>
                  <p><strong>Chronic Illness:</strong> ${chronicillness}</p>
                  <p><strong>Address:</strong> ${address}</p>
                  <p><strong>Blood Group:</strong> ${bloodgroup}</p>
                </div>
              </div>
            </body>
          </html>
        `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "Patient information saved successfully and email sent",
    });
  } catch (error) {
    console.error("Error saving patient information:", error);
    res.status(500).json(error);
  }
};

const checkPatient = async (req, res) => {
  try {
    const { email } = req.body;
    const patient = await Patient.findOne({ email });
    const emailExists = patient !== null;

    res.json({ emailExists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPatientbyEmail = async (req, res) => {
  try {
    const patient = await Patient.findOne({ email: req.params.email });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.error("Error fetching patient details:", error);
    res.status(500).json(error);
  }
};

const getPatients = async (req, res) => {
  try {
    const users = await Patient.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json(error);
  }
};

const deletePatientByEmail = async (req, res) => {
  const session = await Patient.startSession();
  session.startTransaction();
  try {
    const { email } = req.params;

    const deletedPatient = await Patient.findOneAndDelete({ email }).session(session);

    if (!deletedPatient) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Patient not found" });
    }

    await User.findOneAndDelete({ email }).session(session);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error deleting patient:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatePatientByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const updatedPatient = req.body;
    const existingPatient = await Patient.findOne({ email });

    if (!existingPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    await Patient.updateOne({ email }, updatedPatient);

    res.status(200).json({ message: "Patient updated successfully" });
  } catch (error) {
    console.error("Error updating patient:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const PatientController = {
  patientsInfo,
  checkPatient,
  getPatientbyEmail,
  getPatients,
  deletePatientByEmail,
  updatePatientByEmail, 
};


module.exports = PatientController;
