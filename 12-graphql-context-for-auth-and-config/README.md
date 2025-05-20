# Episode 12: Schema Stitching and Federation in GraphQL

Welcome to **Episode 12** of the GraphQL Mastery Course! Today, we'll learn how to compose multiple GraphQL services into a unified API using **Schema Stitching** and **Federation**.

---

## 🎯 Goals

- Understand the difference between schema stitching and federation  
- Learn basic setup for schema stitching  
- Overview of Apollo Federation basics  

---

## 🔹 What Is Schema Stitching?

Schema Stitching merges multiple GraphQL schemas into a single schema, enabling you to combine different services.

---

## 🔸 What Is Federation?

Federation is a specification and implementation (by Apollo) to build a distributed graph of multiple microservices that work together as one API.

---

## 📜 Step 1: Schema Stitching Example (Conceptual)

Assuming two schemas:

###  
const userSchema = buildSchema(`
  type User {
    id: ID
    name: String
  }
  
  type Query {
    user(id: ID!): User
  }
`);

const postSchema = buildSchema(`
  type Post {
    id: ID
    title: String
    authorId: ID
  }

  type Query {
    post(id: ID!): Post
  }
`);
###

You can stitch them using tools like `graphql-tools` (outside `buildSchema` capabilities).

---

## ⚙️ Step 2: Basic Federation Setup (Conceptual)

Add federation directives to schemas:

###  
type User @key(fields: "id") {
  id: ID!
  name: String
}

extend type Query {
  user(id: ID!): User
}
###

Federation allows services to reference each other via keys.

---

## 🧠 Summary

- Schema Stitching merges multiple schemas into one  
- Federation creates a distributed graph of services  
- Both help scale GraphQL APIs across microservices  

---

## ▶️ Next Episode

Next, we’ll cover **Security Best Practices in GraphQL**.

➡️ Episode 13: Security Best Practices in GraphQL
