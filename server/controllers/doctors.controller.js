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
    const users = await User.find({ role: "doctor" }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
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

  try {
    let existingUser = await User.findOne({ email: emailaddress });

    if (!existingUser) {
      existingUser = new User({
        email: emailaddress,
        password: password, 
        role: "doctor", 
      });

      await existingUser.save();
    }

    const newDoctor = new Doctor({
      nmc,
      email: emailaddress,
      expertise,
      degree,
      school,
      startTime,
      endTime,
      daysAvailable,
      fees,
    });

    await newDoctor.save();

    res.status(201).json({ message: "Doctor information saved successfully" });
  } catch (error) {
    console.error("Error saving doctor information:", error);
    res.status(500).json({ error: "Internal server error" });
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
