# Episode 16: GraphQL and REST Integration

Welcome to **Episode 16** of the GraphQL Mastery Course! Today, we’ll learn how to integrate GraphQL APIs with existing REST services.

---

## 🎯 Goals

- Understand why and when to integrate GraphQL with REST  
- Fetch data from REST APIs inside GraphQL resolvers  
- Handle REST API responses and errors in GraphQL  

---

## 🔹 Why Integrate GraphQL with REST?

- Many existing backends expose REST APIs  
- GraphQL can act as a unified layer aggregating multiple REST endpoints  
- Incremental adoption: use GraphQL alongside REST without rewriting everything  

---

## 🛠️ Step 1: Fetch Data from REST API in Resolver

We will use `node-fetch` to call a REST API inside a GraphQL resolver.

### Install node-fetch  
###  
npm install node-fetch
###

---

## ⚙️ Step 2: Sample Resolver Calling REST API

Example: Fetch users from a REST endpoint `https://jsonplaceholder.typicode.com/users`

###  
const fetch = require('node-fetch');

const root = {
  users: async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }
    const users = await response.json();
    return users.map(u => ({
      id: String(u.id),
      name: u.name,
      email: u.email,
    }));
  },
};
###

---

## 📜 Step 3: GraphQL Schema

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

## 🧪 Step 4: Test Query

###  
query {
  users {
    id
    name
    email
  }
}
###

This query will fetch data from the REST API and return it through GraphQL.

---

## 🔍 Handling REST Errors Gracefully

In the resolver, we check the response status and throw errors to propagate them through GraphQL’s error system.

---

## 🧠 Summary

- GraphQL resolvers can fetch data from REST APIs using fetch or any HTTP client  
- This enables gradual migration to GraphQL without rewriting backend services  
- Always handle errors and transform REST data to GraphQL types  

---

## ▶️ Next Episode

Next, we will cover **GraphQL Tooling and Developer Experience**.

➡️ Episode 17: GraphQL Tooling and Developer Experience
