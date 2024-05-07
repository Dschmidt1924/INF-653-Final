const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  stateCode: {
    type: String,
    required: true,
    unique: true,
  },
  funfacts: {
    type: String,
  },
});

const States = mongoose.model('States', stateSchema);
module.exports = States;

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    },
    stateCode: {
        type: String,
        required: true
    },
    funfacts: {
        type: String,
        required: true
    }
})

const kansasData = new Model({
    name: 'Kansas Data',
    stateCode: 'KS',
    funfacts: ['Known for the Wizard of Oz.', 'FHSU is the best school in the entire state', 'Most famous person is named Dorothy']
});

kansasData.save();

const missouriData = new Model({
    name: 'Missouri Data',
    stateCode: 'MO',
    funfacts: ['Official nickname is show-me.', 'First parachute jump out of an airplane happened here.', 'Mark Twain was born here.']
});

missouriData.save();

const oklahomaData = new Model({
    name: 'Oklahoma Data',
    stateCode: 'OK',
    funfacts: ['Is literally "OK", so do not worry.', 'Has the largest Native American population in the United States.', 'Has the largest US Western art collection.']
});

oklahomaData.save();

const nebraskaData = new Model({
    name: 'Nebraska Data',
    stateCode: 'NE',
    funfacts: ['Kool Aid was invented here.', 'Was a major part of the Oregon Trail.', 'Has the largest hand-planted forest.']
});

nebraskaData.save();

const coloradoData = new Model({
    name: 'Colorado Data',
    stateCode: 'CO',
    funfacts: ['Excellent ski spots.', 'One of the first states to legalize marijuana.', 'Turned down hosting a Winter Olympics one time.']
});

coloradoData.save();


