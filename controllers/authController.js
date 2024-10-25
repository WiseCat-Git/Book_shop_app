const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let users = [];

const register = async (req, res) => {
  console.log("Register endpoint hit"); // Log to confirm endpoint is accessed
  
  const { username, password } = req.body;
  
  try {
    // Log request body to verify received data
    console.log("Received data:", { username, password });
    
    // Check if username and password are provided
    if (!username || !password) {
      console.log("Username or password missing");
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if the username already exists
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
      console.log("Username already exists");
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password and save the user
    const hashedPassword = await bcrypt.hash(password, 8); // Ensure password and rounds are correctly passed
    console.log("Password hashed successfully");
    
    users.push({ username, password: hashedPassword });
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Error in register function:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Find the user by username
    const user = users.find(u => u.username === username);
    
    // If user is found, check password
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error("Error in login function:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login };
