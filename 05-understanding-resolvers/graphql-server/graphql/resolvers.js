const fs = require('fs');
const path = require('path');

// Load data from JSON files
const continentsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/continents.json'), 'utf8'));
const countriesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/countries.json'), 'utf8'));
const languagesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/languages.json'), 'utf8'));
const statesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/states.json'), 'utf8'));

// Define resolvers
const root = {
  // Root Query Resolvers
  continents: () => {
    console.log('Resolver: continents - Returning all continents');
    return continentsData;
  },

  continent: ({ code }) => {
    console.log(`Resolver: continent - Finding continent with code: ${code}`);
    return continentsData.find(c => c.code === code);
  },

  countries: () => {
    console.log('Resolver: countries - Returning all countries');
    return countriesData;
  },

  country: ({ code }) => {
    console.log(`Resolver: country - Finding country with code: ${code}`);
    return countriesData.find(c => c.code === code);
  },

  languages: () => {
    console.log('Resolver: languages - Returning all languages');
    return languagesData;
  },

  language: ({ code }) => {
    console.log(`Resolver: language - Finding language with code: ${code}`);
    return languagesData.find(l => l.code === code);
  },

  states: ({ countryCode }) => {
    console.log(`Resolver: states - Finding states for country: ${countryCode}`);
    const countryStates = statesData.find(s => s.code === countryCode);
    return countryStates ? countryStates.states : [];
  },

  searchCountries: ({ search }) => {
    console.log(`Resolver: searchCountries - Searching countries with: ${search}`);
    return countriesData.filter(country =>
      country.name.toLowerCase().includes(search.toLowerCase()) ||
      country.capital.toLowerCase().includes(search.toLowerCase())
    );
  }
};

// Field Resolvers for nested data
root.Continent = {
  // Resolver for countries field on Continent type
  countries: (continent) => {
    console.log(`Field Resolver: Continent.countries - Resolving countries for ${continent.name}`);
    return continent.countries.map(country => countriesData.find(c => c.code === country.code)).filter(Boolean);
  },

  // Computed field resolver
  countryCount: (continent) => {
    console.log(`Field Resolver: Continent.countryCount - Counting countries for ${continent.name}`);
    return continent.countries.length;
  }
};

root.Country = {
  // Resolver for states field on Country type
  states: (country) => {
    console.log(`Field Resolver: Country.states - Resolving states for ${country.name}`);
    const countryStates = statesData.find(s => s.code === country.code);
    return countryStates ? countryStates.states : [];
  },

  // Computed field resolver
  stateCount: (country) => {
    console.log(`Field Resolver: Country.stateCount - Counting states for ${country.name}`);
    const countryStates = statesData.find(s => s.code === country.code);
    return countryStates ? countryStates.states.length : 0;
  },

  // Resolver for continent field (reverse relationship)
  continent: (country) => {
    console.log(`Field Resolver: Country.continent - Finding continent for ${country.name}`);
    return continentsData.find(cont =>
      cont.countries.some(c => c.code === country.code)
    );
  }
};

root.State = {
  // Resolver for country field on State type
  country: (state, args, context, info) => {
    console.log(`Field Resolver: State.country - Finding country for state ${state.name}`);
    // Get country code from parent (states are grouped by country)
    const countryCode = info.path.prev.prev.key; // This is a simplified example
    return countriesData.find(c => c.code === countryCode);
  }
};

module.exports = root;