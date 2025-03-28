// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config(); // Load environment variables from .env file

const port = process.env.PORT || 5000;

// Enable CORS to allow requests from your frontend (Vercel)
app.use(cors({
  origin: "https://password-managerr-kbdlehjl9.vercel.app/", // Replace with your Vercel URL
}));

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Password Manager API');
});

// Password API Routes (Example)
app.use('/api/passwords', require('./routes/passwords')); // Modify according to your routes

// Error handling for unknown routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
