const statesJson = require('../statesData.json');

// Used to verify that a valid state code has been passed as a url parameter 

const verifyState = (req, res, next) => {
  // Extract and uppercase the state code for clarity
  const stateCode = req?.params?.state?.toUpperCase();

  // Check that a state code was provided
  if (!stateCode) {
    return res.status(400).json({ message: 'State abbreviation required' });
  }

  // Retrieve an array of all valid state codes
  const validStateCodes = statesJson.map((state) => state.code);

  // Validate the given state code
  if (validStateCodes.indexOf(stateCode) !== -1) {
    // Attach the capitalized state code back to the request and proceed
    req.params.state = stateCode;
    next();
  } else {
    // Handle case where the state code provided is invalid
    res.status(400).json({ message: 'Invalid state abbreviation parameter' });
  }
};

module.exports = verifyState;
