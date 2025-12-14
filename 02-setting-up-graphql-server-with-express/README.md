# Episode 2: Setting Up GraphQL Server with Express


Welcome to **Episode 2** of the GraphQL Mastery Course! In this post, you'll learn how to create a simple GraphQL server using Node.js, Express, and `graphql` package.

---

## 🧰 Prerequisites

Make sure you have:

- Node.js installed (v14 or higher)
- Basic knowledge of JavaScript
- A terminal and code editor (e.g., VSCode)

---

## 📦 Step 1: Initialize the Project

```bash  
mkdir graphql-server
cd graphql-server
npm init -y
```

---

## 📥 Step 2: Install Required Packages

```bash  
npm install express express-graphql graphql
```

These packages do the following:

- `express`: Minimal web server
- `express-graphql`: Integrates GraphQL with Express
- `graphql`: Core GraphQL library

---

## 🛠️ Step 3: Create the Server

Create a file named `server.js`:

```javascript  
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const fs = require("fs");
const dataFile = "./data/countries.json";

const loadData = () => JSON.parse(fs.readFileSync(dataFile, "utf-8"));

const schema = buildSchema(`
  type Query {
    hello: String
    hello_new: String
    countries: [Country]
  }
    
  type Country {
    code: String!
    name: String!
  }
`);

const root = {
  hello: () => "Hello, GraphQL World!",
  hello_new: () => "Hello, new World!",
  countries: () => loadData()
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("🚀 Server is running at http://localhost:4000/graphql");
});
```

---

## 🧪 Step 4: Run the Server

```bash  
node server.js
```

Open your browser and visit:

🔗 http://localhost:4000/graphql

You’ll see **GraphiQL**, a powerful GraphQL playground.

Try these queries:

```graphql  
{
  hello
}
```

```graphql
{
  hello_new
}
```

```graphql
{
  countries {
    code
    name
  }
}
```

You should get:

```graphql  
{
  "data": {
    "hello": "Hello, GraphQL World!",
    "hello_new": "Hello, new World!",
    "countries": [
      {
        "code": "US",
        "name": "United States"
      },
      {
        "code": "CA",
        "name": "Canada"
      },
      {
        "code": "MX",
        "name": "Mexico"
      }
    ]
  }
}
```

---

## 📊 Server Architecture

```  
+---------+          +-------------------+          +------------+
| Client  | <------> | Express + GraphQL | <------> | Your Data  |
+---------+          +-------------------+          +------------+
```

- A client sends a query to `/graphql`.
- Express passes it to the `graphqlHTTP` middleware.
- The middleware resolves the query using your schema and resolver.

---

## 🧼 Folder Structure (Complete Version)

```bash
02-setting-up-graphql-server-with-express/
├── data/
│   └── countries.json
├── graphql-server/
│   ├── graphql/
│   │   └── readme3
│   ├── server.js
│   └── package.json
└── README.md
```

## 📄 Step 5: Create the Data File (countries.json)

Create a file named `countries.json` in the `data/` directory at the root level with sample data:

```json
[
  {"code": "US", "name": "United States"},
  {"code": "CA", "name": "Canada"},
  {"code": "MX", "name": "Mexico"}
]
```

This file provides sample country data for the `countries` query.

## 🧩 Key Concepts Used

| Term         | Purpose                            |
|--------------|-------------------------------------|
| `buildSchema`| Define GraphQL schema using SDL     |
| `graphqlHTTP`| Middleware to handle GraphQL requests |
| `rootValue`  | Object that maps resolvers to schema |

---

## 🧠 Recap

- You created a basic GraphQL server using Express.
- You used `buildSchema` and `graphqlHTTP` to handle queries.
- You tested it using GraphiQL in the browser.

---

## ▶️ Next up

We’ll **define real types** and use **resolvers** to fetch data from an in-memory source!

➡️ Episode 3: Building Your First Schema with Custom Types

