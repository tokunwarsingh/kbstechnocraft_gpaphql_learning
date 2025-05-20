# Episode 10: Using GraphQL Directives

Welcome to **Episode 10** of the GraphQL Mastery Course! Today, we’ll learn about **Directives**, a powerful feature to customize query execution and schema behavior.

---

## 🎯 Goals

- Understand what directives are  
- Use built-in directives like `@include` and `@skip`  
- Create and apply custom directives  

---

## 🔹 What Are Directives?

Directives provide instructions to the GraphQL executor about how to process fields or fragments. They modify the behavior of queries or schemas.

---

## 🛠️ Step 1: Using Built-in Directives

Two common built-in directives are:

- `@include(if: Boolean!)` — includes the field only if condition is true  
- `@skip(if: Boolean!)` — skips the field if condition is true  

Example query with `@include`:

###  
query getUser($showEmail: Boolean!) {
  user(id: "1") {
    id
    name
    email @include(if: $showEmail)
  }
}
###

Variables:

###  
{
  "showEmail": false
}
###

---

## ⚙️ Step 2: Custom Directive (Conceptual)

Custom directives need schema and executor support (e.g., with `graphql-tools` or Apollo Server).

Example of a simple `@upper` directive that converts strings to uppercase.

Schema snippet:

###  
directive @upper on FIELD_DEFINITION

type User {
  name: String @upper
}
###

Custom logic is needed to implement the directive’s behavior in resolvers or middleware.

---

## 🧪 Step 3: Testing Built-in Directives

Query with variables controlling fields:

###  
query {
  user(id: "1") {
    id
    name
    email @skip(if: true)
  }
}
###

Result excludes `email` field.

---

## 🧠 Summary

- Directives customize query execution dynamically  
- Built-in directives `@include` and `@skip` control field inclusion  
- Custom directives enable powerful schema extensions (advanced)  

---

## ▶️ Next Episode

Next, we will explore **Batching and Caching in GraphQL** for performance optimization.

➡️ Episode 11: Batching and Caching in GraphQL
