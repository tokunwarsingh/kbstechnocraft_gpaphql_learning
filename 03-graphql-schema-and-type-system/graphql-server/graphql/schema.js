const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Country {
    code: ID
    name: String
    capital: String
    currency: String
    phone: String
  }

  type Query {
    countries: [Country]
  }
`);

module.exports = schema;