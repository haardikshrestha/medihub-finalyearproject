const express = require("express");
const Patient = require("../models/patient-models/patientSchema");
const app = express();
app.use(express.json());
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

    // Calculate age based on date of birth
    const birthDate = new Date(dateofbirth);
    const ageDiffMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiffMs); // miliseconds from epoch
    const userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

    // Check if user is at least 18 years old
    if (userAge < 18) {
      return res
        .status(400)
        .json({ error: "User must be at least 18 years old." });
    }

    // Save patient information to the database
    const newPatient = new Patient({
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

const PatientController = {
  patientsInfo,
  checkPatient,
  getPatientbyEmail,
};

module.exports = PatientController;
