const mongoose = require('mongoose');

// Define Schema for States collection
const stateSchema = new mongoose.Schema({
  stateCode: {
    type: String,
    required: true,
    unique: true
  },
  funFacts: [{
    type: String
  }]
});

// Create and export States model
const States = mongoose.model('States', stateSchema);
module.exports = States;