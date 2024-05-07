const State = require('../model/States');
const statesJson = require('../statesData.json');

/*
  Retrieve a random fun fact for a specified state.
  Expects:
    - req.params.state: Valid two-character uppercase state code
    - statesJson: Reference to statesData.json
*/
const getRandomFact = async (req, res) => {
  const state = await State.findOne({ statecode: req.params.state });
  const facts = state?.funfacts;

  if (!facts || facts.length === 0) {
    const stateName = statesJson.find((state) => state.code === req.params.state).state;
    res.json({ message: `No Fun Facts found for ${stateName}` });
  } else {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    res.json({ funfact: randomFact });
  }
};

/*
  Add new fun facts for a state or update existing ones.
  Expects:
    - req.params.state: State code
    - req.body.funfacts: Array of fun facts
*/
const createFact = async (req, res) => {
  if (!req?.body?.funfacts) {
    return res.status(400).json({ message: 'State fun facts value required' });
  }
  if (!Array.isArray(req.body.funfacts)) {
    return res.status(400).json({ message: 'State fun facts value must be an array' });
  }

  const state = await State.findOne({ statecode: req.params.state }).exec();

  if (state) {
    state.funfacts.push(...req.body.funfacts);
    const result = await state.save();
    res.json(result);
  } else {
    try {
      const result = await State.create({
        statecode: req.params.state,
        funfacts: [...req.body.funfacts],
      });
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
    }
  }
};

/*
  Update an existing fun fact for a state.
  Expects:
    - req.params.state: State code
    - req.body.index: Index of the fun fact to modify
    - req.body.funfact: Updated fun fact content
*/
const modifyFact = async (req, res) => {
  const stateCode = req?.params?.state;
  const index = req?.body?.index;
  const funfact = req?.body?.funfact;

  if (!index || !funfact) {
    return res.status(400).json({ message: 'State fun fact index and value required' });
  }

  const state = await State.findOne({ statecode: stateCode }).exec();

  if (!state || !state.funfacts[index - 1]) {
    const stateName = statesJson.find((state) => state.code === stateCode).state;
    res.json({ message: `No Fun Fact found for ${stateName}` });
  } else {
    state.funfacts[index - 1] = funfact;
    const result = await state.save();
    res.json(result);
  }
};

/*
  Delete a specific fun fact for a state.
  Expects:
    - req.params.state: State code
    - req.body.index: Index of the fun fact to delete
*/
const deleteFact = async (req, res) => {
  const stateCode = req?.params?.state;
  const index = req?.body?.index;

  if (!index) {
    return res.status(400).json({ message: 'State fun fact index value required' });
  }

  const state = await State.findOne({ statecode: stateCode }).exec();

  if (!state || !state.funfacts[index - 1]) {
    const stateName = statesJson.find((state) => state.code === stateCode).state;
    res.json({ message: `No Fun Fact found for ${stateName}` });
  } else {
    state.funfacts.splice(index - 1, 1);
    const result = await state.save();
    res.json(result);
  }
};

module.exports = {
  getRandomFact,
  createFact,
  modifyFact,
  deleteFact,
};
