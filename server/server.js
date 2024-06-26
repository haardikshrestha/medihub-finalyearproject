const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const pdf = require("html-pdf");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/userSchema");
const Doctors = require("./models/doctor-models/doctorschema");
const Patient = require("./models/patient-models/patientSchema");
const Ward = require("./models/hospital-models/wardSchema");
const Pathologist = require("./models/pathology-models/pathologistSchema");
const Department = require("./models/hospital-models/departmentSchema");
const Appointment = require("./models/patient-models/appointmentsSchema");
const Surgery = require("./models/doctor-models/surgerySchema");
const PasswordResetToken = require("./models/patient-models/resettoken");
const LabTest = require("./models/pathology-models/labtestSchema");
const TestResult = require("./models/pathology-models/testResultSchema");
const SampleCollection = require("./models/pathology-models/sampleCollectionSchema");
const InPatient = require("./models/patient-models/inPatientSchema");
const LabReport = require("./models/pathology-models/labReportSchema");
const Diagnosis = require("./models/diagnosisSchema.js");
const app = express();
app.use(express.json());
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const dotenv = require("dotenv");
const multer = require("multer");
dotenv.config();
const AuthGuard = require("./middleware");
const fs = require("fs");
const path = require("path");
const dbURI = process.env.MONGODB_URI;
const SECRET_KEY = process.env.JWT_SECRET;
const saltRounds = 10;

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
const doctorRouter = require("./router/doctor.router.js");
app.use(doctorRouter)
const appointmentRouter = require("./router/appointment.router.js");
app.use(appointmentRouter)
const hospitalRouter = require("./router/hospital.router.js");
app.use(hospitalRouter)
const pathologistRouter = require("./router/pathologist.router.js");
app.use(pathologistRouter)
const patientRouter = require("./router/patient.router.js");
app.use(patientRouter)


const diagnosisRouter = require("./router/diagnosis.router.js");
app.use(diagnosisRouter)


const counterRouter = require("./router/counter.route.js");
app.use(counterRouter)
console.log("Adding admin....");
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

