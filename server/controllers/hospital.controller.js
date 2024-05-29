const express = require("express");
const Ward = require("../models/hospital-models/wardSchema");
const Department = require("../models/hospital-models/departmentSchema");
const Surgery = require("../models/doctor-models/surgerySchema");
const app = express();
app.use(express.json());

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const getWards = async (req, res) => {
  try {
    const wards = await Ward.find();
    res.json(wards);
  } catch (error) {
    console.error("Error fetching wards:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const newWard = async (req, res) => {
  try {
    const { wardId, numberOfBeds, bedIds } = req.body;
    const existingWard = await Ward.findOne({ wardId });

    if (existingWard) {
      return res.status(400).json({ message: "Ward ID already exists" });
    }

    const newWard = new Ward({ wardId, numberOfBeds, bedIds });
    const savedWard = await newWard.save();
    res.status(201).json(savedWard);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const deleteWard = async (req, res) => {
  try {
    console.log("Let's find the ward to delete...");
    const { wardId } = req.body;

    console.log("Received wardId:", wardId);

    const deletedWard = await Ward.findOneAndDelete({ wardId });

    if (!deletedWard) {
      console.log("Ward not found.");
      return res.status(404).json({ message: "Ward not found" });
    }

    console.log("Ward deleted successfully.");
    res.status(200).json({ message: "Ward deleted successfully", deletedWard });
  } catch (error) {
    console.error("Error deleting ward:", error);
    res.status(500).json(error);
  }
};


const getallDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ error: "Internal Server departments" });
  }
};

const getdepartmentnames = async (req, res) => {
  try {
    const departments = await Department.find();

    const departmentNames = departments.map((department) => department.depName);

    res.json(departmentNames);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json(error);
  }
};

const addDepartment = async (req, res) => {
  try {
    const { depID, depName, depNameShort } = req.body;

    if (!depID || !depName || !depNameShort) {
      return res
        .status(400)
        .json({ error: "Please provide department ID, name, and short name." });
    }

    const existingDepartmentID = await Department.findOne({ depID });
    if (existingDepartmentID) {
      return res
        .status(400)
        .json({ error: "Department ID is already in use." });
    }

    const existingDepartmentName = await Department.findOne({ depName });
    if (existingDepartmentName) {
      return res
        .status(400)
        .json({ error: "Department name is already in use." });
    }

    const existingDepartmentShortName = await Department.findOne({
      depNameShort,
    });
    if (existingDepartmentShortName) {
      return res
        .status(400)
        .json({ error: "Department short name is already in use." });
    }

    const capitalizedShortName = depNameShort.toUpperCase();

    const newDepartment = new Department({
      depID,
      depName,
      depNameShort: capitalizedShortName,
    });

    await newDepartment.save();

    res.status(201).json({ message: "Department added successfully." });
  } catch (error) {
    console.error("Error adding department:", error);
    res.status(500).json(error);
  }
};

const getdisDepartment = async (req, res) => {
  try {
    const departmentNames = await Department.distinct("depName");
    res.status(200).json(departmentNames);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const sendEmail = (patientEmail, surgeryDate, doctorEmail) => {
  const mailOptions = {
    from: 'app.medihubl@example.com',
    to: patientEmail,
    subject: 'MediHub: Surgery Scheduled',
    text: `Dear Patient,

Your surgery has been scheduled as follows:
Date: ${new Date(surgeryDate).toLocaleDateString()}
Doctor: ${doctorEmail}

Please contact us if you have any questions.

Best regards,
MediHub Team`
  };

  return transporter.sendMail(mailOptions);
};

const addSurgery = async (req, res) => {
  try {
    const newSurgery = new Surgery(req.body);
    await newSurgery.save();

    await sendEmail(newSurgery.patientEmail, newSurgery.surgeryDate, newSurgery.doctorEmail);

    res.status(201).send({ message: "Surgery information saved and email sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to save surgery information or send email.' });
  }
};

const addNote = async (req, res) => {
  const { id } = req.params;
  const { note } = req.body;

  try {
    const surgery = await Surgery.findById(id);
    if (!surgery) {
      return res.status(404).json({ message: "Surgery not found" });
    }

    // Check if notes field is an array
    if (!Array.isArray(surgery.notes)) {
      surgery.notes = [];
    }

    surgery.notes.push(note);
    await surgery.save();
    res.status(200).json({ notes: surgery.notes });
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSurgery = async (req, res) => {
  try {
    const surgeries = await Surgery.find();
    res.status(200).json(surgeries);
  } catch (error) {
    console.error("Error retrieving surgeries:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const editDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { depID, depName, depNameShort } = req.body;

    const existingDepartment = await Department.findById(id);
    if (!existingDepartment) {
      return res.status(404).json({ error: "Department not found" });
    }

    existingDepartment.depID = depID;
    existingDepartment.depName = depName;
    existingDepartment.depNameShort = depNameShort;

    await existingDepartment.save();

    res.status(200).json({ message: "Department updated successfully" });
  } catch (error) {
    console.error("Error editing department:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const existingDepartment = await Department.findById(id);
    if (!existingDepartment) {
      return res.status(404).json({ error: "Department not found" });
    }

    await Department.deleteOne({ _id: id });

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    console.error("Error deleting department:", error);
    res.status(500).json(error);
  }
};


const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    console.error("Error fetching department:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const HospitalController = {
  getWards,
  newWard,
  deleteWard,
  getallDepartments,
  getdepartmentnames,
  addDepartment,
  getdisDepartment,
  addSurgery,
  getSurgery,
  editDepartment,
  deleteDepartment,
  getDepartmentById,
  addNote
};

module.exports = HospitalController;
