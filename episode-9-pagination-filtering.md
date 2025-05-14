# Episode 9: Pagination & Filtering

## 📌 Overview
Learn how to efficiently handle large datasets in GraphQL using pagination and filtering. We'll implement offset and cursor-based strategies.

## 🔢 Offset-Based Pagination
Query definition:
```graphql
extend type Query {
  books(offset: Int, limit: Int): [Book!]!
}
```

Resolver:
```javascript
books: async (_, { offset = 0, limit = 10 }, { prisma }) => {
  return prisma.book.findMany({ skip: offset, take: limit });
},
```

## 🧭 Cursor-Based Pagination
More scalable and reliable for large datasets.
Schema:
```graphql
type BookEdge {
  cursor: String!
  node: Book!
}

type PageInfo {
  endCursor: String
  hasNextPage: Boolean!
}

type BookConnection {
  edges: [BookEdge!]!
  pageInfo: PageInfo!
}

extend type Query {
  booksConnection(after: String, first: Int): BookConnection!
}
```

Resolver:
```javascript
booksConnection: async (_, { after, first = 5 }, { prisma }) => {
  const cursorOptions = after ? { skip: 1, cursor: { id: parseInt(after) } } : {};
  const books = await prisma.book.findMany({
    ...cursorOptions,
    take: first,
    orderBy: { id: 'asc' },
  });
  const lastBook = books[books.length - 1];
  return {
    edges: books.map(book => ({ cursor: book.id.toString(), node: book })),
    pageInfo: {
      endCursor: lastBook?.id.toString(),
      hasNextPage: Boolean(lastBook),
    },
  };
},
```

## 🔍 Filtering and Sorting
Extend your query:
```graphql
books(filter: String, sortBy: String): [Book!]!
```

Resolver logic:
```javascript
books: async (_, { filter, sortBy }, { prisma }) => {
  return prisma.book.findMany({
    where: {
      title: { contains: filter },
    },
    orderBy: {
      title: sortBy === 'asc' ? 'asc' : 'desc',
    },
  });
}
```

## ✅ Summary
You’ve implemented basic pagination (offset) and scalable pagination (cursor), along with filters and sorting for flexible querying.

## 💡 Exercise
- Add `filterByAuthor` support
- Implement `hasPreviousPage` in cursor pagination

---