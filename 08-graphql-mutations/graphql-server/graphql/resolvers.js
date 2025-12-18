const fs = require('fs');
const path = require('path');

// Load data from JSON files
let continentsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/continents.json'), 'utf8'));
let countriesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/countries.json'), 'utf8'));
let languagesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/languages.json'), 'utf8'));
let statesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/states.json'), 'utf8'));

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
  },

  // Mutation Resolvers
  createCountry: ({ input }) => {
    console.log(`Mutation: createCountry - Creating country: ${input.name}`);
    const newCountry = {
      code: input.code,
      name: input.name,
      capital: input.capital,
      currency: input.currency,
      phone: input.phone
    };
    countriesData.push(newCountry);
    return newCountry;
  },

  updateCountry: ({ code, input }) => {
    console.log(`Mutation: updateCountry - Updating country: ${code}`);
    const countryIndex = countriesData.findIndex(c => c.code === code);
    if (countryIndex === -1) {
      throw new Error(`Country with code ${code} not found`);
    }
    countriesData[countryIndex] = {
      ...countriesData[countryIndex],
      ...input
    };
    return countriesData[countryIndex];
  },

  deleteCountry: ({ code }) => {
    console.log(`Mutation: deleteCountry - Deleting country: ${code}`);
    const countryIndex = countriesData.findIndex(c => c.code === code);
    if (countryIndex === -1) {
      throw new Error(`Country with code ${code} not found`);
    }
    countriesData.splice(countryIndex, 1);
    return true;
  },

  createContinent: ({ input }) => {
    console.log(`Mutation: createContinent - Creating continent: ${input.name}`);
    const newContinent = {
      code: input.code,
      name: input.name,
      countries: []
    };
    continentsData.push(newContinent);
    return newContinent;
  },

  updateContinent: ({ code, input }) => {
    console.log(`Mutation: updateContinent - Updating continent: ${code}`);
    const continentIndex = continentsData.findIndex(c => c.code === code);
    if (continentIndex === -1) {
      throw new Error(`Continent with code ${code} not found`);
    }
    continentsData[continentIndex] = {
      ...continentsData[continentIndex],
      ...input
    };
    return continentsData[continentIndex];
  },

  deleteContinent: ({ code }) => {
    console.log(`Mutation: deleteContinent - Deleting continent: ${code}`);
    const continentIndex = continentsData.findIndex(c => c.code === code);
    if (continentIndex === -1) {
      throw new Error(`Continent with code ${code} not found`);
    }
    continentsData.splice(continentIndex, 1);
    return true;
  },

  createState: ({ input }) => {
    console.log(`Mutation: createState - Creating state: ${input.name} for country: ${input.countryCode}`);
    const countryStates = statesData.find(s => s.code === input.countryCode);
    if (!countryStates) {
      throw new Error(`Country with code ${input.countryCode} not found`);
    }
    const newState = {
      code: input.code,
      name: input.name
    };
    countryStates.states.push(newState);
    return newState;
  },

  updateState: ({ countryCode, code, name }) => {
    console.log(`Mutation: updateState - Updating state: ${code} for country: ${countryCode}`);
    const countryStates = statesData.find(s => s.code === countryCode);
    if (!countryStates) {
      throw new Error(`Country with code ${countryCode} not found`);
    }
    const stateIndex = countryStates.states.findIndex(s => s.code === code);
    if (stateIndex === -1) {
      throw new Error(`State with code ${code} not found in country ${countryCode}`);
    }
    countryStates.states[stateIndex].name = name;
    return countryStates.states[stateIndex];
  },

  deleteState: ({ countryCode, code }) => {
    console.log(`Mutation: deleteState - Deleting state: ${code} from country: ${countryCode}`);
    const countryStates = statesData.find(s => s.code === countryCode);
    if (!countryStates) {
      throw new Error(`Country with code ${countryCode} not found`);
    }
    const stateIndex = countryStates.states.findIndex(s => s.code === code);
    if (stateIndex === -1) {
      throw new Error(`State with code ${code} not found in country ${countryCode}`);
    }
    countryStates.states.splice(stateIndex, 1);
    return true;
  }
};

// Field Resolvers for nested data
root.Continent = {
  countries: (continent) => {
    console.log(`Field Resolver: Continent.countries - Resolving countries for ${continent.name}`);
    return continent.countries.map(country => countriesData.find(c => c.code === country.code)).filter(Boolean);
  },

  countryCount: (continent) => {
    console.log(`Field Resolver: Continent.countryCount - Counting countries for ${continent.name}`);
    return continent.countries.length;
  }
};

root.Country = {
  states: (country) => {
    console.log(`Field Resolver: Country.states - Resolving states for ${country.name}`);
    const countryStates = statesData.find(s => s.code === country.code);
    return countryStates ? countryStates.states : [];
  },

  stateCount: (country) => {
    console.log(`Field Resolver: Country.stateCount - Counting states for ${country.name}`);
    const countryStates = statesData.find(s => s.code === country.code);
    return countryStates ? countryStates.states.length : 0;
  },

  continent: (country) => {
    console.log(`Field Resolver: Country.continent - Finding continent for ${country.name}`);
    return continentsData.find(cont =>
      cont.countries.some(c => c.code === country.code)
    );
  }
};

root.State = {
  country: (state, args, context, info) => {
    console.log(`Field Resolver: State.country - Finding country for state ${state.name}`);
    const countryCode = info.path.prev.prev.key;
    return countriesData.find(c => c.code === countryCode);
  }
};

module.exports = root;