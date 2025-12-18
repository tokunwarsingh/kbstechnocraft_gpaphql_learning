const { buildSchema } = require('graphql');

// Define GraphQL schema
const schema = buildSchema(`
  type Continent {
    code: String
    name: String
    countries: [Country]
    countryCount: Int
  }

  type Country {
    code: String
    name: String
    capital: String
    currency: String
    phone: String
    states: [State]
    stateCount: Int
    continent: Continent
  }

  type Language {
    code: String
    name: String
    native: String
    rtl: Boolean
  }

  type State {
    code: String
    name: String
    country: Country
  }

  type Query {
    continents: [Continent]
    continent(code: String!): Continent
    countries: [Country]
    country(code: String!): Country
    languages: [Language]
    language(code: String!): Language
    states(countryCode: String!): [State]
    searchCountries(search: String!): [Country]
  }
`);

module.exports = schema;