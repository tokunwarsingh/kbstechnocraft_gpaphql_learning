const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const fs = require("fs");
const path = require("path");

// Load countries data
const countries = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/countries.json'), 'utf8'));

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

const root = {
  countries: () => countries,
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("🚀 Server running at http://localhost:4000/graphql");
});