# Episode 9: Error Handling and Validation in GraphQL

Welcome to **Episode 9** of the GraphQL Mastery Course! Today, we'll cover how to handle errors gracefully and validate inputs in GraphQL.

---

## 🎯 Goals

- Understand GraphQL error handling basics  
- Learn how to return user-friendly errors  
- Implement input validation in resolvers  
- Use custom error classes for clarity  

---

## ⚠️ GraphQL Error Handling Basics

GraphQL responses include an `errors` array if something goes wrong. Errors can originate from resolvers, schema validation, or server issues.

---

## 🛠️ Step 1: Throwing Errors in Resolvers

Throw errors in resolver functions when invalid data or other issues occur.

Example — user lookup with error if not found:

###  
const root = {
  user: ({ id }) => {
    const user = users.find(u => u.id === id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  },
};
###

---

## 🔍 Step 2: Input Validation Example

Validate inputs before processing:

###  
const root = {
  createUser: ({ name, email }) => {
    if (!name || !email) {
      throw new Error("Name and email are required");
    }
    if (!email.includes("@")) {
      throw new Error("Invalid email format");
    }
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
    };
    users.push(newUser);
    return newUser;
  },
};
###

---

## 🧑‍⚖️ Step 3: Custom Error Classes

Create custom error classes to provide more structured error handling:

###  
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

const root = {
  createUser: ({ name, email }) => {
    if (!name || !email) {
      throw new ValidationError("Name and email are required");
    }
    if (!email.includes("@")) {
      throw new ValidationError("Invalid email format");
    }
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
    };
    users.push(newUser);
    return newUser;
  },
};
###

---

## 🧪 Step 4: Test Error Handling

Try this mutation without an email:

###  
mutation {
  createUser(name: "NoEmail") {
    id
    name
    email
  }
}
###

Expected error response:

###  
{
  "errors": [
    {
      "message": "Name and email are required",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["createUser"]
    }
  ],
  "data": null
}
###

---

## 🧠 Summary

- Throw errors in resolvers for invalid operations  
- Validate inputs to prevent bad data  
- Use custom error classes for better error categorization  
- GraphQL returns errors in a standard `errors` array  

---

## ▶️ Next Episode

Next, we will explore **GraphQL Directives for schema customization**.

➡️ Episode 10: Using GraphQL Directives
