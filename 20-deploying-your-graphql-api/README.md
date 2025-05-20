# Episode 20: Deploying and Monitoring GraphQL APIs

Welcome to **Episode 20** of the GraphQL Mastery Course! Today, we’ll cover best practices for deploying your GraphQL API and monitoring it in production.

---

## 🎯 Goals

- Deploy GraphQL API to cloud providers (e.g., AWS, Azure, Heroku)  
- Use environment variables securely  
- Monitor API performance and errors  
- Setup logging and alerting  

---

## 🚀 Step 1: Deploying to Heroku (Example)

###  
# Procfile
web: node index.js

# Deploy commands
git init
heroku create my-graphql-app
git add .
git commit -m "Deploy GraphQL API"
git push heroku master
###

---

## 🔐 Step 2: Use Environment Variables

Manage secrets and configs using `.env`

###  
// .env
PORT=4000
DATABASE_URL=mongodb://username:password@host:port/dbname
###

Load with `dotenv`:

###  
require('dotenv').config();
const port = process.env.PORT || 4000;
###

---

## 📊 Step 3: Monitoring with Apollo Studio or Grafana

- Use Apollo Studio to monitor queries, errors, and performance  
- Integrate Prometheus and Grafana for custom dashboards  
- Enable request tracing and logging  

---

## 🛠️ Step 4: Logging and Alerts

Use tools like `winston` or cloud provider logging:

###  
const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'errors.log', level: 'error' }),
  ],
});

app.use((err, req, res, next) => {
  logger.error(err.message);
  next(err);
});
###

Setup alerting with PagerDuty, Opsgenie, or cloud-native alerts.

---

## 🧠 Summary

- Deploy your GraphQL API using
