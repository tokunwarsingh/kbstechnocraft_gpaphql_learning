const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

// Sample JSON Data
const countryData = [
  { code: "IN", name: "India", languages: ["Hindi", "English"], states: ["Karnataka", "Maharashtra"] },
  { code: "US", name: "United States", languages: ["English", "Spanish"], states: ["California", "Texas"] }
];

// Define GraphQL Schema
const typeDefs = gql`
  type Country {
    code: String!
    name: String!
    languages: [String!]!
    states: [String!]!
  }

  type Query {
    country(code: String!): Country
  }
`;

// Define Resolvers
const resolvers = {
  Query: {
    country: (_, { code }) => countryData.find(country => country.code === code)
  }
};

// Set up Apollo Server
async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => console.log("🚀 Server running at http://localhost:4000/graphql"));
}

startServer();
