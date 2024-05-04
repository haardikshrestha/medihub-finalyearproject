const express = require("express");
const Ward = require("../models/hospital-models/wardSchema");
const Department = require("../models/hospital-models/departmentSchema");
const Surgery = require("../models/doctor-models/surgerySchema");
const app = express();
app.use(express.json());

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
    const { wardId } = req.body;

    const existingWard = await Ward.findOne({ wardId });
    if (existingWard) {
      return res.status(400).json({ message: "Ward ID already exists" });
    }

    const newWard = new Ward({
      wardId,
    });

    const savedWard = await newWard.save();

    res.status(201).json(savedWard);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const deleteWard = async (req, res) => {
  try {
    const { wardId } = req.body;

    const deletedWard = await Ward.findOneAndDelete({ wardId });

    if (!deletedWard) {
      return res.status(404).json({ message: "Ward not found" });
    }

    res.status(200).json({ message: "Ward deleted successfully", deletedWard });
  } catch (error) {
    console.error(error);
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
    res.status(500).json({ error: "Internal server error." });
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

const addSurgery = async (req, res) => {
  try {
    const newSurgery = new Surgery(req.body);
    await newSurgery.save();
    res
      .status(201)
      .send({ message: "Surgery information saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).send(error);
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

const HospitalController = {
  getWards,
  newWard,
  deleteWard,
  getallDepartments,
  getdepartmentnames,
  addDepartment,
  getdisDepartment,
  addSurgery,
  getSurgery
};

module.exports = HospitalController;
