require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;

// Establish MongoDB connection
connectDB();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse url-encoded form data
app.use(express.urlencoded({ extended: false }));

// Middleware to handle JSON data
app.use(express.json());

// Serve static files from the 'public' directory
app.use('/', express.static(path.join(__dirname, '/public')));

// Define routes
app.use('/', require('./routes/root'));
app.use('/states/', require('./routes/api/states'));

// Handle all undefined routes with a 404 response
app.all('*', (req, res) => {
  // Set response status to 404
  res.status(404);
  // Send appropriate response based on request format
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

// Log successful MongoDB connection and start the server
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
