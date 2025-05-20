# Episode 7: Using Interfaces and Unions in GraphQL

Welcome to **Episode 7** of the GraphQL Mastery Course! Today, we’ll explore **Interfaces** and **Unions**, powerful tools to model complex and flexible data types.

---

## 🎯 Goals

- Understand what Interfaces and Unions are  
- Define and use Interfaces in GraphQL schema  
- Define and use Union types for multiple return types  

---

## 🔹 What Are Interfaces?

Interfaces define a set of fields that multiple types must implement. They allow querying for fields common across different types.

---

## 🔸 What Are Unions?

Unions represent a field that can return one of several different object types but without common fields requirement.

---

## 📜 Step 1: Define Interface and Types

Example: We want a `SearchResult` interface implemented by `User` and `Post` types.

###  
const schema = buildSchema(`
  interface SearchResult {
    id: ID
  }

  type User implements SearchResult {
    id: ID
    name: String
    email: String
  }

  type Post implements SearchResult {
    id: ID
    title: String
    content: String
  }

  union SearchUnion = User | Post

  type Query {
    searchInterface(term: String!): [SearchResult]
    searchUnion(term: String!): [SearchUnion]
  }
`);
###

---

## ⚙️ Step 2: Sample Data

###  
const users = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
];

const posts = [
  { id: "a", title: "GraphQL Intro", content: "Learn GraphQL basics." },
  { id: "b", title: "Advanced GraphQL", content: "Deep dive into GraphQL." },
];
###

---

## ⚙️ Step 3: Implement Resolvers

For `buildSchema` we must return concrete types with `__typename` to support interfaces/unions:

###  
const root = {
  searchInterface: ({ term }) => {
    const userResults = users.filter(u => u.name.includes(term));
    const postResults = posts.filter(p => p.title.includes(term));
    return [...userResults, ...postResults].map(item => ({
      ...item,
      __typename: item.name ? "User" : "Post",
    }));
  },

  searchUnion: ({ term }) => {
    const userResults = users.filter(u => u.name.includes(term));
    const postResults = posts.filter(p => p.title.includes(term));
    return [...userResults, ...postResults].map(item => ({
      ...item,
      __typename: item.name ? "User" : "Post",
    }));
  },
};
###

---

## 🧪 Step 4: Test Queries

### Search with Interface

###  
{
  searchInterface(term: "A") {
    id
    ... on User {
      name
      email
    }
    ... on Post {
      title
      content
    }
  }
}
###

### Search with Union

###  
{
  searchUnion(term: "GraphQL") {
    ... on User {
      id
      name
      email
    }
    ... on Post {
      id
      title
      content
    }
  }
}
###

---

## 📊 Diagram: Interfaces vs Unions

###  
SearchResult (Interface)
  ├─ User
  └─ Post

SearchUnion (Union)
  ├─ User
  └─ Post
###

---

## 🧠 Summary

- Interfaces enforce shared fields across types  
- Unions allow returning different types without shared fields  
- Both enable flexible and powerful schema design  

---

## ▶️ Next Episode

Next, we will dive into **GraphQL Subscriptions for real-time data**!

➡️ Episode 8: Real-time Data with GraphQL Subscriptions
