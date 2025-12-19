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
  },

  // --- ADDED SEARCH RESOLVER ---
  search: ({ keyword }) => {
    const k = keyword.toLowerCase();
    const results = [];

    // 1. Search Countries
    countriesData
      .filter(c => c.name.toLowerCase().includes(k))
      .forEach(c => results.push({ ...c, __typename: 'Country' }));

    // 2. Search Languages
    languagesData
      .filter(l => l.name.toLowerCase().includes(k))
      .forEach(l => results.push({ ...l, __typename: 'Language' }));

    // 3. Search States (Flatten the states array first)
    statesData
      .flatMap(s => s.states)
      .filter(st => st.name.toLowerCase().includes(k))
      .forEach(st => results.push({ ...st, __typename: 'State' }));

    return results;
  }
};

// Add nested resolvers
root.Continent = {
  countries: (continent) => {
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