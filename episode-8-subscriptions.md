# Episode 8: GraphQL Subscriptions (Real-Time Updates)

## 📌 Overview
This episode introduces GraphQL subscriptions, enabling real-time updates using WebSockets. We'll build a live chat example using Apollo Server.

## 🔧 Setup Subscription Server
Install WebSocket support:
```bash
npm install graphql-ws
```

Update server setup:
```javascript
const { createServer } = require('http');
const { useServer } = require('graphql-ws/lib/use/ws');
const { WebSocketServer } = require('ws');

const httpServer = createServer(app);

const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql' });

useServer({ schema }, wsServer);

httpServer.listen(4000);
```

## 📡 Defining Subscriptions
Add to schema:
```graphql
type Subscription {
  messageSent: Message
}
```

Publish from resolver:
```javascript
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const resolvers = {
  Mutation: {
    sendMessage: async (_, { content, userId }) => {
      const message = await prisma.message.create({ data: { content, userId } });
      pubsub.publish("MESSAGE_SENT", { messageSent: message });
      return message;
    },
  },
  Subscription: {
    messageSent: {
      subscribe: () => pubsub.asyncIterator(["MESSAGE_SENT"]),
    },
  },
};
```

## 🧪 Test in Apollo Studio
Use the subscriptions tab to listen for updates:
```graphql
subscription {
  messageSent {
    content
    userId
  }
}
```

## ✅ Summary
You now know how to implement real-time updates with GraphQL using subscriptions. Great for features like chat, notifications, and live feeds.

## 💡 Exercise
- Implement a `userTyping` subscription event
- Add timestamps to messages

---