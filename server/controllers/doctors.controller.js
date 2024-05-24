const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const Doctors = require("../models/doctor-models/doctorschema");
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
const dotenv = require("dotenv");
dotenv.config();


const getDoctorUsers = async (req, res) => {
  try {
    const users = await Doctors.find()
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json(error);
  }
};

const doctorReset = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 is the saltRounds

    // Update the user's password in the database
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: "Your new password",
      text: `Dear User,
  
  Your password has been reset successfully. Here is your new password:
  
  Password: ${newPassword}
  
  Please change your password after logging in for security reasons.
  
  Regards,
  Your Application Team`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message:
        "Password reset successfully. Check your email for the new password.",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json(error);
  }
};

const getDoctorbyExpertise = async (req, res) => {
  const { expertise } = req.params;
  try {
    const doctors = await Doctors.find({ expertise });

    if (!doctors || doctors.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No doctors found with the specified expertise.",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctors fetched successfully.",
      data: doctors,
    });
  } catch (error) {
    console.error("Error fetching doctors by expertise:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching doctors.",
      data: null,
    });
  }
};

const getDoctorbyEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const doctor = await Doctors.findOne({ email });

    if (!doctor) {
      return res
        .status(404)
        .json({ message: "Doctor not found with the specified email." });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error fetching doctor by email:", error);
    res.status(500).json(error);
  }
};

const deleteDoctor = async (req, res) => {
  const { email } = req.query;
  try {
    const doctor = await Doctors.findOne({ email });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    await Doctors.deleteOne({ email });

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const generateDoctorId = async () => {
  let doctorId;
  let isUnique = false;

  while (!isUnique) {
    const randomNumber = Math.floor(Math.random() * 10000);
    doctorId = `DOC${String(randomNumber).padStart(4, "0")}`;

    const existingDoctor = await Doctors.findOne({ doctorId });
    if (!existingDoctor) {
      isUnique = true;
    }
  }

  return doctorId;
};

const newDoctor = async (req, res) => {
  const {
    fullname,
    emailaddress,
    phonenumber,
    expertise,
    degree,
    school,
    nmc,
    startTime,
    endTime,
    daysAvailable,
    fees,
    password,
  } = req.body;

  const doctorId = await generateDoctorId();

  try {
    let existingUser = await User.findOne({ email: emailaddress });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser = new User({
        email: emailaddress,
        password: hashedPassword,
        role: "doctor",
      });
      await existingUser.save();
    }

    const newDoctor = new Doctors({
      doctorId,
      fullname,
      nmc,
      email: emailaddress,
      expertise,
      phonenumber,
      degree,
      school,
      startTime,
      endTime,
      daysAvailable,
      fees,
    });

    await newDoctor.save();

    const emailTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Doctor Credentials</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8f9fa;
            color: #333;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #007bff;
            text-align: center;
            margin-bottom: 30px;
          }
          h2 {
            color: #6c757d;
            margin-bottom: 15px;
          }
          p {
            line-height: 1.6;
            margin-bottom: 20px;
          }
          ul {
            list-style-type: none;
            padding: 0;
            margin-bottom: 30px;
          }
          li {
            margin-bottom: 10px;
            padding-left: 25px;
            position: relative;
          }
          li::before {
            content: "\\2022";
            color: #007bff;
            font-weight: bold;
            position: absolute;
            left: 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Doctor Credentials</h1>
          <h2>Personal Information</h2>
          <p>Full Name: ${fullname}</p>
          <p>Email Address: ${emailaddress}</p>
          <p>Phone Number: ${phonenumber}</p>

          <h2>Professional Qualifications</h2>
          <ul>
            <li>Expertise: ${expertise}</li>
            <li>Degree: ${degree}</li>
            <li>School: ${school}</li>
            <li>NMC Registration Number: ${nmc}</li>
          </ul>

          <h2>Availability</h2>
          <p>Start Time: ${startTime}</p>
          <p>End Time: ${endTime}</p>
          <p>Days Available: ${daysAvailable}</p>
          <p>Fees: ${fees}</p>

          <h2>Login Credentials</h2>
          <p>Email: ${emailaddress}</p>
          <p>Password: ${password}</p>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: 'your-email@example.com', // replace with your email address
      to: emailaddress,
      subject: 'Doctor Registration Details',
      html: emailTemplate,
    });

    res.status(201).json({ message: "Doctor information saved successfully" });
  } catch (error) {
    console.error("Error saving doctor information:", error);
    res.status(500).json(error);
  }
};



const DoctorController = {
  getDoctorUsers,
  doctorReset,
  getDoctorbyExpertise,
  getDoctorbyEmail,
  deleteDoctor,
  newDoctor,
};

module.exports = DoctorController;
