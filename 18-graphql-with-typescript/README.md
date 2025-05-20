# Episode 18: Real-time Subscriptions in GraphQL

Welcome to **Episode 18** of the GraphQL Mastery Course! Today, we’ll learn how to implement real-time updates with **GraphQL Subscriptions**.

---

## 🎯 Goals

- Understand what subscriptions are  
- Setup a basic subscription server using `graphql-ws`  
- Write subscription schema and resolvers  
- Test real-time data updates  

---

## 🔹 What Are Subscriptions?

Subscriptions let clients receive real-time data via WebSockets, ideal for chat apps, notifications, live feeds.

---

## 🛠️ Step 1: Define Subscription in Schema

###  
type Subscription {
  messageAdded: Message
}

type Message {
  id: ID!
  content: String!
  author: String!
}
###

---

## ⚙️ Step 2: Setup Subscription Server

Install dependencies:

###  
npm install graphql-ws ws
###

Basic server setup (Node.js + Express example):

###  
const { createServer } = require('http');
const { useServer } = require('graphql-ws/lib/use/ws');
const { WebSocketServer } = require('ws');
const { execute, subscribe } = require('graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Subscription {
    messageAdded: Message
  }
  type Message {
    id: ID!
    content: String!
    author: String!
  }
  type Query {
    _empty: String
  }
`);

const root = {
  subscription: {
    messageAdded: {
      subscribe: (root, args, { pubsub }) => pubsub.asyncIterator('MESSAGE_ADDED')
    }
  }
};

const pubsub = {
  asyncIterator: (eventName) => {
    // Implement async iterator for pubsub events
  }
};

const server = createServer
