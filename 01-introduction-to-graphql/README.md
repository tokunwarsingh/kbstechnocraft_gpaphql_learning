# Episode 1: Introduction to GraphQL

Welcome to **Episode 1** of the GraphQL Mastery Course. In this blog, you'll learn the *what*, *why*, and *how* of GraphQL.

---

## 🧠 What is GraphQL?

GraphQL is a **query language for APIs** and a **runtime for executing those queries** with your existing data.

It was developed by Facebook and open-sourced in 2015. Unlike REST, which exposes multiple endpoints, GraphQL exposes a **single endpoint** that returns exactly the data you need.

---

## 🔄 GraphQL vs REST

| Feature        | REST                         | GraphQL                        |
|----------------|------------------------------|--------------------------------|
| **Endpoints**  | Multiple per resource         | Single endpoint                |
| **Data Fetch** | Over-fetching/Under-fetching | Precise data fetching          |
| **Versioning** | Requires versions (v1, v2)    | Version-less schema evolution  |

---

## ✅ Why Use GraphQL?

- Get **exactly** what you need — nothing more, nothing less  
- Reduced network usage  
- Great for **mobile and frontend apps**  
- **Strongly typed** schema  
- Developer-friendly tools (e.g., GraphQL Playground)  

---

## 💡 Sample Query

```
query {
  user(id: "101") {
    id
    name
    email
  }
}
```

### Sample Response

```
{
  "data": {
    "user": {
      "id": "101",
      "name": "Alice",
      "email": "alice@example.com"
    }
  }
}
```

Notice how the response exactly matches the shape of the query.

---

## 🧰 Basic Components of GraphQL

1. **Schema** – Defines types and relationships  
2. **Queries** – Read operations  
3. **Mutations** – Write operations (create, update, delete)  
4. **Resolvers** – Functions to fetch the actual data  

---

## 📊 Architecture Diagram

---
+-------------+        +------------------+        +------------------+
|   Client    | <----> |  GraphQL Server  | <----> |  Data Sources     |
| (Frontend)  |        |  (Apollo, etc.)  |        | (DB, REST, etc.)  |
+-------------+        +------------------+        +------------------+
---

- The client sends a query to the GraphQL server.  
- The server resolves the query using defined resolvers.  
- Data is fetched from various sources (databases, REST APIs, etc.).  

---

## 🧪 Playground Demo

Use the following public GraphQL API to try it out:

🔗 https://countries.trevorblades.com

Try running:

```
query {
  country(code: "US") {
    name
    capital
    currency
  }
}
```

---

## 🎯 Summary

- GraphQL provides a flexible and efficient way to access data.  
- It solves key issues faced by REST APIs.  
- Perfect for modern full-stack applications.  

➡️ Next up: **Setting up a GraphQL server with Express**