app.get(
  "/getUsers1",
  AuthGuard(["user", "doctor", "pathologist"]),
  async (req, res) => {
    try {
      const userEmail = req.user.email;

      const user = await User.findOne({ email: userEmail }).select("-password");
      console.log(user);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({
        message: "User found",
        user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error getting user" });
    }
  }
);

app.post("/postregister", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Email already exists" });
  }

  if (!email || !password) {
    return res.status(400).json({ error: "Empty Details!" });
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

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpExpiresAt = Date.now() + 15 * 60 * 1000;

  const newUser = new User({
    email,
    password: hashedPassword,
    otp,
    otpExpiresAt,
  });

  try {
    await newUser.save();

    const mailOptions = {
      from: "MediHub App",
      to: email,
      subject: "Welcome to Our Platform!",
      html: `
        <html>
          <head>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          </head>
          <body class="bg-gray-100 font-sans">
            <div class="max-w-2xl mx-auto p-8 bg-white rounded shadow-md">
              <div class="text-center mb-8">
                <img src="https://example.com/logo.png" alt="Company Logo" class="w-20 mx-auto mb-4">
                <h1 class="text-2xl font-bold text-gray-800">Welcome to Our Platform!</h1>
              </div>
              <p class="text-gray-800 mb-4">Hello,</p>
              <p class="text-gray-800 mb-4">Thank you for registering with us!</p>
              <p class="text-gray-600 mb-4">Your OTP for registration is: ${otp}</p>
              <p class="text-gray-600 mb-4">Please use this OTP to complete your registration process.</p>
              <p class="text-gray-600 mb-4">If you did not initiate this registration, please ignore this email.</p>
              <p class="text-gray-800">Best regards,<br>MediHub App</p>
            </div>
          </body>
        </html>
      `,
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
    const users = await User.find().select("-password");
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


app.post('/postdiagnosis', async (req, res) => {
  try {
    const { patientEmail, doctorEmail, diagnosis, medications, notes } = req.body;

    if (!doctorEmail || !patientEmail || !diagnosis || !medications || !notes.trim()) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const html = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            h1 {
              color: #333;
            }
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>Diagnosis Report</h1>
          <p>Doctor Email: ${doctorEmail}</p>
          <p>Patient Email: ${patientEmail}</p>
          <p>Diagnosis: ${diagnosis}</p>
          <h2>Medications</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Dosage</th>
                <th>Time of Day</th>
                <th>Before/After Eating</th>
              </tr>
            </thead>
            <tbody>
              ${medications.map(medication => `
                <tr>
                  <td>${medication.name}</td>
                  <td>${medication.dosage}</td>
                  <td>${medication.timeOfDay}</td>
                  <td>${medication.beforeOrAfterEating}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <p>Notes: ${notes}</p>
        </body>
      </html>
    `;

    // Generate PDF from HTML
    const pdfBuffer = await new Promise((resolve, reject) => {
      pdf.create(html).toBuffer((err, buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer);
        }
      });
    });

    // Save PDF in the database
    const newDiagnosis = new Diagnosis({
      doctorEmail,
      patientEmail,
      diagnosis,
      medications,
      notes,
      pdfBuffer,
    });

    const savedDiagnosis = await newDiagnosis.save();

    // Send PDF to the patient via email
    const mailOptions = {
      from: 'your-email@gmail.com', // Replace with your email address
      to: patientEmail,
      subject: 'Diagnosis Report',
      text: 'Please find attached your diagnosis report.',
      attachments: [
        {
          filename: `diagnosis-report-${patientEmail}.pdf`,
          content: pdfBuffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Diagnosis submitted successfully', diagnosis: savedDiagnosis });
  } catch (error) {
    console.error('Error submitting diagnosis:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/diagnosis/:id', async (req, res) => {
  try {
    const diagnosis = await Diagnosis.findById(req.params.id);
    if (!diagnosis) {
      return res.status(404).json({ message: 'Diagnosis not found' });
    }
    res.status(200).json({ diagnosis });
  } catch (error) {
    console.error('Error fetching diagnosis:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/diagnosis', async (req, res) => {
  try {
    const diagnosis = await Diagnosis.find();
    if (!diagnosis) {
      return res.status(404).json({ message: 'Diagnosis not found' });
    }
    res.status(200).json({ diagnosis });
  } catch (error) {
    console.error('Error fetching diagnosis:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// View PDF Endpoint
app.get('/diagnosis/:id/pdf', async (req, res) => {
  try {
    const diagnosis = await Diagnosis.findById(req.params.id);
    if (!diagnosis || !diagnosis.pdfBuffer) {
      return res.status(404).json({ message: 'PDF not found' });
    }
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="diagnosis-report-${req.params.id}.pdf"`
    });
    res.send(diagnosis.pdfBuffer);
  } catch (error) {
    console.error('Error fetching PDF:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});















//LOGIN - POST
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill in all the details!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid Email or Password!" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ error: "Invalid Email or Password!" });
    }
    const userPayload = { email: user.email, role: user.role, id: user._id };
    console.log(userPayload);
    const token = jwt.sign(userPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, role: user.role });
    console.log(token);
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json(error);
  }
});

app.post("/checkverify", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    res.json({ verified: user.verified });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json(error);
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

        const mailOptions = {
          from: "your-email@gmail.com",
          to: email,
          subject: "Welcome to Our Platform!",
          html: `
            <html>
              <head>
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
              </head>
              <body class="bg-gray-100 font-sans">
                <div class="max-w-2xl mx-auto p-8 bg-white rounded shadow-md">
                  <div class="text-center mb-8">
                    <h1 class="text-2xl font-bold text-gray-800">Welcome to Our Platform!</h1>
                  </div>
                  <p class="text-gray-800 mb-4">Hello,</p>
                  <p class="text-gray-800 mb-4">Thank you for registering with us!</p>
                  <p class="text-gray-800 mb-4">We're excited to have you on board.</p>
                  <p class="text-gray-800 mb-4">Your account has been successfully verified.</p>
                  <p class="text-gray-800 mb-4">Please log in and fill in your medical details on your first login.</p>
                  <p class="text-gray-600 mb-4">If you have any questions or need assistance, feel free to reach out to us.</p>
                  <p class="text-gray-800">Best regards,<br>MediHub App</p>
                </div>
              </body>
            </html>
          `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        return res
          .status(200)
          .json({ message: "OTP verified successfully. Welcome email sent." });
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

app.use(express.urlencoded({ extended: false }));





app.put("/patients/:email", async (req, res) => {
  try {
    const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
    const dateOfBirth = req.body.dateofbirth;
    const age = calculateAge(dateOfBirth);

    if (age < 18) {
      return res.status(400).json({
        message: "You must be at least 18 years old.",
      });
    }

    const patient = await Patient.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({
      message: "Patient profile updated successfully",
      patient,
    });
  } catch (error) {
    console.error("Error updating patient profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post('/post/patientdiagnosis', async (req, res) => {
  try {
    const { patientEmail, doctorEmail, diagnosis, medication, comments } = req.body;

    const newDiagnosis = new PatientDiagnosis({
      patientEmail,
      doctorEmail,
      diagnosis,
      medication,
      comments
    });

    await newDiagnosis.save();

    res.status(201).json({ message: 'Patient diagnosis created successfully' });
  } catch (error) {
    console.error('Error creating patient diagnosis:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/get/patientdiagnosis/:patientEmail', async (req, res) => {
  try {
    const patientEmail = req.params.patientEmail;

    const patientDiagnosis = await PatientDiagnosis.find({ patientEmail });

    if (!patientDiagnosis) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json(patientDiagnosis);
  } catch (error) {
    console.error('Error fetching patient diagnosis:', error);
    res.status(500).json({ error: 'Internal server error' });
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



app.get("/getpatients", async (req, res) => {
  try {
    const patients = await Patient.find();

    res.status(200).json(patients);
  } catch (err) {
    console.error("Error fetching patients:", err);
    res.status(500).json({
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




//add patient infro through from -> /in
app.post("/patients/addInfo", async (req, res) => {
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

    // Create a new instance of the Patient model
    const newPatient = new Patient({
      email,
      firstName,
      lastName,
      gender,
      dateofbirth,
      chronicillness: chronicillness || "None", // Default value if not provided
      address,
      bloodgroup,
    });

    // Save the new patient to the database
    const savedPatient = await newPatient.save();

    res.status(201).json(savedPatient); // Respond with the saved patient data
  } catch (error) {
    console.error("Error adding patient:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/add/appointments", async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json({
      message: "Appointment created successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to create appointment", message: error.message });
  }
});

// GET route to retrieve appointments for a specific doctor
app.get("/appointments/getdoctor", async (req, res) => {
  const doctorName = "Dr. Jane Smith";
  const appointmentDate = "2024-03-23";
  const appointmentDate1 = "2024-03-22";
  try {
    const appointments = await Appointment.find({
      apptDoctor: doctorName,
      apptDate: appointmentDate,
    });
    const appointments1 = await Appointment.find({
      apptDoctor: doctorName,
      apptDate: appointmentDate1,
    });
    const appointmentCount = appointments.length;
    const appointmentCount1 = 9;
    const difference = appointmentCount - appointmentCount1;
    const percentage = (difference / appointmentCount) * 100;
    res
      .status(200)
      .json({ appointments, appointmentCount, appointmentCount1, percentage });
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve appointments",
      message: error.message,
    });
  }
});

// ---------------------------------- ADMIN -------------------------------------------------------------

//delete patient through email
app.post("/patients/delete", async (req, res) => {
  const { email } = req.body;

  try {
    const deletedPatient = await Patient.findOneAndDelete({ email });

    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    return res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    return res
      .status(500)
      .json({ message: "Error deleting patient", error: error.message });
  }
});

app.get("/genderCounter", async (req, res) => {
  try {
    const genderCounts = await Patient.aggregate([
      { $group: { _id: "$gender", count: { $sum: 1 } } },
      {
        $group: {
          _id: null,
          male: { $sum: { $cond: [{ $eq: ["$_id", "male"] }, "$count", 0] } },
          female: {
            $sum: { $cond: [{ $eq: ["$_id", "female"] }, "$count", 0] },
          },
          other: { $sum: { $cond: [{ $eq: ["$_id", "other"] }, "$count", 0] } },
          total: { $sum: "$count" },
        },
      },
    ]);

    const result =
      genderCounts.length > 0
        ? genderCounts[0]
        : { male: 0, female: 0, other: 0, total: 0 };

    res.json(result);
  } catch (err) {
    console.error("Error finding gender counts:", err);
  }
});

// ---------------------------------- PATIENTS -------------------------------------------------------------
app.post("/patientsinfo", async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      chronicIllness,
      address,
      bloodGroup,
    } = req.body;

    // Check for empty fields
    if (!email || !firstName || !lastName || !gender || !dateOfBirth || !chronicIllness || !address || !bloodGroup) {
      return res.status(400).send("All fields are required");
    }

    // Check age requirement (not under 18)
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      return res.status(400).send("Patient must be 18 years or older");
    }

    // Save the patient
    const newPatient = new Patient({
      email,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      chronicIllness,
      address,
      bloodGroup,
    });
    await newPatient.save();
    res.status(201).send("Patient registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to register patient");
  }
});


// ---------------------------------- DOCTORS -------------------------------------------------------------

app.delete('/deleteUser', async (req, res) => {
  const { email } = req.query; 
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await User.deleteOne({ email });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// ---------------------------------- PATHOLOGISTS -------------------------------------------------------------
//reset
app.post("/staff/updatepassword", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Validate the new password
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        error:
          "Password should be 8 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Update the user's password
    user.password = await hashPassword(newPassword);

    // Set verified to true
    user.verified = true;

    await user.save();

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res
      .status(500)
      .json({ error: "Error updating password. Please try again." });
  }
});

app.post("/api/newpathologist", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      degree,
      school,
      nmcNumber,
      password,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPathologist = new Pathologist({
      fullname: fullName,
      email: email,
      number: phoneNumber,
      degree: degree,
      school: school,
      nmc: nmcNumber,
      password: hashedPassword,
    });

    await newPathologist.save();

    const newUser = new User({
      email: email,
      password: hashedPassword,
      role: "pathologist",
    });

    await newUser.save();

    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: "Your account details",
      text: `Dear Pathologist,

Your account has been created successfully. Here are your login credentials:

Email: ${email}
Password: ${password}

Please change your password after logging in for security reasons.

Regards,
MediHub Team`,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Pathologist information registered successfully" });
  } catch (error) {
    console.error("Error registering pathologist information:", error);
    res.status(500).json(error);
  }
});

//add new test result:
app.post("/testresult/add", async (req, res) => {
  try {
    const {
      patientName,
      doctorName,
      testResultsPdf,
      testType,
      comments,
      date,
    } = req.body;

    const newTestResult = new TestResult({
      patientName,
      doctorName,
      testResultsPdf,
      testType,
      comments,
      date,
    });

    await newTestResult.save();

    res.status(201).json({ message: "Test result created successfully" });
  } catch (error) {
    console.error("Error creating test result:", error);
    res.status(500).json(error);
  }
});

//get all test results
app.get("/testresult/get/all", async (req, res) => {
  try {
    const testResults = await TestResult.find();

    res.status(200).json(testResults);
  } catch (error) {
    console.error("Error fetching test results:", error);
    res.status(500).json(error);
  }
});

// get a specific patient's test results
app.get("/testresult/get/patient", async (req, res) => {
  try {
    const patientName = req.query.patientName;

    if (!patientName) {
      return res
        .status(400)
        .json({ error: "Patient name is required in query parameters" });
    }

    const testResults = await TestResult.find({ patientName });

    res.status(200).json(testResults);
  } catch (error) {
    console.error("Error fetching test results:", error);
    res.status(500).json(error);
  }
});

//get all the test results within a certain date range
app.get("/testresult/get/daterange", async (req, res) => {
  try {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({
          error:
            "Both start date and end date are required in query parameters",
        });
    }

    const testResults = await TestResult.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });

    res.status(200).json(testResults);
  } catch (error) {
    console.error("Error fetching test results:", error);
    res.status(500).json(error);
  }
});

//get test results of the same type
app.get("/testresult/get/type", async (req, res) => {
  try {
    const testType = req.query.testType;

    if (!testType) {
      return res
        .status(400)
        .json({ error: "Test type is required in query parameters" });
    }

    const testResults = await TestResult.find({ testType });

    res.status(200).json(testResults);
  } catch (error) {
    console.error("Error fetching test results:", error);
    res.status(500).json(error);
  }
});

//add pathologist appointment.
app.post("/samplecollections/add", async (req, res) => {
  try {
    const { patientName, doctorName, testType } = req.body;

    const startHour = 9;
    const endHour = 16;

    const currentDate = new Date();
    let appointmentDate = new Date(currentDate);
    appointmentDate.setDate(
      currentDate.getDate() +
        (currentDate.getHours() >= endHour || currentDate.getHours() < startHour
          ? 1
          : 0)
    );
    appointmentDate.setHours(startHour, 0, 0, 0);

    while (
      appointmentDate.getHours() >= endHour ||
      appointmentDate.getDay() === 0 ||
      appointmentDate.getDay() === 6
    ) {
      appointmentDate.setDate(appointmentDate.getDate() + 1);
      appointmentDate.setHours(startHour, 0, 0, 0);
    }

    const newSampleCollection = new SampleCollection({
      patientName,
      doctorName,
      appointmentDateTime: appointmentDate,
      testType,
    });

    await newSampleCollection.save();

    res
      .status(201)
      .json({
        message: "Sample collection created successfully",
        appointmentDateTime: appointmentDate,
      });
  } catch (error) {
    console.error("Error creating sample collection:", error);
    res.status(500).json(error);
  }
});

//get all appointments
app.get("/samplecollections/get/all", async (req, res) => {
  try {
    const sampleCollections = await SampleCollection.find();

    res.status(200).json(sampleCollections);
  } catch (error) {
    console.error("Error fetching sample collections:", error);
    res.status(500).json(error);
  }
});

//get according to patient
app.get("/samplecollections/get/patient/:email", async (req, res) => {
  try {
    const patientEmail = req.params.email;

    if (!patientEmail) {
      return res
        .status(400)
        .json({ error: "Patient email is required in route parameter" });
    }

    const sampleCollections = await SampleCollection.find({ patientEmail });

    if (sampleCollections.length === 0) {
      return res.status(404).json({ error: "No sample collections found for the provided patient email" });
    }

    res.status(200).json(sampleCollections);
  } catch (error) {
    console.error("Error fetching sample collections:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/api/samples/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const samples = await SampleCollection.find({ patientEmail: email });

    if (samples.length === 0) {
      return res.status(404).json({ message: 'No samples found for the given email' });
    }

    res.json(samples);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.put('/samplecollections/cancel/:testID', async (req, res) => {
  try {
    const testID = req.params.testID;
    const appointment = await SampleCollection.findOneAndUpdate(
      { _id: testID },
      { status: "Cancelled" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    return res.status(200).json(appointment);
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get according to doctor
app.get("/samplecollections/get/doctor", async (req, res) => {
  try {
    const doctorName = req.query.doctorName;

    if (!doctorName) {
      return res
        .status(400)
        .json({ error: "Doctor name is required in query parameters" });
    }

    const sampleCollections = await SampleCollection.find({ doctorName });

    res.status(200).json(sampleCollections);
  } catch (error) {
    console.error("Error fetching sample collections:", error);
    res.status(500).json(error);
  }
});

// get all sample collection according to status
app.get("/samplecollections/get/status", async (req, res) => {
  try {
    const status = req.query.status;

    if (!status) {
      return res
        .status(400)
        .json({ error: "Status is required in query parameters" });
    }

    const sampleCollections = await SampleCollection.find({ status });

    res.status(200).json(sampleCollections);
  } catch (error) {
    console.error("Error fetching sample collections:", error);
    res.status(500).json(error);
  }
});

//get according to test type
app.get("/samplecollections/get/testtype", async (req, res) => {
  try {
    const testType = req.query.testType;

    if (!testType) {
      return res
        .status(400)
        .json({ error: "Test type is required in query parameters" });
    }

    const sampleCollections = await SampleCollection.find({ testType });

    res.status(200).json(sampleCollections);
  } catch (error) {
    console.error("Error fetching sample collections:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get according to date range:
app.get("/samplecollections/get/daterange", async (req, res) => {
  try {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({
          error:
            "Both start date and end date are required in query parameters",
        });
    }

    const sampleCollections = await SampleCollection.find({
      appointmentDateTime: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });

    res.status(200).json(sampleCollections);
  } catch (error) {
    console.error("Error fetching sample collections:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get according to specific date
app.get("/samplecollections/get/onedate", async (req, res) => {
  try {
    const date = req.query.date;

    if (!date) {
      return res
        .status(400)
        .json({ error: "Date is required in query parameters" });
    }

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const sampleCollections = await SampleCollection.find({
      appointmentDateTime: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    res.status(200).json(sampleCollections);
  } catch (error) {
    console.error("Error fetching sample collections:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/generate-pdf", (req, res) => {
  const { patientInfo, diagnosis } = req.body;

  const html = `
      <div>
          <h1>Patient Information</h1>
          <p>Name: ${patientInfo.name}</p>
          <p>Age: ${patientInfo.age}</p>
          <h2>Diagnosis</h2>
          <p>${diagnosis}</p>
      </div>
  `;

  pdf.create(html).toBuffer((err, buffer) => {
    if (err) {
      res.status(500).send("Error generating PDF");
      return;
    }
    res.contentType("application/pdf");
    res.send(buffer);
  });
});

app.post("/generate-report-template", (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Medical Report Template</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
        h1, h2 {
          color: #333;
        }
        table {
          border-collapse: collapse;
          width: 100%;
        }
        th, td {
          padding: 8px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #f2f2f2;
        }
      </style>
    </head>
    <body>
      <h1>Medical Report</h1>
      <h2>Patient Information</h2>
      <p>Name: <span id="patientName">${req.body.patientName}</span></p>
      <p>Age: <span id="patientAge">${req.body.patientAge}</span></p>

      <h2>Test Results</h2>
      <table>
        <tr>
          <th>Test Name</th>
          <th>Value</th>
          <th>Reference Range</th>
        </tr>
        <tr>
          <td>Hemoglobin</td>
          <td id="hemoglobin">${req.body.hemoglobin}</td>
          <td>12 - 15 g/dL</td>
        </tr>
      </table>

      <h2>Diagnosis</h2>
      <p id="diagnosis">${req.body.diagnosis}</p>

      <p>Signature: <span id="signature">${req.body.signature}</span></p>
    </body>
    </html>
  `;

  pdf.create(html).toBuffer((err, buffer) => {
    if (err) {
      res.status(500).send("Error generating PDF");
      return;
    }

    const mailOptions = {
      from: "app.medihub@gmail.com", // Your Gmail email address
      to: "haardikshrestha@gmail.com",
      subject: "Medical Report",
      html: "Please find attached the medical report.",
      attachments: [
        {
          filename: "medical_report.pdf",
          content: buffer,
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Error sending email");
      } else {
        console.log("Email sent:", info.response);
        res.contentType("application/pdf");
        res.send(buffer);
      }
    });
  });
});

app.post("/api/post/appointments", async (req, res) => {
  try {
    const {
      apptID,
      apptDate,
      apptPatient,
      apptTime,
      apptDoctor,
      apptDisease,
      paymentStatus,
      transactionID,
    } = req.body;

    const newAppointment = new Appointment({
      apptID,
      apptDate,
      apptPatient,
      apptTime,
      apptDoctor,
      apptDisease,
      paymentStatus,
      transactionID,
    });

    await newAppointment.save();

    res.status(201).json({ message: "Appointment created successfully" });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

app.post("/post/labtests", async (req, res) => {
  try {
    const { testName, testPrice, testFields } = req.body;
    console.log("heloo");
    const newLabTest = new LabTest({
      testName,
      testPrice,
      testFields,
    });

    console.log(testFields);
    await newLabTest.save();

    res.status(201).json({ message: "Lab test created successfully" });
  } catch (error) {
    console.error("Error creating lab test:", error);
    res.status(500).json(error);
  }
});

app.get("/get/labtests", async (req, res) => {
  try {
    const labTests = await LabTest.find(); // Retrieve all lab tests from the database
    res.json(labTests); // Send the lab tests as JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // If an error occurs, send 500 status code with error message
  }
});

app.get("/singlelabtest", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res
      .status(400)
      .json({ error: "id is required in the request body" });
  }

  try {
    const labTest = await LabTest.findById(id);

    if (!labTest) {
      return res.status(404).json({ error: "LabTest not found" });
    }

    // If found, return the LabTest document
    res.json(labTest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/get/labtestsNo", async (req, res) => {
  try {
    const labTests = await LabTest.countDocuments(); // Retrieve all lab tests from the database
    res.json(labTests); // Send the lab tests as JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // If an error occurs, send 500 status code with error message
  }
});

app.post("/scheduleSample", async (req, res) => {
  try {
    const appointmentDate = new Date(req.body.appointmentDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (appointmentDate.toDateString() < tomorrow.toDateString()) {
      return res.status(400).json({ error: "Appointment date should be tomorrow or a later date." });
    }

    const appointmentTime = new Date(`2000-01-01T${req.body.appointmentTime}`);
    const startTime = new Date(`2000-01-01T09:00:00`);
    const endTime = new Date(`2000-01-01T17:00:00`);
    if (appointmentTime < startTime || appointmentTime > endTime) {
      return res.status(400).json({ error: "Appointment time should be between 9 am and 5 pm." });
    }

    // Save the appointment if validations pass
    const newSample = new SampleCollection(req.body);
    await newSample.save();
    res.status(201).json({ message: "Sample saved successfully", sample: newSample });
  } catch (error) {
    console.error("Error saving sample:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.post("/samplecollections/:id/updateStatus", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedCollection = await SampleCollection.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedCollection) {
      return res.status(404).json({ message: "Sample collection not found" });
    }

    res.status(200).json(updatedCollection);
  } catch (error) {
    console.error("Error updating sample collection status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/samplecollections/:id/updateStatus", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedCollection = await SampleCollection.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedCollection) {
      return res.status(404).json({ message: "Sample collection not found" });
    }

    res.status(200).json(updatedCollection);
  } catch (error) {
    console.error("Error updating sample collection status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({ dest: "uploads/" });

app.get("/reportlabtests/:id", async (req, res) => {
  const testId = req.params.id;
  console.log(testId);
  try {
    const labTest = await LabTest.findById(testId);
    console.log(labTest.testFields);
    res.json(labTest);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/testresults", upload.single("testResultsPdf"), (req, res) => {
  const testResult = new TestResult({
    patientName: req.body.patientName,
    doctorName: req.body.doctorName,
    testResultsPdf: req.file ? req.file.path : null,
    date: req.body.date,
    testType: req.body.testType,
    comments: req.body.comments,
  });
  testResult.save((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to save test result" });
    }
    res.json({ message: "Test result saved successfully" });
  });
});

app.post("/new/inpatients", async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    gender,
    dateofbirth,
    chronicillness,
    address,
    bloodgroup,
    admitdate,
    dischargedate,
    ward,
    status,
    medications,
  } = req.body;

  try {
    const newInPatient = new InPatient({
      email,
      firstName,
      lastName,
      gender,
      dateofbirth,
      chronicillness,
      address,
      bloodgroup,
      admitdate,
      dischargedate,
      ward,
      status,
      medications,
    });

    await newInPatient.save();

    const mailOptions = {
      from: "app.medihub@gmail.com",
      to: email,
      subject: "Admission Notification",
      text: `Dear ${firstName} ${lastName},\n\nYou have been admitted to the hospital.\n\nHere are your details:\nFirst Name: ${firstName}\nLast Name: ${lastName}\nGender: ${gender}\nDate of Birth: ${dateofbirth}\nChronic Illness: ${chronicillness}\nAddress: ${address}\nBlood Group: ${bloodgroup}\nAdmit Date: ${admitdate}\nWard: ${ward}\n\nThank you.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res
      .status(201)
      .json({ message: "Inpatient created successfully", data: newInPatient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/get/inpatients", async (req, res) => {
  try {
    // Query the database to fetch all inpatients
    const allInPatients = await InPatient.find();

    // Send the response with the fetched inpatients
    res.json(allInPatients);
  } catch (error) {
    // If an error occurs, send a failure response
    res.status(500).json({ error: error.message });
  }
});

app.get("/get/one/inpatients/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const inPatient = await InPatient.findOne({ email });
    if (!inPatient) {
      return res.status(404).json({ message: "Inpatient not found" });
    }
    res.json(inPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/update/inpatients/:email", async (req, res) => {
  try {
    const { email } = req.params;
    await InPatient.findOneAndUpdate({ email }, { status: "discharged" });
    res.json({ message: "Patient discharged successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/send/discharge-summary/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { dischargeSummary } = req.body;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Discharge Summary Report</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" rel="stylesheet">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');
    </style>
  </head>
  <body class="bg-gray-100">
    <div class="container mx-auto max-w-3xl py-8 px-4 bg-white rounded-lg shadow-md">
      <div class="flex justify-between items-center mb-8">
        <img src="https://th.bing.com/th/id/R.3ebf7b4f949143f8440dbb87f36c9056?rik=I7pMkoWTtcYadg&pid=ImgRaw&r=0" alt="Hospital Logo" class="h-12" />
        <div class="text-right">
          <h2 class="text-xl font-bold text-gray-800">MediHub Hospital</h2>
          <p class="text-gray-600">Maru Bahi, Kathmandu</p>
          <p class="text-gray-600">Phone: 42132435</p>
        </div>
      </div>
      <h1 class="text-3xl font-bold text-gray-800 text-center mb-6">Discharge Summary Report</h1>
      <p class="text-gray-700 leading-relaxed mb-4">${dischargeSummary}</p>
      <div class="text-center text-gray-500 text-sm">
        <p>&copy; MediHub Hospital. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;

    // Create PDF file
    const pdfPath = path.join(__dirname, "..", "discharge_summary.pdf");
    pdf.create(htmlContent).toFile(pdfPath, (err, _) => {
      console.log("created");
      const mailOptions = {
        from: "your_email",
        to: email,
        subject: "Discharge Summary Report",
        text: "Please find the discharge summary report attached.",
        attachments: [{ path: pdfPath }],
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          res.status(500).json({ error: "Error sending email" });
        } else {
          console.log("Email sent:", info.response);
          // Delete the generated PDF file
          fs.unlinkSync(pdfPath);
          res.json({ message: "Discharge summary report sent successfully" });
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/sample/:date/:email", async (req, res) => {
  try {
    const date = req.params.date;
    const email = req.params.email;

    const sampleData = await SampleCollection.find({
      appointmentDate: date,
      patientEmail: email,
    });

    if (sampleData.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found for the specified date and email." });
    }

    res.status(200).json(sampleData);
  } catch (err) {
    console.error(err);
    res.status(500).json(error);
  }
});

app.get("/appointment/:date/:email", async (req, res) => {
  try {
    const date = req.params.date;
    const email = req.params.email;

    const appointmentData = await Appointment.find({
      apptDate: date,
      apptPatient: email,
    });

    if (appointmentData.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found for the specified date and email." });
    }

    res.status(200).json(appointmentData);
  } catch (err) {
    console.error(err);
    res.status(500).json(error);
  }
});

app.get("/api/upcoming-appointment/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const upcomingAppointment = await Appointment.findOne({
      apptPatient: email,
      apptDate: { $gte: new Date() },
    })
      .sort({ apptDate: 1 })
      .limit(1);

    if (!upcomingAppointment) {
      return res.status(200).json({ message: "No scheduled appointments." });
    }

    res.status(200).json(upcomingAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/upcoming-sample/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const upcomingAppointment = await SampleCollection.findOne({
      apptPatient: email,
      apptDate: { $gte: new Date() },
    })
      .sort({ apptDate: 1 })
      .limit(1);

    if (!upcomingAppointment) {
      return res.status(200).json({ message: "No scheduled appointments." });
    }

    res.status(200).json(upcomingAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ----------------------- Create Test Page ----------------------

app.get("/getbyemail/patient/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await Patient.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/getbyid/test/:testId", async (req, res) => {
  try {
    const testId = req.params.testId;
    const labTest = await LabTest.findById(testId);
    if (!labTest) {
      return res.status(404).json({ message: "Lab test not found" });
    }
    res.json(labTest);
  } catch (error) {
    console.error("Error fetching lab test:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/getbyid/sample/:sampleId", async (req, res) => {
  try {
    const sampleId = req.params.sampleId;
    const sample = await SampleCollection.findById(sampleId);
    if (!sample) {
      return res.status(404).json({ message: "Sample not found" });
    }
    res.json(sample);
  } catch (error) {
    console.error("Error fetching sample:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post('/submit/test', async (req, res) => {
  try {
    const { labTest, user, fieldValues, comment } = req.body;

    const emptyFields = Object.values(fieldValues).some(value => value.trim() === '');
    if (emptyFields || !comment.trim()) {
      return res.status(400).json({ message: 'Please fill in all fields before submitting.' });
    }

    const nonNumericFields = Object.values(fieldValues).some(value => isNaN(parseFloat(value)));
    if (nonNumericFields) {
      return res.status(400).json({ message: 'Field values must be numbers.' });
    }

    const html = `
      <html>
        <head>
          <style>
            /* Add your CSS styles here */
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            h1 {
              color: #333;
            }
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>Lab Report</h1>
          <p>Patient Name: ${user.firstName} ${user.lastName}</p>
          <p>Patient Email: ${user.email}</p>
          <p>Test Name: ${labTest.testName}</p>
          <table>
            <thead>
              <tr>
                <th>Field Name</th>
                <th>Normal Range</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              ${labTest.testFields.map(
                (field) => `
                <tr>
                  <td>${field.fieldName}</td>
                  <td>${field.normalRange}</td>
                  <td>${fieldValues[field.fieldName] || ''}</td>
                </tr>
              `
              ).join('')}
            </tbody>
          </table>
          <p>Comments: ${comment}</p>
        </body>
      </html>
    `;

    // Generate PDF from HTML
    const pdfBuffer = await new Promise((resolve, reject) => {
      pdf.create(html).toBuffer((err, buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer);
        }
      });
    });

    // Save PDF in the database
    const pdfData = {
      patientName: `${user.firstName} ${user.lastName}`,
      patientEmail: user.email,
      testName: labTest.testName,
      pdfBuffer: pdfBuffer,
    };
    const savedPDF = await LabReport.create(pdfData);

    // Send PDF to the patient via email
    const mailOptions = {
      from: 'your-email@gmail.com', // Replace with your email address
      to: user.email,
      subject: 'Lab Report',
      text: 'Please find attached your lab report.',
      attachments: [
        {
          filename: `lab-report-${user.firstName}-${user.lastName}.pdf`,
          content: pdfBuffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Lab report submitted successfully' });
  } catch (error) {
    console.error('Error submitting lab report:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//------------------------------------------------------------------

app.get('/downloadreport/:id', async (req, res) => {
  try {
    const labReport = await LabReport.findById(req.params.id);

    if (!labReport) {
      return res.status(404).json({ message: 'Lab report not found' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${labReport.filename}"`);
    res.send(labReport.pdfBuffer);
  } catch (error) {
    console.error('Error downloading lab report:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ------------------- lab reports ----------------------


// Endpoint to fetch lab reports by patient email
app.get('/labreports', async (req, res) => {
  try {
    const { patientEmail } = req.query;
    if (!patientEmail) {
      return res.status(400).json({ message: 'Patient email is required' });
    }

    const labReports = await LabReport.find({ patientEmail });
    if (labReports.length === 0) {
      return res.status(404).json({ message: 'Lab reports not found for the specified patient email' });
    }

    res.json(labReports);
  } catch (error) {
    console.error('Error fetching lab reports:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// ------------------------- diagnosis -------------------



app.get('/counter/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const appointmentCount = await Appointment.countDocuments({ patientEmail: email });
        const sampleCollectionCount = await SampleCollection.countDocuments({ patientEmail: email });
        const patientDiagnosisCount = await PatientDiagnosis.countDocuments({ patientEmail: email });
        const labReportCount = await LabReport.countDocuments({ patientEmail: email });

        res.status(200).json({ 
            appointmentCount: appointmentCount,
            sampleCollectionCount: sampleCollectionCount,
            patientDiagnosisCount: patientDiagnosisCount,
            labReportCount: labReportCount
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
