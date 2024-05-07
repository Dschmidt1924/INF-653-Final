const State = require('../model/States');
const statesJson = require('../statesData.json');

// Retrieve data for all states based on optional 'contig' query parameter
const getAllStates = async (req, res) => {
  let stJson, dbJson; // Holds data from JSON file and database

  // Check 'contig' option to filter states
  if (req?.query?.contig == 'true') {
    // Filter out AK and HI if 'contig' is true
    stJson = statesJson.filter(
      (state) => state.code !== 'AK' && state.code !== 'HI'
    );
    dbJson = await State.find();
  } else if (req?.query?.contig == 'false') {
    // Return only AK and HI if 'contig' is false
    stJson = statesJson.filter(
      (state) => state.code === 'AK' || state.code === 'HI'
    );
    dbJson = await State.find();
  } else {
    // Return all states if 'contig' not specified
    stJson = JSON.parse(JSON.stringify(statesJson));
    dbJson = await State.find();
  }

  const states = joinStatesWithFunFacts(stJson, dbJson);

  // Check if any data was found
  if (!states) {
    return res.status(204).json({ message: 'No states found.' });
  }

  // Return the data as JSON
  res.json(states);
};

// Retrieve data for a single state
const getState = async (req, res) => {
  // Find state and its fun facts
  const state = statesJson.find((state) => state.code === req.params.state);
  const dbJson = await State.find({ statecode: req.params.state });
  const result = joinStatesWithFunFacts([state], dbJson);

  // Respond with JSON (first element for single state)
  res.json(result[0]);
};

// Retrieve capital of a given state
const getStateCapital = (req, res) => {
  // Find state and its capital
  const state = statesJson.find((state) => state.code === req.params.state);

  // Return state name and capital only
  res.json({
    state: state.state,
    capital: state.capital_city,
  });
};

// Retrieve nickname of a given state
const getStateNickname = (req, res) => {
  // Find state and its nickname
  const state = statesJson.find((state) => state.code === req.params.state);

  // Return state name and nickname only
  res.json({
    state: state.state,
    nickname: state.nickname,
  });
};

// Retrieve population of a given state
const getStatePopulation = (req, res) => {
  // Find state and its population
  const state = statesJson.find((state) => state.code === req.params.state);

  // Return state name and population only
  res.json({
    state: state.state,
    population: state.population.toLocaleString(),
  });
};

// Retrieve admission date of a given state
const getStateAdmission = (req, res) => {
  // Find state and its admission date
  const state = statesJson.find((state) => state.code === req.params.state);

  // Return state name and admission date only
  res.json({
    state: state.state,
    admitted: state.admission_date,
  });
};

// Export all functions
module.exports = {
  getAllStates,
  getState,
  getStateCapital,
  getStateNickname,
  getStatePopulation,
  getStateAdmission,
};

// Join state data with fun facts from the database
const joinStatesWithFunFacts = (statesJson, dbJson) => {
  return statesJson.map((stateJson) => {
    const stateCode = stateJson.code; // Get state code
    let result = { ...stateJson }; // Deep copy JSON to avoid modifying cached data

    // Find matching fun facts in dbJson, if any
    const facts = dbJson.find((state) => state.statecode === stateCode);

    // Add fun facts to stateJson if found
    if (facts?.funfacts?.length > 0 && facts.funfacts !== []) {
      result.funfacts = facts.funfacts;
    }

    return result; // Return the result
  });
};