# Episode 5: Understanding Resolvers

Welcome to **Episode 5** of the GraphQL Mastery Course! Today, we'll dive deep into **GraphQL resolvers** - the functions that fetch the data for each field in your schema.

---

## 🎯 Goals

- Understand what resolvers are and how they work
- Learn different types of resolvers
- Implement resolvers for queries and fields
- Handle arguments and context in resolvers

---

## 🔍 What Are Resolvers?

Resolvers are functions that tell GraphQL how to fetch the data for each field in your schema. Every field in your GraphQL schema has a corresponding resolver function.

### Resolver Function Signature

```javascript
fieldName: (parent, args, context, info) => {
  // Return the data for this field
}
```

- **parent**: The result of the parent field's resolver
- **args**: Arguments passed to the field
- **context**: Shared context across resolvers
- **info**: Information about the query execution

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
  countryCount: Int
}

type Country {
  code: String
  name: String
  capital: String
  currency: String
  phone: String
  states: [State]
  stateCount: Int
  continent: Continent
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
  country: Country
}

type Query {
  continents: [Continent]
  continent(code: String!): Continent
  countries: [Country]
  country(code: String!): Country
  languages: [Language]
  language(code: String!): Language
  states(countryCode: String!): [State]
  searchCountries(search: String!): [Country]
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

4. View resolver examples at http://localhost:4000

---

## 🔧 Types of Resolvers

### 1. Root Query Resolvers

Resolve top-level queries defined in the Query type.

```javascript
const root = {
  continents: () => {
    console.log('Resolver: continents - Returning all continents');
    return continentsData;
  },

  continent: ({ code }) => {
    console.log(`Resolver: continent - Finding continent with code: ${code}`);
    return continentsData.find(c => c.code === code);
  }
};
```

### 2. Field Resolvers

Resolve fields on specific types (not Query).

```javascript
root.Continent = {
  countries: (continent) => {
    console.log(`Field Resolver: Continent.countries - Resolving countries for ${continent.name}`);
    return continent.countries.map(country => countriesData.find(c => c.code === country.code)).filter(Boolean);
  }
};
```

### 3. Computed Field Resolvers

Resolve fields that don't exist in the data but are computed.

```javascript
root.Continent = {
  countryCount: (continent) => {
    console.log(`Computed Resolver: Continent.countryCount - Counting countries for ${continent.name}`);
    return continent.countries.length;
  }
};
```

### 4. Relationship Resolvers

Resolve relationships between types.

```javascript
root.Country = {
  continent: (country) => {
    console.log(`Relationship Resolver: Country.continent - Finding continent for ${country.name}`);
    return continentsData.find(cont =>
      cont.countries.some(c => c.code === country.code)
    );
  }
};
```

### 5. Search/Filter Resolvers

Resolve complex queries with filtering logic.

```javascript
root = {
  searchCountries: ({ search }) => {
    console.log(`Search Resolver: searchCountries - Searching countries with: ${search}`);
    return countriesData.filter(country =>
      country.name.toLowerCase().includes(search.toLowerCase()) ||
      country.capital.toLowerCase().includes(search.toLowerCase())
    );
  }
};
```

---

## 🧪 Resolver Examples

### Root Query Resolver

```javascript
query {
  continents {
    name
  }
}
```

### Field Resolver

```javascript
query {
  continents {
    name
    countries {
      name
    }
  }
}
```

### Computed Field Resolver

```javascript
query {
  continents {
    name
    countryCount
  }
}
```

### Relationship Resolver

```javascript
query {
  country(code: "US") {
    name
    continent {
      name
    }
  }
}
```

### Search Resolver

```javascript
query {
  searchCountries(search: "united") {
    name
    capital
  }
}
```

---

## 📊 Resolver Execution Flow

```
Query: continents { name countries { name } }

1. continents (Root Query Resolver)
   ↓
2. name (Default Resolver - returns parent.name)
   ↓
3. countries (Field Resolver on Continent)
   ↓
4. name (Default Resolver - returns parent.name)
```

---

## 🧠 Resolver Best Practices

### 1. Handle Errors

```javascript
continent: ({ code }) => {
  const continent = continentsData.find(c => c.code === code);
  if (!continent) {
    throw new Error(`Continent with code ${code} not found`);
  }
  return continent;
}
```

### 2. Use Context for Shared Data

```javascript
// In server.js
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  context: { user: req.user, db: databaseConnection },
  graphiql: true
}));

// In resolver
countries: (parent, args, context) => {
  if (!context.user) {
    throw new Error('Authentication required');
  }
  return countriesData;
}
```

### 3. Optimize with DataLoader

For batching and caching database queries.

### 4. Avoid Over-fetching

Only fetch what's requested.

### 5. Handle Circular References

Be careful with bidirectional relationships.

---

## 🔍 Default Resolvers

GraphQL provides default resolvers for simple fields:

```javascript
// This resolver is automatically provided
name: (parent) => parent.name
```

---

## 📈 Advanced Resolver Patterns

### Resolver Composition

```javascript
const withAuth = (resolver) => (parent, args, context) => {
  if (!context.user) throw new Error('Not authenticated');
  return resolver(parent, args, context);
};

const root = {
  countries: withAuth(() => countriesData)
};
```

### Resolver Middleware

```javascript
const logResolver = (resolver, fieldName) => (parent, args, context) => {
  console.log(`Resolving ${fieldName}`);
  const result = resolver(parent, args, context);
  console.log(`Resolved ${fieldName}:`, result);
  return result;
};
```

---

## 🧪 Testing Resolvers

### Unit Testing

```javascript
const { graphql } = require('graphql');

describe('Resolvers', () => {
  it('should resolve continents', async () => {
    const query = '{ continents { name } }';
    const result = await graphql(schema, query, root);
    expect(result.data.continents).toBeDefined();
  });
});
```

---

## 📊 Summary

- Resolvers fetch data for each field
- Root resolvers handle Query/Mutation fields
- Field resolvers handle type fields
- Computed resolvers create derived data
- Relationship resolvers link types
- Context shares data across resolvers

---

## ▶️ Next Episode

We’ll explore **nested queries and aliases**!

➡️ Episode 6: Nested Queries and Aliases
