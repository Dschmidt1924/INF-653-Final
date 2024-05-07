const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
const stateSchema = new Schema({
  // Two character code for the states
  statecode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  // Array for storing fun facts
  funfacts: {
    type: [String],
  },
});

module.exports = mongoose.model('States', stateSchema);
