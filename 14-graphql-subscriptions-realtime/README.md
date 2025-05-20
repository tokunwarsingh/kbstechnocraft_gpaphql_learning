# Episode 14: GraphQL Pagination Techniques

Welcome to **Episode 14** of the GraphQL Mastery Course! Today, we'll explore how to implement **pagination** to efficiently handle large datasets.

---

## 🎯 Goals

- Understand different pagination styles in GraphQL  
- Implement offset-based pagination  
- Implement cursor-based pagination (Relay style)  

---

## 🔹 Offset-based Pagination

Simple pagination using `limit` and `offset` arguments.

### Schema Example  
###  
type Query {
  posts(limit: Int, offset: Int): [Post]
}
###

### Resolver Example  
###  
const root = {
  posts: ({ limit = 10, offset = 0 }) => posts.slice(offset, offset + limit),
};
###

---

## 🔸 Cursor-based Pagination (Relay Style)

Cursor pagination uses an opaque cursor to paginate efficiently.

### Schema Example  
###  
type PageInfo {
  endCursor: String
  hasNextPage: Boolean
}

type PostEdge {
  cursor: String
  node: Post
}

type PostConnection {
  edges: [PostEdge]
  pageInfo: PageInfo
}

type Query {
  posts(first: Int, after: String): PostConnection
}
###

---

## ⚙️ Cursor Pagination Resolver (Simplified)

###  
const root = {
  posts: ({ first = 10, after }) => {
    let start = 0;
    if (after) {
      start = posts.findIndex(p => p.id === after) + 1;
    }
    const sliced = posts.slice(start, start + first);
    const edges = sliced.map(post => ({
      cursor: post.id,
      node: post,
    }));

    return {
      edges,
      pageInfo: {
        endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
        hasNextPage: start + first < posts.length,
      },
    };
  },
};
###

---

## 🧪 Query Example

###  
{
  posts(first: 2, after: "2") {
    edges {
      cursor
      node {
        id
        title
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
###

---

## 🧠 Summary

- Offset pagination is simple but less efficient for large datasets  
- Cursor pagination is more performant and suited for real-time data  
- Relay-style pagination is a GraphQL best practice  

---

## ▶️ Next Episode

Next, we’ll cover **Optimizing GraphQL Performance**.

➡️ Episode 15: Optimizing GraphQL Performance
