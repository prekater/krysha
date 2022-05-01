const nxPreset = require('@nrwl/jest/preset');
const mongoPreset = require('@shelf/jest-mongodb/jest-preset')

module.exports = { ...nxPreset, ...mongoPreset};
