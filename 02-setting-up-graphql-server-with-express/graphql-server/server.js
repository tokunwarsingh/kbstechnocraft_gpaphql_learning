const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");

const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const app = express();
app.use(cors());

app.use("/graphql", graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true
}));

app.listen(4000, () => console.log("🚀 GraphQL Server running at http://localhost:4000/graphql"));
