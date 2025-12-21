const fs = require('fs');
const path = require('path');

// Load data from JSON files
const continentsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/continents.json'), 'utf8'));
const countriesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/countries.json'), 'utf8'));
const languagesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/languages.json'), 'utf8'));
const statesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/states.json'), 'utf8'));

/**
 * Class-based resolvers allow nested fields like countryCount 
 * to be resolved as methods on the object.
 */
class Continent {
  constructor(data) {
    Object.assign(this, data);
  }

  // Field Resolver: countryCount
  countryCount() {
    console.log(`Field Resolver: Continent.countryCount - ${this.name}`);
    return this.countries ? this.countries.length : 0;
  }

  // Field Resolver: countries
  countries() {
    console.log(`Field Resolver: Continent.countries - ${this.name}`);
    return this.countries
      .map(c => countriesData.find(cd => cd.code === c.code))
      .filter(Boolean)
      .map(c => new Country(c));
  }
}

class Country {
  constructor(data) {
    Object.assign(this, data);
  }

  // Field Resolver: states
  states() {
    console.log(`Field Resolver: Country.states - ${this.name}`);
    const countryStates = statesData.find(s => s.code === this.code);
    return countryStates ? countryStates.states.map(s => new State(s, this)) : [];
  }

  // Field Resolver: stateCount
  stateCount() {
    console.log(`Field Resolver: Country.stateCount - ${this.name}`);
    const countryStates = statesData.find(s => s.code === this.code);
    return countryStates ? countryStates.states.length : 0;
  }

  // Field Resolver: continent
  continent() {
    console.log(`Field Resolver: Country.continent - ${this.name}`);
    const contData = continentsData.find(cont =>
      cont.countries.some(c => c.code === this.code)
    );
    return contData ? new Continent(contData) : null;
  }
}

class State {
  constructor(data, countryParent) {
    Object.assign(this, data);
    this._country = countryParent;
  }

  // Field Resolver: country
  country() {
    console.log(`Field Resolver: State.country - ${this.name}`);
    if (this._country) return this._country;
    
    const countryData = countriesData.find(c =>
      statesData.find(s => s.states.some(st => st.code === this.code))?.code === c.code
    );
    return countryData ? new Country(countryData) : null;
  }
}

// Define Root Resolvers
const root = {
  continents: () => {
    console.log('Resolver: continents');
    return continentsData.map(c => new Continent(c));
  },

  continent: ({ code }) => {
    console.log(`Resolver: continent - ${code}`);
    const data = continentsData.find(c => c.code === code);
    return data ? new Continent(data) : null;
  },

  countries: () => {
    console.log('Resolver: countries');
    return countriesData.map(c => new Country(c));
  },

  country: ({ code }) => {
    console.log(`Resolver: country - ${code}`);
    const data = countriesData.find(c => c.code === code);
    return data ? new Country(data) : null;
  },

  languages: () => {
    console.log('Resolver: languages');
    return languagesData;
  },

  language: ({ code }) => {
    console.log(`Resolver: language - ${code}`);
    return languagesData.find(l => l.code === code);
  },

  states: ({ countryCode }) => {
    console.log(`Resolver: states - ${countryCode}`);
    const countryStates = statesData.find(s => s.code === countryCode);
    return countryStates ? countryStates.states.map(s => new State(s)) : [];
  },

searchCountries: ({ search }) => {
  console.log(`Resolver: searchCountries - Searching countries with: ${search}`);
  const searchLower = search.toLowerCase();

  return countriesData
    .filter(country => {
      // Check if fields exist before calling toLowerCase()
      const nameMatch = country.name 
        ? country.name.toLowerCase().includes(searchLower) 
        : false;
        
      const capitalMatch = country.capital 
        ? country.capital.toLowerCase().includes(searchLower) 
        : false;

      return nameMatch || capitalMatch;
    })
    .map(c => new Country(c));
}
};

module.exports = root;