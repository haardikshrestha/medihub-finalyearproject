const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/userSchema");
const Doctors = require("./models/doctorschema");
const Patient = require("./models/patientSchema");
const Ward = require("./models/wardSchema");
const Pathologist = require("./models/pathologistSchema");
const Department = require("./models/departmentSchema");
const Appointment = require("./models/appointmentsSchema");
const Surgery = require("./models/surgerySchema");
const PasswordResetToken = require("./models/resettoken");
const LabTest = require("./models/labtestSchema");


const app = express();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const dotenv = require("dotenv");
const multer = require("multer");
const { isErrored } = require("nodemailer/lib/xoauth2");
const { appendFile } = require("fs/promises");
const upload = multer({ dest: "uploads/" });
dotenv.config();

const dbURI = process.env.MONGODB_URI;
const SECRET_KEY = process.env.JWT_SECRET;
const saltRounds = 10;

{
  /* Connect to mongodb */
}
mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(5173, () => {
      console.log("Server is connected to port and connected to MongoDB!");
    });
  })
  .catch((error) => {
    console.log("Unable to connect!", error);
  });

app.use(bodyParser.json());
app.use(cors());

console.log("Adding admin....")
const checkAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      console.log("Admin already exists");
      return;
    } else {
      const adminHashedPassword = await bcrypt.hash("Admin#123", 10);
      const newUser = new User({
        email: "admin@admin.com",
        number: "9876543212",
        password: adminHashedPassword,
        verified: true,
        otp: "abcded",
        otpExpiresAt: "2024-01-07T02:51:36.395+00:00",
        role: "admin",
      });

      const created = await newUser.save();
      console.log("ADMIN CREATED!");
    }
  } catch (error) {
    console.log(error);
  }
};


checkAdmin();

{
  /* Send email */
}
const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

module.exports = transporter;

const generateOTP = () =>
  otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePassword(inputPassword, storedHash) {
  const isPasswordValid = await bcrypt.compare(inputPassword, storedHash);
  return isPasswordValid;
}


