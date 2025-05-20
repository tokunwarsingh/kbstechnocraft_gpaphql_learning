# Episode 8: Real-time Data with GraphQL Subscriptions

Welcome to **Episode 8** of the GraphQL Mastery Course! Today, we'll learn how to implement **real-time data updates** using GraphQL Subscriptions.

---

## 🎯 Goals

- Understand what subscriptions are  
- Set up a basic subscription server  
- Write a subscription schema and resolver  
- Test real-time updates with subscriptions  

---

## 🔄 What Are Subscriptions?

Subscriptions allow clients to **subscribe** to specific events and get notified immediately when data changes, enabling real-time functionality.

---

## 🛠️ Step 1: Install Required Packages

Subscriptions require WebSocket support. Install:

###  
npm install graphql-ws ws express express-graphql graphql
###

---

## 📜 Step 2: Define Subscription in Schema

Add a subscription type to notify new users added:

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
  }

  type Subscription {
    userCreated: User
  }
`);
###

---

## ⚙️ Step 3: Implement Resolvers and PubSub

Since `graphql` package alone doesn’t support subscriptions, we’ll simulate using `graphql-ws` and a simple event emitter.

###  
const { EventEmitter } = require("events");
const pubsub = new EventEmitter();

const users = [
  { id: "1", name: "Alice", email: "alice@example.com" },
];

const root = {
  users: () => users,

  createUser: ({ name, email }) => {
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
    };
    users.push(newUser);
    pubsub.emit("USER_CREATED", newUser);
    return newUser;
  },

  userCreated: {
    subscribe: (callback) => {
      pubsub.on("USER_CREATED", callback);
    },
  },
};
###

---

## 🛠️ Step 4: Set Up Server with WebSocket

This step requires advanced setup with `graphql-ws` server — outside the scope of simple `express-graphql`.

For demo, use libraries like `apollo-server` or `graphql-yoga` which have built-in subscriptions support.

---

## 🧪 Step 5: Testing Subscriptions

Use GraphQL clients like Apollo Studio, GraphQL Playground, or Insomnia to test subscriptions:

Subscription query example:

###  
subscription {
  userCreated {
    id
    name
    email
  }
}
###

Trigger `createUser` mutation to see real-time updates.

---

## 🧠 Summary

- Subscriptions enable real-time updates  
- Require WebSocket and event system setup  
- More complex than queries/mutations, usually use advanced libraries  

---

## ▶️ Next Episode

Next, we will cover **Error Handling and Validation in GraphQL**.

➡️ Episode 9: Error Handling and Validation in GraphQL
