const fs = require("fs");
const dataFile = "graphql-server/data/countries.json";

const loadData = () => JSON.parse(fs.readFileSync(dataFile, "utf-8"));

const resolvers = {
  countries: () => loadData()
};

module.exports = resolvers;
