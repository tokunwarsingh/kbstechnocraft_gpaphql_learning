# Episode 19: Error Handling and Debugging in GraphQL

Welcome to **Episode 19** of the GraphQL Mastery Course! Today, we’ll cover how to effectively handle errors and debug GraphQL APIs.

---

## 🎯 Goals

- Understand GraphQL error structure  
- Customize error responses  
- Use try/catch in resolvers  
- Debug using logging and tracing  

---

## ⚠️ GraphQL Error Basics

GraphQL returns errors in the `errors` array with `message` and optional `locations` and `path`.

---

## 🛠️ Step 1: Throwing Errors in Resolvers

###  
const root = {
  user: ({ id }) => {
    const user = users.find(u => u.id === id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  },
};
###

---

## ⚙️ Step 2: Custom Error Formatting

With `express-graphql`, customize error format:

###  
app.use('/graphql', graphqlHTTP({
  schema,
  customFormatErrorFn: (err) => ({
    message: err.message,
    code: err.originalError?.code || 'INTERNAL_SERVER_ERROR',
  }),
}));
###

---

## 🧪 Step 3: Debugging with Logging

Add logging in resolvers for troubleshooting:

###  
const root = {
  user: ({ id }) => {
    console.log(`Fetching user with ID: ${id}`);
    // ...
  },
};
###

---

## 🧠 Summary

- Use meaningful error messages in resolvers  
- Customize error format to add codes or details  
- Log queries and errors for easier debugging  

---

## ▶️ Next Episode

Next and final episode: **Deploying and Monitoring GraphQL APIs**.

➡️ Episode 20: Deploying and Monitoring GraphQL APIs