//SIGN UP - POST
app.post("/postregister", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address!" });
  }

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "Password should be 8 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
    });
  }

  // Validate password
  if (!passwordRegex.test(password)) {
    return res
      .status(400)
      .json({
        error:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      });
  }

  // Validate email
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpExpiresAt = Date.now() + 15 * 60 * 1000;

  // Create a new user
  const newUser = new User({
    email,
    password: hashedPassword,
    otp,
    otpExpiresAt
  });

  try {
    // Save the new user to the database
    await newUser.save();

    // Send OTP to user's email
    const mailOptions = {
      from: "your-email@gmail.com", // Replace with your email address
      to: email,
      subject: "OTP for Registration",
      text: `Your OTP for registration is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch users with role "user"
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch users with role "doctor"
app.get("/doctors", async (req, res) => {
  try {
    const users = await User.find({ role: "doctor" }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch users with role "pathologist"
app.get("/pathologists", async (req, res) => {
  try {
    const users = await User.find({ role: "pathologist" }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//LOGIN - POST
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, role: user.role });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//resent code
app.post("/resend-code", async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    // Generate a new OTP
    const newOtp = generateOTP();
    const otpExpiresAt = Date.now() + 15 * 60 * 1000;

    // Update the user with the new OTP
    user.otp = newOtp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    // Send the new OTP to the user's email
    const mailer = {
      from: process.env.USER,
      to: email,
      subject: "New OTP Verification",
      text: `Your new OTP for verification is: ${newOtp}`,
    };

    await transporter.sendMail(mailer);

    res.status(200).json({ message: "New OTP sent successfully." });
  } catch (error) {
    console.error("Resend Code Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

{
  /* VERIFY OTP POST */
}
app.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user.otp && user.otpExpiresAt > Date.now()) {
      if (user.otp === otp) {
        user.verified = true;
        await user.save();
        return res.status(200).json({ message: "OTP verified successfully." });
      } else {
        return res.status(400).json({ error: "Invalid OTP." });
      }
    } else {
      return res
        .status(400)
        .json({ error: "OTP has expired. Request a new one." });
    }
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

{
  /* Reset Link */
}
app.post("/reset-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    const expiresAt = new Date(Date.now() + 3600000);

    // Save the token in the database
    await PasswordResetToken.create({
      email,
      token: resetToken,
      expiresAt,
    });

    // Send an email with a link containing the reset token
    const resetLink = `${process.env.CLIENT_URL}/reset?token=${resetToken}`;
    const mailer = {
      from: process.env.USER,
      to: email,
      subject: "Password Reset",
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailer);

    res
      .status(200)
      .json({ message: "Password reset link sent to your email." });
  } catch (error) {
    console.error("Password Reset Error:", error);
    res
      .status(500)
      .json({ error: "Error initiating password reset. Please try again." });
  }
});

{
  /* Updating new password */
}
app.post("/update-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find the corresponding reset token in the database
    const resetTokenData = await PasswordResetToken.findOne({ token });

    if (!resetTokenData || resetTokenData.expiresAt < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired reset token." });
    }

    // Find the user associated with the reset token
    const user = await User.findOne({ email: resetTokenData.email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        error:
          "Password should be 8 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      });
    }

    // Update the user's password
    user.password = await hashPassword(newPassword);
    await user.save();

    // Delete the reset token from the database
    await PasswordResetToken.deleteOne({ token });

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res
      .status(500)
      .json({ error: "Error updating password. Please try again." });
  }
});

//get wards
app.get("/wards", async (req, res) => {
  try {
    const wards = await Ward.find();
    res.json(wards);
  } catch (error) {
    console.error("Error fetching wards:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//add ward - working
app.post('/newward', async (req, res) => {
  try {
    const { wardId } = req.body;

    const existingWard = await Ward.findOne({ wardId });
    if (existingWard) {
      return res.status(400).json({ message: 'Ward ID already exists' });
    }

    const newWard = new Ward({
      wardId
    });

    const savedWard = await newWard.save();

    res.status(201).json(savedWard);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//delete ward - working
app.post('/deleteward', async (req, res) => {
  try {
    const { wardId } = req.body;

    const deletedWard = await Ward.findOneAndDelete({ wardId });

    if (!deletedWard) {
      return res.status(404).json({ message: 'Ward not found' });
    }

    res.status(200).json({ message: 'Ward deleted successfully', deletedWard });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});



// Fetch users with role "doctors"
app.get("/getdoctors", async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password");
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get pathologists
app.get("/getpathologists", async (req, res) => {
  try {
    const pathologists = await User.find({ role: "pathologist" }).select(
      "-password"
    );
    res.status(200).json(pathologists);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get departments
app.get("/getdepartments", async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ error: "Internal Server departments" });
  }
});

//check if patient exists
app.post("/checkpatient", async (req, res) => {
  try {
    const { email } = req.body;
    const patient = await Patient.findOne({ email });
    const emailExists = patient !== null;

    res.json({ emailExists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get gender of patient
app.get("/getgender", async (req, res) => {
  try {
    // Query the database to get gender distribution
    const maleCount = await Patient.countDocuments({ gender: "Male" });
    const femaleCount = await Patient.countDocuments({ gender: "Female" });
    const otherCount = await Patient.countDocuments({
      gender: { $nin: ["Male", "Female"] },
    });

    // Send the data as JSON
    res.json({ male: maleCount, female: femaleCount, other: otherCount });
  } catch (error) {
    console.error("Error fetching gender distribution:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to save doctor details
// Route to get all doctors
app.get("/api/doctors", async (req, res) => {
  try {
    const allDoctors = await Doctor.find();
    res.status(200).json(allDoctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post('/newdoctor', async (req, res) => {
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
    // Check if the email already exists in the users collection
    let existingUser = await User.findOne({ email: emailaddress });

    // If the user doesn't exist, create a new user
    if (!existingUser) {
      // Create a new user instance
      existingUser = new User({
        email: emailaddress,
        password: password, // Note: Password should be hashed before saving, for production use
        role: 'doctor', // Set the user's role to 'doctor'
      });

      // Save the new user to the database
      await existingUser.save();
    }

    // Create a new doctor instance
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

    // Save the new doctor to the database
    await newDoctor.save();

    res.status(201).json({ message: 'Doctor information saved successfully' });
  } catch (error) {
    console.error('Error saving doctor information:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/addDepartment", async (req, res) => {
  try {
    const { depID, depName } = req.body; // Assuming these values come from the request body

    const existingDepartment = await Department.findOne({ depID });

    if (existingDepartment) {
      return res.status(400).json({ error: "Department already exists." });
    }

    const newDepartment = new Department({
      depID,
      depName,
      // ... other fields ...
    });

    await newDepartment.save();

    res.status(201).json({ message: "Department added successfully." });
  } catch (error) {
    console.error("Error adding department:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.use(express.urlencoded({ extended: false }));


{
  /* --- APPOINTMENT --- */
}

app.post("/appointments", async (req, res) => {
  try {
    // Create a new appointment instance based on the request body
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

    // Save the appointment to the database
    const savedAppointment = await newAppointment.save();

    res.status(201).json(savedAppointment); // Return the saved appointment as JSON
  } catch (err) {
    res.status(400).json({ message: err.message }); // Return an error message if something goes wrong
  }
});

app.get("/getappointments", async (req, res) => {
  try {
    // Fetch all appointments from the database
    const appointments = await Appointment.find();

    res.status(200).json(appointments); // Return the appointments as JSON
  } catch (err) {
    res.status(500).json({ message: err.message }); // Return an error message if something goes wrong
  }
});

app.get("/appointments/count", async (req, res) => {
  try {
    // Count all appointments in the database
    const appointmentCount = await Appointment.countDocuments();

    res.status(200).json({ count: appointmentCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/doctors/findexpertise", async (req, res) => {
  try {
    const { expertise } = req.body;

    const doctors = await Doctors.find({ expertise });

    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/patientsinfo", async (req, res) => {
  try {
    // Extract patient information from the request body
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

    // Create a new patient instance
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

    // Save the patient information to the database
    await newPatient.save();

    res.status(201).json({ message: "Patient information saved successfully" });
  } catch (error) {
    console.error("Error saving patient information:", error);
    res
      .status(500)
      .json({
        message: "An unexpected error occurred. Please try again later.",
      });
  }
});

app.get("/numberOfData", async (req, res) => {
  try {
    const totalDoctors = await Doctors.countDocuments();
    const totalPatients = await Patient.countDocuments();
    const totalPathologists = await Pathologist.countDocuments();
    const totalDepartments = await Department.countDocuments();
    const totalWards = await Ward.countDocuments();
    const totalAppointments = await Appointment.countDocuments();

    const dataCounts = {
      doctors: totalDoctors,
      patients: totalPatients,
      pathologists: totalPathologists,
      departments: totalDepartments,
      wards: totalWards,
      appointments: totalAppointments,
    };

    res.status(200).json(dataCounts);
  } catch (error) {
    console.error("Error in counting:", error);
    res
      .status(500)
      .json({ error: "Error in counting", details: error.message });
  }
});

app.get("/getDepartments", async (req, res) => {
  try {
    const departmentNames = await Department.distinct("depName");
    res.status(200).json(departmentNames);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/getpatients", async (req, res) => {
  try {
    const patients = await Patient.find();

    res.status(200).json(patients);
  } catch (err) {
    console.error("Error fetching patients:", err);
    res
      .status(500)
      .json({
        message: "An unexpected error occurred. Please try again later.",
      });
  }
});

app.get("/doctor/viewpatients", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.json(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// Function to send email
async function sendEmail(email, password) {
  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Your Name" <your-email@example.com>',
      to: email,
      subject: 'Your Account Details',
      text: `Your account password is: ${password}`,
      // You can also include HTML content in the email
      // html: `<p>Your account password is: <strong>${password}</strong></p>`
    });

    console.log('Email sent: %s', info.messageId);
  } catch (error) {
    // Handle email sending errors
    console.error('Error sending email:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
}



app.post('/surgeries', async (req, res) => {
  try {
    const newSurgery = new Surgery(req.body);
    await newSurgery.save();
    res.status(201).send({ message: 'Surgery information saved successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).send(error);
  }
});

app.get('/getsurgeries', async (req, res) => {
  try {
    const surgeries = await Surgery.find();
    res.status(200).json(surgeries);
  } catch (error) {
    console.error('Error retrieving surgeries:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//add patient infro through from -> /in
app.post('/patients/addInfo', async (req, res) => {
  try {
    const { email, firstName, lastName, gender, dateofbirth, chronicillness, address, bloodgroup } = req.body;

    // Create a new instance of the Patient model
    const newPatient = new Patient({
      email,
      firstName,
      lastName,
      gender,
      dateofbirth,
      chronicillness: chronicillness || 'None', // Default value if not provided
      address,
      bloodgroup,
    });

    // Save the new patient to the database
    const savedPatient = await newPatient.save();

    res.status(201).json(savedPatient); // Respond with the saved patient data
  } catch (error) {
    console.error('Error adding patient:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//delete patient through email
app.post('/patients/delete', async (req, res) => {
  const { email } = req.body;

  try {
    const deletedPatient = await Patient.findOneAndDelete({ email });

    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    return res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    return res.status(500).json({ message: "Error deleting patient", error: error.message });
  }
});

app.get('/patients/genderCount', async (req, res) => {
  try {
    const genderCounts = await Patient.aggregate([
      { $group: { _id: '$gender', count: { $sum: 1 } } },
      {
        $group: {
          _id: null,
          male: { $sum: { $cond: [{ $eq: ["$_id", "male"] }, "$count", 0] } },
          female: { $sum: { $cond: [{ $eq: ["$_id", "female"] }, "$count", 0] } },
          other: { $sum: { $cond: [{ $eq: ["$_id", "other"] }, "$count", 0] } },
          total: { $sum: "$count" }
        }
      }
    ]);

    const result = genderCounts.length > 0 ? genderCounts[0] : { male: 0, female: 0, other: 0, total: 0 };

    res.json(result);
  } catch (err) {
    console.error('Error finding gender counts:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post("/labtests", async (req, res) => {
  try {
    const newLabTest = new LabTest({
      testName: req.body.testName,
      testDetails: req.body.testDetails 
    });
    const savedLabTest = await newLabTest.save();

    res.status(201).json(savedLabTest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/add/appointments', async (req, res) => {
  try {
      const newAppointment = new Appointment(req.body);
      await newAppointment.save();
      res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
  } catch (error) {
      res.status(400).json({ error: 'Failed to create appointment', message: error.message });
  }
});

// GET route to retrieve appointments for a specific doctor
app.get('/appointments/getdoctor', async (req, res) => {
  const doctorName = "Dr. Jane Smith";
  const appointmentDate = "2024-03-23"; 
  const appointmentDate1 = "2024-03-22";
  try {
      const appointments = await Appointment.find({ apptDoctor: doctorName, apptDate: appointmentDate });
      const appointments1 = await Appointment.find({ apptDoctor: doctorName, apptDate: appointmentDate1 });
      const appointmentCount = appointments.length;
      const appointmentCount1 = 9;
      const difference = appointmentCount - appointmentCount1;
      const percentage = (difference / appointmentCount) * 100;
      res.status(200).json({ appointments, appointmentCount,  appointmentCount1, percentage});
  } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve appointments', message: error.message });
  }
});

// ---------------------------------- ADMIN -------------------------------------------------------------

// ---------------------------------- PATIENTS -------------------------------------------------------------
app.post("/patientsinfo", async (req, res) => {
  try {
    
    const {
      email,
      firstName,
      lastName,
      gender,
      dateofbirth,
      chronicillness,
      address,
      bloodgroup
    } = req.body;

    const newPatient = new Patient({
      email,
      firstName,
      lastName,
      gender,
      dateofbirth,
      chronicillness,
      address,
      bloodgroup
    });
    await newPatient.save();
    res.status(201).send("Patient registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to register patient");
  }
});

// ---------------------------------- DOCTORS -------------------------------------------------------------
app.post("/newdoctor", async (req, res) => {
  try {
    // Extract data from request body
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
      password
    } = req.body;

    // Create a new doctor instance
    const newDoctor = new Doctor({
      fullname,
      email: emailaddress, // Assuming 'emailaddress' is the field name for email
      nmc,
      role: 'doctor', // Assuming 'role' is always 'doctor'
      expertise,
      degree,
      school,
      startTime,
      endTime,
      daysAvailable,
      fees,
      verified: false, // Assuming newly registered doctors are not verified by default
    });

    // Save the doctor to the database
    await newDoctor.save();

    // Respond with success status
    res.status(201).send("Doctor information registered successfully");
  } catch (error) {
    // Handle errors
    console.error("Error registering doctor information:", error);
    res.status(500).send("Failed to register doctor information");
  }
});

