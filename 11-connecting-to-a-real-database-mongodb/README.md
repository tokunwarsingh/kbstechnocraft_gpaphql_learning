# Episode 11: Batching and Caching in GraphQL

Welcome to **Episode 11** of the GraphQL Mastery Course! Today, we'll dive into **batching** and **caching** techniques to optimize GraphQL performance.

---

## 🎯 Goals

- Understand why batching and caching matter  
- Learn how to use DataLoader for batching and caching  
- See examples of batching multiple requests into one  

---

## 🔄 What Is Batching?

Batching combines multiple GraphQL requests or resolver calls into a single operation, reducing redundant database or API calls.

---

## 🧰 Step 1: Install DataLoader

DataLoader is a popular utility for batching and caching requests inside GraphQL resolvers.

###  
npm install dataloader
###

---

## ⚙️ Step 2: Create a DataLoader Instance

Example DataLoader for fetching users by IDs:

###  
const DataLoader = require('dataloader');

const userLoader = new DataLoader(async (ids) => {
  // Simulate batch DB call
  console.log('Batch loading users:', ids);
  return ids.map(id => users.find(user => user.id === id));
});
###

---

## 🛠️ Step 3: Use DataLoader in Resolvers

Modify the resolver to use `userLoader`:

###  
const root = {
  user: ({ id }) => userLoader.load(id),

  users: () => users,
};
###

---

## 🧪 Step 4: Testing Batching

Query multiple users:

###  
{
  user(id: "1") { id name }
  user(id: "2") { id name }
}
###

Console output will show a single batch load call with both IDs.

---

## 💾 What Is Caching?

Caching stores previously fetched data to avoid redundant work in subsequent queries.

DataLoader caches per request lifecycle by default.

---

## 🧠 Summary

- Batching reduces the number of calls by grouping requests  
- DataLoader is the standard tool for batching and caching  
- Caching improves performance by reusing loaded data  

---

## ▶️ Next Episode

Next, we'll explore **GraphQL Schema Stitching and Federation**.

➡️ Episode 12: Schema Stitching and Federation in GraphQL
