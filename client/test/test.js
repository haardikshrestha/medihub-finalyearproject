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

  // app.post("/newdoctor", async (req, res) => {
//   try {
//     const { fullname, email, phonenumber, password } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "Email is already registered." });
//     }

//     const newDoctor = new User({
//       email,
//       username: fullname, // Assuming username is used for fullname
//       number: phonenumber,
//       password, // You should hash the password before saving it
//       role: "doctor", // Set the role for a doctor
//     });

//     // Save the new doctor to the database
//     await newDoctor.save();

//     // Respond with success message
//     res.status(201).json({ message: "Doctor created successfully." });
//   } catch (error) {
//     console.error("Error creating doctor:", error);
//     res.status(500).json({ error: "Internal server error." });
//   }
// });
