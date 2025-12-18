const fs = require('fs');
const path = require('path');

// Load data from JSON files
const continentsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/continents.json'), 'utf8'));
const countriesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/countries.json'), 'utf8'));
const languagesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/languages.json'), 'utf8'));
const statesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/states.json'), 'utf8'));

// Define resolvers
const root = {
  continents: () => continentsData,
  continent: ({ code }) => continentsData.find(c => c.code === code),
  countries: () => countriesData,
  country: ({ code }) => countriesData.find(c => c.code === code),
  languages: () => languagesData,
  language: ({ code }) => languagesData.find(l => l.code === code),
  states: ({ countryCode }) => {
    const countryStates = statesData.find(s => s.code === countryCode);
    return countryStates ? countryStates.states : [];
  }
};

// Add nested resolvers
root.Continent = {
  countries: (continent) => {
    // Assuming continent.countries is an array of {name, code}
    return continent.countries.map(country => countriesData.find(c => c.code === country.code)).filter(Boolean);
  }
};

root.Country = {
  states: (country) => {
    const countryStates = statesData.find(s => s.code === country.code);
    return countryStates ? countryStates.states : [];
  }
};

module.exports = root;