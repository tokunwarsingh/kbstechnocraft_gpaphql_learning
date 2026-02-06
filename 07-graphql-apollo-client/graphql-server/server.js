const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const path = require('path');
const schema = require('./graphql/schema');
const root = require('./graphql/resolvers');

// Create Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable GraphiQL interface
}));

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`GraphQL server running at http://localhost:${PORT}/graphql`);
  console.log(`Mutation examples available at http://localhost:${PORT}`);
});