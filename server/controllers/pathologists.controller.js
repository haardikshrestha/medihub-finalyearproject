const express = require("express");
const User = require("../models/userSchema");
const Pathologist = require("../models/pathology-models/pathologistSchema");
const LabReport = require("../models/pathology-models/labReportSchema");

const app = express();
app.use(express.json());
const getPathologistUser = async (req, res) => {
  try {
    const users = await User.find({ role: "pathologist" }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPathologist = async (req, res) => {
  try {
    const pathologists = await User.find({ role: "pathologist" }).select(
      "-password"
    );
    res.status(200).json(pathologists);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPathologistByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const pathologist = await Pathologist.findOne({ email }).select(
      "-password"
    );
    if (!pathologist) {
      return res.status(404).json({ error: "Pathologist not found" });
    }
    res.status(200).json(pathologist);
  } catch (error) {
    console.error("Error fetching pathologist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatePathologistByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const { number, ...rest } = req.body;

    // Validate phone number
    if (number && !/^\d{10}$/.test(number)) {
      return res
        .status(400)
        .json({ message: "Phone number must be exactly 10 digits." });
    }

    const updatedData = { number, ...rest };

    const updatedPathologist = await Pathologist.findOneAndUpdate(
      { email },
      updatedData,
      { new: true }
    ).select("-password");

    if (!updatedPathologist) {
      return res.status(404).json({ message: "Pathologist not found" });
    }

    res.status(200).json({ pathologist: updatedPathologist });
  } catch (error) {
    console.error("Error updating pathologist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getlabreports = async (req, res) => {
  try {
    const labReports = await LabReport.find();
    if (labReports.length === 0) {
      return res.status(404).json({ message: "Lab reports not found." });
    }

    res.json(labReports);
  } catch (error) {
    console.error("Error fetching lab reports:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const PathologistController = {
  getPathologistUser,
  getPathologist,
  getPathologistByEmail,
  updatePathologistByEmail,
  getlabreports,
};

module.exports = PathologistController;
