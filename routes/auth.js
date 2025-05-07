const express = require('express');
const router = express.Router();
// const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let userinfo ={
    username: "",
    password: ""   
}
let username = "";
let passwordd = "12345678";

// User registration
router.post('/register', async (req, res) => {
try {
const { username, password } = req.body;
const hashedPassword = await bcrypt.hash(password, 10);
const user = {username: username, password: hashedPassword };
userinfo.username = username;
await user.save();
res.status(201).json({ message: 'User registered successfully' });
} catch (error) {
res.status(500).json({ error: 'Registration failed' });
}
});

// User login
router.post('/login', async (req, res) => {
try {
const { username, password } = req.body;
console.log("pasword", password, passwordd);
if (password != passwordd) {
return res.status(401).json({ error: 'Authentication failed' });
}   
const token = jwt.sign({ userId: 1 }, 'pakistan', {
expiresIn: '1h',
});
console.log("token", token);
res.status(200).json({ token });
} catch (error) {
    console.log("error", error);	
res.status(500).json({ error: 'Login failed' });
}
});

module.exports = router;