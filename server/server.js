// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("./models/userSchema");
const app = express();
const nodemailer = require("nodemailer");
// require('dotenv').config();

const dbURI =
  "mongodb+srv://medihub:medihub%40123@cluster0.a1uktfi.mongodb.net/UsersDB?retryWrites=true&w=majority";
const SECRET_KEY = "secretkey";
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

// const transporter = nodemailer.createTransport({
//   host: process.env.HOST,
//   service: process.env.SERVICE,
//   port: process.env.EMAIL_PORT,
//   secure: process.env.SECURE === "true", // convert to boolean
//   auth: {
//     user: process.env.USER,
//     pass: process.env.PASS,
//   },
// });


async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePassword(inputPassword, storedHash) {
  const isPasswordValid = await bcrypt.compare(inputPassword, storedHash);
  return isPasswordValid;
}
app.get('/reset-password', (req, res) => {
  // Serve the reset password page or redirect to a frontend route
  // This is where users will input their new password
  // You might render an HTML page or redirect to your frontend route
  res.status(200).send('Reset password page or redirect');
});

// app.post('/reset-password', async (req, res) => {
//     try {
//         const { email } = req.body;
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ error: 'User not found!' });
//         }

//         const resetToken = crypto.randomBytes(32).toString('hex');

//         user.resetToken = resetToken;
//         user.resetTokenExpires = Date.now() + 3600000; // Token expires in 1 hour
//         await user.save();

//         const resetLink = `http://your-app-url/reset-password?token=${resetToken}`;

//         const mailOptions = {
//           from: process.env.USER,
//           to: user.email,
//           subject: 'Password Reset Request',
//           html: `Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a>`
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//           if (error) {
//             console.error('Error sending email:', error);
//             return res.status(500).json({ error: 'Error sending reset email!' });
//           }
//           console.log('Email sent:', info.response);
//           res.status(200).json({ message: 'Reset link sent successfully!' });
//         });
//     } catch (error) {
//         console.error('Reset Password Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
// app.post('/update-password', async (req, res) => {
//     try {
//         const { token, newPassword } = req.body;

//         // Find the user by the reset token
//         const user = await User.findOne({ resetToken: token, resetTokenExpires: { $gt: Date.now() } });

//         if (!user) {
//             return res.status(404).json({ error: 'Invalid or expired reset token!' });
//         }

//         // Update the user's password
//         const hashedPassword = await hashPassword(newPassword);
//         user.password = hashedPassword;
//         user.resetToken = undefined;
//         user.resetTokenExpires = undefined;
//         await user.save();

//         res.status(200).json({ message: 'Password updated successfully!' });
//     } catch (error) {
//         console.error('Update Password Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

app.post("/register", async (req, res) => {
  try {
    const { email, username, number, password } = req.body;

    //email validation
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already taken!" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address!" });
    }

    //numbervalidation
    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(number)) {
      return res
        .status(400)
        .json({
          error:
            "Invalid phone number! It should be 10 digits and all numbers.",
        });
    }

    //username validation
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken!" });
    }
    
    // Username validation: No white spaces allowed
    const usernameRegex = /^\S*$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ error: "Username should not contain white spaces." });
    }
    
    // Password validation
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "Password should be 8 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      });
    }

    const hashedPassword = await hashPassword(password); // Hash the password using bcrypt
    const newUser = new User({
      email,
      username,
      number,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error signing up!" });
  }
});

app.get("/register", async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: "Unable to get users!" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    //email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address!" });
    }

    //password validation
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json({
          error:
            "Password should be 8 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
        });
    }

    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials!" });
    }

    const isPasswordValid = await comparePassword(password, user.password); // Compare passwords using bcrypt

    if (isPasswordValid) {
      // Password is valid, you can generate and send a token here
      const token = jwt.sign({ userID: user._id }, SECRET_KEY, {
        expiresIn: "1h",
      });
      res.json({ message: "Login successful!", token });
    } else {
      res.status(401).json({ error: "Invalid Credentials!" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
