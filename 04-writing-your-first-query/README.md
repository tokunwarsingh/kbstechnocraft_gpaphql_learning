# Episode 4: Writing Your First Query

Welcome to **Episode 4** of the GraphQL Mastery Course! Today we’ll learn how to write **queries** in GraphQL using real JSON data.

---

## 🎯 Goals

- Understand GraphQL query structure
- Learn different types of queries: simple, with arguments, nested, aliases
- Use the JSON data from the data folder

---

## 📦 Data Overview

We have JSON data for:
- **Continents**: code, name, countries
- **Countries**: code, name, capital, currency, phone
- **Languages**: code, name, native, rtl
- **States**: per country, code, name

---

## 📜 GraphQL Schema

Our schema defines types and queries:

```
type Continent {
  code: String
  name: String
  countries: [Country]
}

type Country {
  code: String
  name: String
  capital: String
  currency: String
  phone: String
  states: [State]
}

type Language {
  code: String
  name: String
  native: String
  rtl: Boolean
}

type State {
  code: String
  name: String
}

type Query {
  continents: [Continent]
  continent(code: String!): Continent
  countries: [Country]
  country(code: String!): Country
  languages: [Language]
  language(code: String!): Language
  states(countryCode: String!): [State]
}
```

---

## 🚀 Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

3. Open GraphiQL at http://localhost:4000/graphql

---

## 🔍 Types of Queries

### 1. Simple Query

Get all continents:

```
query {
  continents {
    code
    name
  }
}
```

### 2. Query with Arguments

Get a specific continent:

```
query {
  continent(code: "AF") {
    name
    code
  }
}
```

### 3. Nested Query

Get continents with their countries:

```
query {
  continents {
    name
    countries {
      name
      capital
    }
  }
}
```

### 4. Query with Aliases

Get multiple items with aliases:

```
query {
  africa: continent(code: "AF") {
    name
  }
  europe: continent(code: "EU") {
    name
  }
}
```

### 5. Fragment for Reusable Fields

Use fragments to avoid repetition:

```
fragment CountryFields on Country {
  name
  capital
  currency
}

query {
  countries {
    ...CountryFields
  }
  continent(code: "AF") {
    countries {
      ...CountryFields
    }
  }
}
```

### 6. Query with Variables

Use variables for dynamic queries:

```
query GetContinent($code: String!) {
  continent(code: $code) {
    name
    countries {
      name
    }
  }
}
```

With variables:
```
{
  "code": "AS"
}
```
you can test using curl cmmad as below
```
curl --request POST \
  --header 'content-type: application/json' \
  --url http://localhost:4000/graphql \
  --data '{"query":"query GetContinent($code: String!) { continent(code: $code) { name countries { name } } }", "variables": {"code": "AS"}}'
```

### 7. Inline Fragment for Union Types
Inline fragments are used when a query can return **multiple object types** (Union Types).

#### Union Definition
```
union SearchResult = Country | State | Language
```

#### Sample Query
```
query Search($keyword: String!) {
  search(keyword: $keyword) {
    __typename

    ... on Country {
      code
      name
      capital
      currency
    }

    ... on State {
      code
      name
    }

    ... on Language {
      code
      name
      native
      rtl
    }
  }
}
```

Variables:
```
{
  "keyword": "in"
}
```

---

### 8. Query with Directives

Use @include or @skip:

```
query GetContinents($includeCountries: Boolean!) {
  continents {
    name
    countries @include(if: $includeCountries) {
      name
    }
  }
}
```
Varable
```
{
  "includeCountries": true
}

```
---

## 🧪 Example Queries

### Get All Countries

```
query {
  countries {
    code
    name
    capital
  }
}
```

### Get Country with States

```
query {
  country(code: "US") {
    name
    states {
      name
    }
  }
}
```

### Get Languages

```
query {
  languages {
    code
    name
    native
  }
}
```

### Get States for a Country

```
query {
  states(countryCode: "IN") {
    code
    name
  }
}
```

---

## 📊 Query Flow Diagram

```
┌──────────────┐
│   Client     │
│ (Web / App)  │
└──────┬───────┘
       │
       │ GraphQL Query
       ▼
┌────────────────────┐
│ GraphQL Server     │
│ (Apollo / Yoga)    │
└──────┬─────────────┘
       │
       │ 1️⃣ Parse Query
       ▼
┌────────────────────┐
│ Query Parser       │
│ (Syntax Check)     │
└──────┬─────────────┘
       │
       │ 2️⃣ Validate Query
       ▼
┌────────────────────┐
│ Schema Validator   │
│ (Types, Fields)    │
└──────┬─────────────┘
       │
       │ 3️⃣ Execute Query
       ▼
┌────────────────────┐
│ Resolver Engine    │
│ (Field Resolvers)  │
└──────┬─────────────┘
       │
       │ Fetch Data
       ▼
┌────────────────────┐
│ Data Sources       │
│ (JSON / DB / API)  │
└──────┬─────────────┘
       │
       │ Raw Data
       ▼
┌────────────────────┐
│ Response Shaping   │
│ (Based on Query)   │
└──────┬─────────────┘
       │
       │ JSON Response
       ▼
┌──────────────┐
│   Client     │
│ (Exact Data) │
└──────────────┘

```

---

## 🧠 Summary

- Queries fetch data from the server
- Use arguments for specific data
- Nest queries for related data
- Aliases allow multiple operations
- Fragments reduce duplication
- Variables make queries dynamic

---

## ▶️ Next Episode

We’ll explore **mutations** for modifying data!

➡️ Episode 5: Writing Mutations
