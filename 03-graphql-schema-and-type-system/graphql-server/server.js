const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const path = require("path");

// Import schema and resolvers
const schema = require("./graphql/schema");
const root = require("./graphql/resolvers");

const app = express();

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

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