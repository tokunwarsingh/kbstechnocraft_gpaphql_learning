# Episode 6: Input Types, Validation & Error Handling

## 📌 Overview
This episode focuses on improving input structures using `input` types, implementing validation logic, and gracefully handling errors in GraphQL APIs.

## 🧾 Using Input Types
Input types help organize and validate incoming data, especially in mutations.
```graphql
input CreateBookInput {
  title: String!
  authorId: ID!
}

extend type Mutation {
  createBook(input: CreateBookInput!): Book!
}
```

In your resolver:
```javascript
createBook: async (_, { input }, { prisma }) => {
  return prisma.book.create({ data: input });
}
```

## ✅ Custom Validation
You can validate input manually inside resolvers.
```javascript
createBook: async (_, { input }, { prisma }) => {
  if (input.title.length < 3) {
    throw new Error("Title must be at least 3 characters long");
  }
  return prisma.book.create({ data: input });
}
```

For advanced validation, consider using libraries like Joi or Yup.

## 🛑 Error Handling
GraphQL responses include an `errors` array if exceptions occur.
```json
{
  "errors": [
    {
      "message": "Title must be at least 3 characters long",
      "locations": [...],
      "path": [...]
    }
  ]
}
```

You can also customize error behavior:
```javascript
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    return { message: err.message, statusCode: err.extensions.code };
  },
});
```

## ✅ Summary
Using input types improves schema structure. Adding validation and structured error handling leads to safer and more reliable APIs.

## 💡 Exercise
- Create a `CreateAuthorInput` type
- Add a validation rule to prevent duplicate author names

---