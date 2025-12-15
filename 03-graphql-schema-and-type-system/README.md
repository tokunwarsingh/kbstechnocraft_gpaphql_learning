# Episode 3: Building Your First Schema with Custom Types

Welcome to **Episode 3** of the GraphQL Mastery Course! Today, we'll create custom types in your GraphQL schema and write resolvers to fetch data from a real dataset.

---

## 🎯 Goals

- Define custom object types in GraphQL schema  
- Add queries returning custom types  
- Implement resolvers to return actual data  

---

## 📦 Sample Data

We'll use a countries dataset with information about countries around the world:

```javascript
const countries = [
  {
    "code": "AD",
    "name": "Andorra",
    "capital": "Andorra la Vella",
    "currency": "EUR",
    "phone": "376"
  },
  {
    "code": "AE",
    "name": "United Arab Emirates",
    "capital": "Abu Dhabi",
    "currency": "AED",
    "phone": "971"
  },
  // ... more countries
];
```

---

## 📜 Step 1: Update Schema with a Country Type

Modify your schema to add a `Country` type and a query to get all countries:

```javascript
const schema = buildSchema(`
  type Country {
    code: ID
    name: String
    capital: String
    currency: String
    phone: String
  }

  type Query {
    countries: [Country]
  }
`);
```

---

## ⚙️ Step 2: Add Resolver for `countries`

Implement resolver to return the countries array:

```javascript
const root = {
  countries: () => countries,
};
```

---

## 🔄 Step 3: Complete Server Code

The server code is now organized into separate files for better maintainability:

### `graphql-server/graphql/schema.js`
```javascript
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Country {
    code: ID
    name: String
    capital: String
    currency: String
    phone: String
  }

  type Query {
    countries: [Country]
  }
`);

module.exports = schema;
```

### `graphql-server/graphql/resolvers.js`
```javascript
const fs = require("fs");
const path = require("path");

// Load countries data from the root data folder
const countries = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/countries.json'), 'utf8'));

const resolvers = {
  countries: () => countries
};

module.exports = resolvers;
```

### `graphql-server/server.js`
```javascript
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const path = require("path");

// Import schema and resolvers
const schema = require("./graphql/schema");
const root = require("./graphql/resolvers");

const app = express();

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("🚀 Server running at http://localhost:4000/graphql");
});
```

---

## 🧪 Step 4: Test Query

Run your server:

```bash
npm start
```

Open http://localhost:4000/graphql and run:

```graphql
{
  countries {
    code
    name
    capital
    currency
    phone
  }
}
```

Expected response:

```json
{
  "data": {
    "countries": [
      {
        "code": "AD",
        "name": "Andorra",
        "capital": "Andorra la Vella",
        "currency": "EUR",
        "phone": "376"
      },
      {
        "code": "AE",
        "name": "United Arab Emirates",
        "capital": "Abu Dhabi",
        "currency": "AED",
        "phone": "971"
      }
    ]
  }
}
```

---

## 🌐 Step 5: View the Frontend

Open http://localhost:4000 in your browser to see the countries displayed in a nice format using the GraphQL API.

---

## 📊 Schema Diagram

```
Query
 └─ countries: [Country]

Country
 ├─ code: ID
 ├─ name: String
 ├─ capital: String
 ├─ currency: String
 └─ phone: String
```

### Visual Schema Diagrams

For detailed visual explanations of GraphQL schemas, check out these resources:

- **[Interactive Visual Guide](../images/graphql-schema-visual.html)** - Open in browser for interactive schema explanations
- **[ASCII Art Diagrams](../images/graphql-schema-guide.txt)** - Text-based diagrams and guides
- **[Diagram Instructions](../images/diagram-instructions.md)** - How to create your own visual diagrams

## Key Schema Concepts Illustrated:

1. **Type Definitions**: How to define custom types like `Country`
2. **Query Structure**: How queries are defined in the schema
3. **Field Relationships**: How types reference each other
4. **Schema Validation**: How GraphQL validates queries against the schema
5. **Resolver Mapping**: How schema fields connect to data fetching functions

---

## 🧠 Summary

- Created a `Country` type with fields `code`, `name`, `capital`, `currency`, and `phone`.  
- Added a `countries` query returning a list of countries.  
- Wrote a resolver to return data from the countries dataset.  
- Built a frontend that consumes the GraphQL API to display country information.

---

## ▶️ Next Episode

We'll learn **how to add mutations** to create and update countries!

➡️ Episode 4: Writing Mutations for Data Modification
