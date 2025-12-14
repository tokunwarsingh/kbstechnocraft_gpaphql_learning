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

## 🔄 Step 3: Complete Server Code (graphql-server/server.js)

```javascript
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const fs = require("fs");
const path = require("path");

// Load countries data
const countries = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/countries.json'), 'utf8'));

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

const root = {
  countries: () => countries,
};

const app = express();
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

---

## 🧠 Summary

- Created a `Country` type with fields `code`, `name`, `capital`, `currency`, and `phone`.  
- Added a `countries` query returning a list of countries.  
- Wrote a resolver to return data from the countries dataset.  

---

## ▶️ Next Episode

We'll learn **how to add mutations** to create and update countries!

➡️ Episode 4: Writing Mutations for Data Modification
