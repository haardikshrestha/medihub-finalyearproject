const express = require("express");
const User = require("../models/userSchema");
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

const getPathologist =  async (req, res) => {
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

const PathologistController = {
  getPathologistUser,
  getPathologist
};

module.exports = PathologistController;
