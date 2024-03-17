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
const PasswordResetToken = require("./models/resettoken");
const app = express();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const dotenv = require("dotenv");
const multer = require("multer");
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

const checkAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      console.log("Admin already exists");
      return;
    }
    if (!adminExists) {
      const adminHashedPassword = await bcrypt.hash("Admin#123", 10);
      const newUser = new User({
        email: "admin@admin.com",
        username: "admin",
        number: "9876543212",
        password: adminHashedPassword,
        verified: true,
        otp: "abcded",
        otpExpiresAt: "2024-01-07T02:51:36.395+00:00",
        role: "admin",
      });

      const created = await newUser.save();
      console.log("Admin created!!!!!!");
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

{
  /* REGISTER POST */
}
// app.post("/register", async (req, res) => {
//   try {
//     const { email, username, number, password } = req.body;

//     //email validation
//     const existingEmail = await User.findOne({ email });
//     if (existingEmail) {
//       console.log("hi");
//       return res.status(400).json({ error: "Email is already taken!" });
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ error: "Invalid email address!" });
//     }

//     //numbervalidation
//     const phoneNumberRegex = /^\d{10}$/;
//     if (!phoneNumberRegex.test(number)) {
//       return res.status(400).json({
//         error: "Invalid phone number! It should be 10 digits and all numbers.",
//       });
//     }

//     //username validation
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ error: "Username is already taken!" });
//     }

//     // Username validation: No white spaces allowed
//     const usernameRegex = /^\S*$/;
//     if (!usernameRegex.test(username)) {
//       return res
//         .status(400)
//         .json({ error: "Username should not contain white spaces." });
//     }

//     // Password validation
//     const passwordRegex =
//       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
//     if (!passwordRegex.test(password)) {
//       return res.status(400).json({
//         error:
//           "Password should be 8 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
//       });
//     }

//     const otp = generateOTP();
//     const otpExpiresAt = Date.now() + 15 * 60 * 1000;
//     console.log(otp);

//     const hashedPassword = await hashPassword(password); // Hash the password using bcrypt
//     const newUser = new User({
//       email,
//       username,
//       number,
//       password: hashedPassword,
//       otp,
//       otpExpiresAt,
//     });
//     await newUser.save();

//     const mailer = {
//       from: process.env.USER,
//       to: email,
//       subject: "OTP Verification",
//       text: `Your OTP for verification is: ${otp}`,
//     };

//     try {
//       await transporter.sendMail(mailer);
//       console.log("mailed!!");
//       res.status(201).json({ message: "Please check your email for OTP pin." });
//     } catch (error) {
//       console.error("Error sending email:", error);
//       res.status(500).json({ error: "Error sending verification email." });
//     }
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

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
  /* REGISTER GET */
}
// app.get("/register", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(201).json(users);
//   } catch (error) {
//     res.status(500).json({ error: "Unable to get users!" });
//   }
// });

{
  /* lOGIN POST */
}
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     // email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ error: "Invalid email address!" });
//     }

//     // password validation
//     const passwordRegex =
//       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
//     if (!passwordRegex.test(password)) {
//       return res.status(400).json({
//         error:
//           "Password should be 8 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
//       });
//     }

//     if (!user) {
//       return res.status(401).json({ error: "Invalid Credentials!" });
//     }

//     // Check if the user is verified
//     if (!user.verified) {
//       return res.status(401).json({
//         error:
//           "Your account is not verified. Please check your email for verification instructions.",
//       });
//     }

//     const isPasswordValid = await comparePassword(password, user.password); // Compare passwords using bcrypt

//     if (isPasswordValid) {
//       // Password is valid, you can generate and send a token here

//       const token = jwt.sign({ userID: user._id }, SECRET_KEY, {
//         expiresIn: "1h",
//       });
//       const role = user.role;
//       res.json({ message: "Login successful!", token, role });
//     } else {
//       res.status(401).json({ error: "Invalid Credentials!" });
//     }
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

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

//getpatient
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
      bloodgroup,
    } = req.body;

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

    res.status(201).json({ message: "Patient registered successfully" });
  } catch (error) {
    console.error("Error registering patient:", error);
    res.status(500).json({ message: "Internal Server Error" });
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

app.post("/newdoctor", async (req, res) => {
  try {
    const { fullname, email, phonenumber, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    const newDoctor = new User({
      email,
      username: fullname, // Assuming username is used for fullname
      number: phonenumber,
      password, // You should hash the password before saving it
      role: "doctor", // Set the role for a doctor
    });

    // Save the new doctor to the database
    await newDoctor.save();

    // Respond with success message
    res.status(201).json({ message: "Doctor created successfully." });
  } catch (error) {
    console.error("Error creating doctor:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/doctorregister", async (req, res) => {
  try {
    const {
      nmc,
      email,
      role,
      expertise,
      degree,
      school,
      workingHours,
      apptDuration,
      daysAvailable,
      fees,
      verified,
    } = req.body;

    // You can add validation logic here if needed

    // Create a new doctor instance
    const newDoctor = new Doctors({
      nmc,
      email,
      role,
      expertise,
      degree,
      school,
      workingHours,
      apptDuration,
      daysAvailable,
      fees,
      verified,
    });

    // Save the doctor to the database
    await newDoctor.save();

    // Respond with a success message
    res.status(201).json({ message: "Doctor registered successfully" });
  } catch (error) {
    console.error("Error registering doctor:", error);
    res
      .status(500)
      .json({ error: "An unexpected error occurred. Please try again later." });
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

// app.post('/upload', upload.single("image"), async (req, res) => {
//   console.log(req.body);
//   console.log(req)
//   //res.status(201).json({ message: "Uploaded sucessfully!"});
// })

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

app.post("/addDoctors", async (req, res) => {
  try {
  } catch (error) {}
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

app.post('/newdoctor', async (req, res) => {
  try {
    // Extract data from request body
    const {
      nmc,
      email,
      role,
      expertise,
      degree,
      school,
      startTime,
      endTime,
      daysAvailable,
      fees
    } = req.body;

    // Create a new doctor instance
    const newDoctor = new Doctors({
      nmc,
      email,
      role,
      expertise,
      degree,
      school,
      startTime,
      endTime,
      daysAvailable,
      fees
    });

    // Save the new doctor to the database
    const savedDoctor = await newDoctor.save();

    // Respond with the saved doctor object
    res.status(201).json(savedDoctor);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
