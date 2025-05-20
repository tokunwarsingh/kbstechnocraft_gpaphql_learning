# Episode 4: Writing Mutations for Data Modification

Welcome to **Episode 4** of the GraphQL Mastery Course! Today we’ll add **mutations** to create and update data.

---

## 🎯 Goals

- Understand what mutations are in GraphQL  
- Define mutation types in schema  
- Implement resolvers to modify in-memory data  

---

## 🔄 What Are Mutations?

Mutations are GraphQL’s way to perform **create**, **update**, or **delete** operations — basically anything that changes data.

---

## 📦 Sample Data (from last episode)

###  
const users = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
];
###

---

## 📜 Step 1: Update Schema for Mutations

Add mutations to create a user and update a user’s email:

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

  type Mutation {
    createUser(name: String!, email: String!): User
    updateUserEmail(id: ID!, email: String!): User
  }
`);
###

---

## ⚙️ Step 2: Implement Mutation Resolvers

###  
const root = {
  users: () => users,

  createUser: ({ name, email }) => {
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
    };
    users.push(newUser);
    return newUser;
  },

  updateUserEmail: ({ id, email }) => {
    const user = users.find((u) => u.id === id);
    if (!user) {
      throw new Error("User not found");
    }
    user.email = email;
    return user;
  },
};
###

---

## 🔄 Step 3: Complete Server Code (`index.js`)

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

  type Mutation {
    createUser(name: String!, email: String!): User
    updateUserEmail(id: ID!, email: String!): User
  }
`);

const root = {
  users: () => users,

  createUser: ({ name, email }) => {
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
    };
    users.push(newUser);
    return newUser;
  },

  updateUserEmail: ({ id, email }) => {
    const user = users.find((u) => u.id === id);
    if (!user) {
      throw new Error("User not found");
    }
    user.email = email;
    return user;
  },
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

## 🧪 Step 4: Test Mutations

Open GraphiQL at http://localhost:4000/graphql

### Create a User

###  
mutation {
  createUser(name: "Charlie", email: "charlie@example.com") {
    id
    name
    email
  }
}
###

### Update User Email

###  
mutation {
  updateUserEmail(id: "1", email: "alice_new@example.com") {
    id
    name
    email
  }
}
###

---

## 📊 Mutation Flow Diagram

###  
Client
  ↓ mutation request
GraphQL Server
  ↓ calls mutation resolver
Data Store (in-memory array)
  ↑ returns updated data
GraphQL Server
  ↑ returns mutation response
Client
###

---

## 🧠 Summary

- Added mutations for creating and updating users  
- Mutations accept arguments and return modified objects  
- Mutations are key to modifying server data  

---

## ▶️ Next Episode

We’ll explore **query arguments and variables** for dynamic queries!

➡️ Episode 5: Using Arguments and Variables in Queries
