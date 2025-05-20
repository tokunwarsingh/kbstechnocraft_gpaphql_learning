# Episode 3: Building Your First Schema with Custom Types

Welcome to **Episode 3** of the GraphQL Mastery Course! Today, we’ll create custom types in your GraphQL schema and write resolvers to fetch data.

---

## 🎯 Goals

- Define custom object types in GraphQL schema  
- Add queries returning custom types  
- Implement resolvers to return actual data  

---

## 📦 Sample Data

Let’s start with a simple list of users in memory:

###  
const users = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
];
###

---

## 📜 Step 1: Update Schema with a User Type

Modify your schema to add a `User` type and a query to get all users:

###  
const schema = buildSchema(`
  type User {
    id: ID
    name: String
    email: String
  }

  type Query {
    users: [User]
  }
`);
###

---

## ⚙️ Step 2: Add Resolver for `users`

Implement resolver to return the users array:

###  
const root = {
  users: () => users,
};
###

---

## 🔄 Step 3: Complete Server Code (index.js)

###  
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const users = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
];

const schema = buildSchema(`
  type User {
    id: ID
    name: String
    email: String
  }

  type Query {
    users: [User]
  }
`);

const root = {
  users: () => users,
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
###

---

## 🧪 Step 4: Test Query

Run your server:

###  
node index.js
###

Open http://localhost:4000/graphql and run:

###  
{
  users {
    id
    name
    email
  }
}
###

Expected response:

###  
{
  "data": {
    "users": [
      {
        "id": "1",
        "name": "Alice",
        "email": "alice@example.com"
      },
      {
        "id": "2",
        "name": "Bob",
        "email": "bob@example.com"
      }
    ]
  }
}
###

---

## 📊 Schema Diagram

###  
Query
 └─ users: [User]

User
 ├─ id: ID
 ├─ name: String
 └─ email: String
###

---

## 🧠 Summary

- Created a `User` type with fields `id`, `name`, and `email`.  
- Added a `users` query returning a list of users.  
- Wrote a resolver to return in-memory data.  

---

## ▶️ Next Episode

We’ll learn **how to add mutations** to create and update users!

➡️ Episode 4: Writing Mutations for Data Modification
