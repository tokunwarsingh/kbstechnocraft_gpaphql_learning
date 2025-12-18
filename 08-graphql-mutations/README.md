# Episode 8: GraphQL Mutations

Welcome to **Episode 8** of the GraphQL Mastery Course! Today, we'll learn how to implement **mutations** in GraphQL - operations that modify data on the server.

---

## 🎯 Goals

- Understand what mutations are and when to use them
- Learn to define mutation types in schema
- Implement mutation resolvers
- Handle input types and arguments
- Test mutations with GraphiQL

---

## 🔄 What Are Mutations?

Mutations are GraphQL operations that **modify data** on the server. Unlike queries which only read data, mutations can create, update, or delete data. They are essential for any application that needs to change data.

### Key Characteristics:
- **Side Effects**: Mutations change server state
- **Sequential**: Mutations execute in order
- **Return Values**: Can return the modified data
- **Error Handling**: Must handle failures gracefully

---

## 📦 Data Overview

We have JSON data for:
- **Continents**: code, name, countries
- **Countries**: code, name, capital, currency, phone
- **Languages**: code, name, native, rtl
- **States**: per country, code, name

---

## 📜 GraphQL Schema with Mutations

Our schema includes both queries and mutations:

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

type State {
  code: String
  name: String
  country: Country
}

# Input types for mutations
input CountryInput {
  code: String!
  name: String!
  capital: String!
  currency: String!
  phone: String!
}

input ContinentInput {
  code: String!
  name: String!
}

input StateInput {
  code: String!
  name: String!
  countryCode: String!
}

type Query {
  continents: [Continent]
  continent(code: String!): Continent
  countries: [Country]
  country(code: String!): Country
  languages: [Language]
  states(countryCode: String!): [State]
}

