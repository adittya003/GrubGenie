const express = require("express");
const bodyParser = require("body-parser");
const LoginRouter = express.Router();
const {auth , db , admin} = require("../db");
LoginRouter.use(bodyParser.json());

// Generate and send OTP to the provided phone number

LoginRouter.post('/login', async (req, res) => {
  try {
    const token = jwt.sign({ uid }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = LoginRouter;

