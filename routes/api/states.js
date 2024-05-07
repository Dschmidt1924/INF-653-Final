const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');
const funfactsController = require('../../controllers/funfactsController');
const verifyState = require('../../middleware/verifyState');

// Retrieve data for all states
router.route('/').get(statesController.getAllStates);

// Retrieve all data for a specific state
router.route('/:state').get(verifyState, statesController.getState);

// Retrieve state name and capital city
router.route('/:state/capital').get(verifyState, statesController.getStateCapital);

// Retrieve state name and nickname
router.route('/:state/nickname').get(verifyState, statesController.getStateNickname);

// Retrieve state name and population
router.route('/:state/population').get(verifyState, statesController.getStatePopulation);

// Retrieve state name and admission date
router.route('/:state/admission').get(verifyState, statesController.getStateAdmission);

// State fun facts operations
router
  .route('/:state/funfact')
  .get(verifyState, funfactsController.getRandomFact) // Get a random fact
  .post(verifyState, funfactsController.createFact)   // Add a new fact
  .patch(verifyState, funfactsController.modifyFact)  // Update an existing fact
  .delete(verifyState, funfactsController.deleteFact); // Delete a fact

module.exports = router;