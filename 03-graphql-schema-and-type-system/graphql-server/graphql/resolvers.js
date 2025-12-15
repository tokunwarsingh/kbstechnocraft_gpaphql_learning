const fs = require("fs");
const path = require("path");

// Load countries data from the root data folder
const countries = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/countries.json'), 'utf8'));

const resolvers = {
  countries: () => countries
};

module.exports = resolvers;