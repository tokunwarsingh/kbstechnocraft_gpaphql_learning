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

   input CountryInput {
    code: String!
    name: String!
    capital: String!
    currency: String!
    phone: String!
  }

   input ContinentInput {
    code: String!
    name: String!
  }

  input StateInput {
    code: String!
    name: String!
    countryCode: String!
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
  type Mutation {
    createCountry(input: CountryInput!): Country
    updateCountry(code: String!, input: CountryInput!): Country
    deleteCountry(code: String!): Boolean

    createContinent(input: ContinentInput!): Continent
    updateContinent(code: String!, input: ContinentInput!): Continent
    deleteContinent(code: String!): Boolean

    createState(input: StateInput!): State
    updateState(countryCode: String!, code: String!, name: String!): State
    deleteState(countryCode: String!, code: String!): Boolean
}
type Subscription {
    countryAdded: Country
  }
   
`);

module.exports = schema;