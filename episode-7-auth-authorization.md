# Episode 7: Authentication & Authorization in GraphQL

## 📌 Overview
This episode teaches how to secure your GraphQL API using JWT-based authentication and role-based access control within resolvers.

## 🔐 JWT Authentication
### Setup
Install required packages:
```bash
npm install jsonwebtoken bcryptjs
```

### Generate Token on Login
```javascript
const jwt = require('jsonwebtoken');

const login = async (_, { email, password }, { prisma }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign({ userId: user.id, role: user.role }, 'SECRET_KEY');
  return { token };
};
```

### Add Context to Apollo Server
```javascript
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    try {
      const decoded = jwt.verify(token, 'SECRET_KEY');
      return { user: decoded };
    } catch {
      return {};
    }
  },
});
```

## 🛡️ Role-Based Authorization
Restrict access in resolvers:
```javascript
createBook: async (_, args, context) => {
  if (context.user.role !== 'ADMIN') {
    throw new Error("Not authorized");
  }
  return prisma.book.create({ data: args });
}
```

## ✅ Summary
- Implemented JWT login and token generation
- Injected authenticated user into the request context
- Applied access control logic in resolvers

## 💡 Exercise
- Create a `me` query that returns the current user’s profile
- Add a role enum (e.g., USER, ADMIN) to your schema

---