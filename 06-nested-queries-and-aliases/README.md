# Episode 6: Using Enums and Custom Scalars in GraphQL

Welcome to **Episode 6** of the GraphQL Mastery Course! Today, we’ll explore how to use **Enums** and **Custom Scalars** to extend the power of your schema.

---

## 🎯 Goals

- Understand what Enums and Scalars are  
- Define and use Enums in your schema  
- Create custom scalar types for specialized data  

---

## 🔹 What Are Enums?

Enums are a special scalar type that limits a field to a fixed set of values.

Example: A `Role` enum with possible values: `ADMIN`, `USER`, `GUEST`.

---

## 📜 Step 1: Define Enum in Schema

Update schema to include a `Role` enum and assign a role to users:

###  
const schema = buildSchema(`
  enum Role {
    ADMIN
    USER
    GUEST
  }

  type User {
    id: ID
    name: String
    email: String
    role: Role
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!, role: Role!): User
    updateUserEmail(id: ID!, email: String!): User
  }
`);
###

---

## ⚙️ Step 2: Update Sample Data and Resolvers

Add `role` to users and update `createUser` resolver to accept role:

###  
const users = [
  { id: "1", name: "Alice", email: "alice@example.com", role: "ADMIN" },
  { id: "2", name: "Bob", email: "bob@example.com", role: "USER" },
];

const root = {
  users: () => users,

  user: ({ id }) => users.find(user => user.id
