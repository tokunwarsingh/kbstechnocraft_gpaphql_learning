# Episode 1: Introduction to GraphQL

## 📌 Overview
In this episode, we introduce GraphQL, an alternative to REST APIs. GraphQL enables clients to request exactly the data they need, making it more efficient and flexible than traditional REST.

## 📚 Topics Covered
- What is GraphQL?
- REST vs GraphQL
- Key GraphQL Concepts:
  - Queries
  - Mutations
  - Subscriptions
  - Schema

## 🧠 What is GraphQL?
GraphQL is a query language for APIs and a runtime for executing those queries with your existing data. It allows clients to define the structure of the data required, and the same structure is returned from the server.

## 🔄 REST vs GraphQL
| REST | GraphQL |
|------|---------|
| Multiple endpoints | Single endpoint |
| Over-fetching or under-fetching | Fetch exactly what you need |
| Fixed response structure | Flexible response structure |

## 🔑 Key Concepts
### Queries
Used to read or fetch values.
```graphql
query {
  user(id: "1") {
    name
    email
  }
}
```

### Mutations
Used to write or post values (create/update/delete).
```graphql
mutation {
  createUser(name: "Alice", email: "alice@example.com") {
    id
    name
  }
}
```

### Subscriptions
Used for real-time updates.
```graphql
subscription {
  userCreated {
    id
    name
  }
}
```

### Schema
The GraphQL schema defines the types and the queries/mutations/subscriptions available in your API.
```graphql
schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
```

## ✅ Summary
GraphQL is a powerful alternative to REST that gives clients more control over the data they receive. With its single-endpoint structure, typed schema, and efficient data-fetching model, GraphQL is well-suited for modern APIs.

## 💡 Exercise
- Compare the network payload of a REST API and a GraphQL query for fetching a user and their posts.
- Try modifying a query to include/exclude certain fields and observe the response.

---

Next: [Episode 2: Setting Up Your First GraphQL Server](./episode-2-setting-up-server.md)