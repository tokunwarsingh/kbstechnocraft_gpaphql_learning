const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Country {
    code: String!
    name: String!
  }

  type Query {
    countries: [Country]
    country(code: String!): Country
  }

  type Mutation {
    addCountry(code: String!, name: String!): Country
    editCountry(code: String!, name: String!): Country
    deleteCountry(code: String!): String
  }
`);

module.exports = schema;
