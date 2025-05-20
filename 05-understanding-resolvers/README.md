# Episode 5: Using Arguments and Variables in Queries

Welcome to **Episode 5** of the GraphQL Mastery Course! Today, we'll learn how to use **arguments** and **variables** in GraphQL queries for more dynamic data fetching.

---

## 🎯 Goals

- Understand how to pass arguments to queries  
- Learn to use variables for safer, reusable queries  
- Implement argument handling in resolvers  

---

## 🔍 Query Arguments

Arguments allow you to filter or customize data in queries.

Example: Fetch a user by ID.

---

## 📜 Step 1: Update Schema to Accept Arguments

Add a `user` query that takes an `id` argument and returns a single User:

###  
const schema = buildSchema(`
  type User {
    id: ID
    name: String
    email: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    updateUserEmail(id: ID!, email: String!): User
  }
`);
###

---

## ⚙️ Step 2: Add Resolver for `user(id: ID!)`

###  
const root = {
  users: () => users,

  user: ({ id }) => users.find(user => user.id === id),

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

## 🧪 Step 3: Test Query with Arguments

Try this query in GraphiQL:

###  
{
  user(id: "1") {
    id
    name
    email
  }
}
###

Expected result:

###  
{
  "data": {
    "user": {
      "id": "1",
      "name": "Alice",
      "email": "alice_new@example.com"
    }
  }
}
###

---

## 💡 Step 4: Using Variables for Queries

Variables make queries reusable and secure.

Example query with variables:

###  
query GetUser($userId: ID!) {
  user(id: $userId) {
    id
    name
    email
  }
}
###

In GraphiQL, provide variables JSON:

###  
{
  "userId": "2"
}
###

---

## 📊 Query Flow with Arguments & Variables

###  
Client
  ├─ Sends query with variables
GraphQL Server
  ├─ Parses query & variables
  ├─ Calls resolver with arguments
  ├─ Returns filtered data
Client
  └─ Receives response data
###

---

## 🧠 Summary

- Arguments allow filtering data in queries  
- Variables make queries reusable and secure  
- Resolvers receive arguments to fetch precise data  

---

## ▶️ Next Episode

We will learn how to use **GraphQL Enums and Custom Scalars**!

➡️ Episode 6: Using Enums and Custom Scalars in GraphQL
