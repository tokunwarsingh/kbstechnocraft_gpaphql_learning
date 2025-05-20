# Episode 13: Security Best Practices in GraphQL

Welcome to **Episode 13** of the GraphQL Mastery Course! Today, we’ll cover important **security practices** to protect your GraphQL API.

---

## 🎯 Goals

- Understand common GraphQL security risks  
- Implement query depth and complexity limiting  
- Use authentication and authorization best practices  
- Protect against injection and denial-of-service attacks  

---

## 🔐 Common Security Risks

- **Introspection Exposure:** Reveals schema structure to attackers  
- **Overly Complex Queries:** Can cause DoS by exhausting server resources  
- **Injection Attacks:** Malicious input causing unexpected behavior  
- **Unauthorized Access:** Access to data without proper permissions  

---

## 🛠️ Step 1: Limit Query Depth and Complexity

Use libraries like `graphql-depth-limit` and `graphql-validation-complexity` to restrict query depth and complexity.

###  
const depthLimit = require('graphql-depth-limit');

app.use('/graphql', graphqlHTTP({
  schema,
  validationRules: [depthLimit(5)], // Limit max depth to 5
}));
###

---

## ⚙️ Step 2: Authentication & Authorization

Use context to pass user info and check permissions in resolvers.

###  
const root = {
  user: ({ id }, context) => {
    if (!context.user) throw new Error("Unauthorized");
    if (context.user.id !== id) throw new Error("Forbidden");
    return users.find(u => u.id === id);
  },
};
###

---

## 🧪 Step 3: Disable Introspection in Production

Disable schema introspection in production to hide schema details.

###  
const isProduction = process.env.NODE_ENV === 'production';

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: !isProduction,
  customFormatErrorFn: (error) => {
    return { message: error.message };
  },
}));
###

---

## 🧠 Summary

- Protect APIs by limiting query complexity and depth  
- Always authenticate and authorize requests  
- Disable introspection in production for security  
- Sanitize inputs to avoid injection attacks  

---

## ▶️ Next Episode

Next, we’ll dive into **GraphQL Pagination Techniques**.

➡️ Episode 14: GraphQL Pagination Techniques
