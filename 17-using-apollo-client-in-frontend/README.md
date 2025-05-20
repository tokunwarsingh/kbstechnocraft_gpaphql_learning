# Episode 17: GraphQL Tooling and Developer Experience

Welcome to **Episode 17** of the GraphQL Mastery Course! Today, we'll explore the essential tools that make GraphQL development smooth, productive, and enjoyable.

---

## 🎯 Goals

- Discover popular GraphQL tools and IDEs  
- Use GraphQL Playground and GraphiQL  
- Explore code generation tools  
- Learn about schema validation and linting tools  

---

## 🔹 Popular GraphQL IDEs

- **GraphiQL**: Browser-based IDE for running queries and exploring schema  
- **GraphQL Playground**: Enhanced IDE with tabs, history, and better UI  
- **Apollo Studio**: Cloud-based GraphQL IDE with advanced features  
- **Insomnia** and **Postman**: API clients supporting GraphQL  

---

## 🛠️ Step 1: Using GraphiQL

Enable GraphiQL in your server setup to test queries easily.

###  
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));
###

Open `http://localhost:4000/graphql` to access the GraphiQL interface.

---

## ⚙️ Step 2: GraphQL Code Generator

Generate type-safe code from GraphQL schemas and queries.

Install:

###  
npm install @graphql-codegen/cli
###

Configure `codegen.yml`:

###  
schema: ./schema.graphql
documents: ./src/**/*.graphql
generates:
  ./src/generated/graphql.ts:
    plugins:
      - typescript
      - typescript-operations
      - typescript-react-apollo
###

Run:

###  
npx graphql-codegen
###

---

## 🧪 Step 3: Schema Validation and Linting

Use tools like `eslint-plugin-graphql` to lint your queries and schemas in code editors.

Example ESLint config snippet:

###  
{
  "plugins": ["graphql"],
  "rules": {
    "graphql/template-strings": ['error', {
      env: 'literal',
      schemaJson: require('./schema.json'),
    }]
  }
}
###

---

## 🧠 Summary

- GraphiQL and Playground help test and debug queries  
- Code generation improves type safety and reduces errors  
- Linting ensures schema and query correctness  

---

## ▶️ Next Episode

Next, we will cover **Real-time Subscriptions in GraphQL**.

➡️ Episode 18: Real-time Subscriptions in GraphQL
