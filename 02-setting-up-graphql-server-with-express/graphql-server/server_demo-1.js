const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const fs = require("fs");
const dataFile = "../data/countries.json";

const loadData = () => JSON.parse(fs.readFileSync(dataFile, "utf-8"));

const schema = buildSchema(`
  type Query {
    hello: String
    hello_new: String
    countries: [Country]
  }
    
 type Country {
    code: String!
    name: String!
  }
`);

const root = {
  hello: () => "Hello, GraphQL World!",
  hello_new: () => "Hello, new World!",
  countries: () => loadData()
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("🚀 Server is running at http://localhost:4000/graphql");
});