type Mutation {
  createCountry(input: CountryInput!): Country
  updateCountry(code: String!, input: CountryInput!): Country
  deleteCountry(code: String!): Boolean

  createContinent(input: ContinentInput!): Continent
  updateContinent(code: String!, input: ContinentInput!): Continent
  deleteContinent(code: String!): Boolean

  createState(input: StateInput!): State
  updateState(countryCode: String!, code: String!, name: String!): State
  deleteState(countryCode: String!, code: String!): Boolean
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

4. View mutation examples at http://localhost:4000

---

## 🔧 Mutation Types

### 1. Create Mutations

Create new data entries:

```javascript
createCountry: ({ input }) => {
  console.log(`Mutation: createCountry - Creating country: ${input.name}`);
  const newCountry = {
    code: input.code,
    name: input.name,
    capital: input.capital,
    currency: input.currency,
    phone: input.phone
  };
  countriesData.push(newCountry);
  return newCountry;
}
```

### 2. Update Mutations

Modify existing data:

```javascript
updateCountry: ({ code, input }) => {
  console.log(`Mutation: updateCountry - Updating country: ${code}`);
  const countryIndex = countriesData.findIndex(c => c.code === code);
  if (countryIndex === -1) {
    throw new Error(`Country with code ${code} not found`);
  }
  countriesData[countryIndex] = {
    ...countriesData[countryIndex],
    ...input
  };
  return countriesData[countryIndex];
}
```

### 3. Delete Mutations

Remove data entries:

```javascript
deleteCountry: ({ code }) => {
  console.log(`Mutation: deleteCountry - Deleting country: ${code}`);
  const countryIndex = countriesData.findIndex(c => c.code === code);
  if (countryIndex === -1) {
    throw new Error(`Country with code ${code} not found`);
  }
  countriesData.splice(countryIndex, 1);
  return true;
}
```

---

## 🧪 Mutation Examples

### Create a Country

```graphql
mutation {
  createCountry(input: {
    code: "XX"
    name: "Test Country"
    capital: "Test City"
    currency: "TST"
    phone: "999"
  }) {
    code
    name
    capital
  }
}
```

### Update a Country

```graphql
mutation {
  updateCountry(code: "XX", input: {
    name: "Updated Test Country"
    capital: "Updated City"
  }) {
    code
    name
    capital
  }
}
```

### Delete a Country

```graphql
mutation {
  deleteCountry(code: "XX")
}
```

### Create a State

```graphql
mutation {
  createState(input: {
    code: "TS"
    name: "Test State"
    countryCode: "US"
  }) {
    code
    name
  }
}
```

### Multiple Mutations

```graphql
mutation {
  createCountry: createCountry(input: {
    code: "ZZ"
    name: "Another Test Country"
    capital: "Another City"
    currency: "ZZZ"
    phone: "000"
  }) {
    code
    name
  }
  createContinent: createContinent(input: {
    code: "ZZC"
    name: "Another Test Continent"
  }) {
    code
    name
  }
}
```

---

## 📊 Mutation Flow

```
Client
  ↓ sends mutation request
GraphQL Server
  ↓ validates mutation
  ↓ executes mutation resolver
Data Store (in-memory array)
  ↑ modifies data
GraphQL Server
  ↑ returns mutation result
Client
  ↓ updates UI with result
```

---

## 🧠 Mutation Best Practices

### 1. Use Input Types

```graphql
input CountryInput {
  code: String!
  name: String!
  capital: String!
  currency: String!
  phone: String!
}
```

### 2. Validate Input

```javascript
createCountry: ({ input }) => {
  if (!input.code || !input.name) {
    throw new Error('Code and name are required');
  }
  // ... rest of logic
}
```

### 3. Handle Errors

```javascript
updateCountry: ({ code, input }) => {
  const country = countriesData.find(c => c.code === code);
  if (!country) {
    throw new Error(`Country with code ${code} not found`);
  }
  // ... update logic
}
```

### 4. Return Meaningful Data

```javascript
// Good: return the modified object
return updatedCountry;

// Bad: return true/false only
return true;
```

### 5. Use Descriptive Names

```javascript
// Good
createUser, updateUser, deleteUser

// Bad
doUser, modifyUser, removeUser
```

---

## 🔍 Input Types vs Regular Types

### Input Types
- Used for mutation arguments
- Can only contain scalar fields and other input types
- Cannot have resolvers
- Defined with `input` keyword

### Regular Types
- Used for query/mutation return values
- Can have complex fields and relationships
- Can have resolvers
- Defined with `type` keyword

---

## 🧪 Testing Mutations

### Success Case

```javascript
// Test creating a country
const result = await graphql(schema, `
  mutation {
    createCountry(input: {
      code: "XX"
      name: "Test Country"
      capital: "Test City"
      currency: "TST"
      phone: "999"
    }) {
      code
      name
    }
  }
`, root);

expect(result.data.createCountry.code).toBe("XX");
```

### Error Case

```javascript
// Test updating non-existent country
const result = await graphql(schema, `
  mutation {
    updateCountry(code: "INVALID", input: {
      name: "Updated Name"
    }) {
      code
    }
  }
`, root);

expect(result.errors[0].message).toContain("not found");
```

---

## 📈 Advanced Mutation Patterns

### Optimistic Updates

Update UI immediately, then sync with server.

### Batch Mutations

```javascript
mutation BatchUpdate($updates: [CountryUpdate!]!) {
  updateCountries(updates: $updates) {
    code
    name
  }
}
```

### Conditional Mutations

```javascript
mutation UpdateIfExists($code: String!, $input: CountryInput!) {
  updateCountry(code: $code, input: $input) {
    code
    name
  }
}
```

---

## 🧠 Summary

- Mutations modify server data
- Use input types for arguments
- Return modified data when possible
- Handle errors appropriately
- Test both success and failure cases

---

## ▶️ Next Episode

We’ll explore **input types and arguments** in more detail!

➡️ Episode 9: Input Types and Arguments
