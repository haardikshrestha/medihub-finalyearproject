// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/userSchema');

const app = express();

const dbURI = 'mongodb+srv://medihub:medihub%40123@cluster0.a1uktfi.mongodb.net/UsersDB?retryWrites=true&w=majority';
const SECRET_KEY = 'secretkey';

mongoose.connect(dbURI).then(() => {
    app.listen(5173, () => {
        console.log('Server is connected to port and connected to MongoDB!');
    });
}).catch((error) => {
    console.log('Unable to connect!', error);
});

app.use(bodyParser.json());
app.use(cors());

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function comparePassword(inputPassword, storedHash) {
    const isPasswordValid = await bcrypt.compare(inputPassword, storedHash);
    return isPasswordValid;
}

app.post('/register', async (req, res) => {
    try {
        const { email, username, number, password } = req.body;
        const hashedPassword = await hashPassword(password); // Hash the password
        const newUser = new User({ email, username, number, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error signing up!' });
    }
});

app.get('/register', async (req, res) => {
    try {
        const users = await User.find();
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Unable to get users!' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Invalid Credentials!' });
        }

        console.log('Entered Password:', password);
        console.log('Stored Password Hash:', user.password);

        const isPasswordValid = await comparePassword(password, user.password); // Compare passwords
        console.log('Password Validation Result:', isPasswordValid);

        if (isPasswordValid) {
            // Password is valid, you can generate and send a token here
            const token = jwt.sign({ userID: user._id }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ message: 'Login successful!', token });
        } else {
            res.status(401).json({ error: 'Invalid Credentials!' });
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
