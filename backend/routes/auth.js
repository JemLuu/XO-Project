const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const router = express.Router();
require('dotenv').config();

// Signup Route
router.post('/signup', (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  if (!email || !firstName || !lastName || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if email already exists
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    if (user) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password and insert new user
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Hashing error:', err);
        return res.status(500).json({ error: 'Server error' });
      }

      db.run(
        'INSERT INTO users (email, firstName, lastName, password) VALUES (?, ?, ?, ?)',
        [email, firstName, lastName, hashedPassword],
        function (err) {
          if (err) {
            console.error('Insert error:', err);
            return res.status(500).json({ error: 'Server error' });
          }

          const token = jwt.sign({ userId: this.lastID }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.status(201).json({ token, message: 'Account created successfully!' });
        }
      );
    });
  });
});

// Login Route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Hash comparison error:', err);
        return res.status(500).json({ error: 'Server error' });
      }
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

// Get Name Route
router.get('/name', (req, res) => {
  console.log("Received request for /name route");
  const { email } = req.query;

  if (!email) {
    console.log("Email is missing in the request");
    return res.status(400).json({ error: 'Email is required' });
  }

  console.log(`Looking up user with email: ${email}`);
  db.get('SELECT firstName, lastName FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: 'User not found' });
    }

    console.log(`User found: ${user.firstName} ${user.lastName}`);
    return res.status(200).json({ firstName: user.firstName, lastName: user.lastName });
  });
});

module.exports = router;