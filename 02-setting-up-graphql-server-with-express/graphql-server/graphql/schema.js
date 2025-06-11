const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Country {
    code: String!
    name: String!
  }

  type Query {
    countries: [Country]   
  } 
`);

module.exports = schema;
