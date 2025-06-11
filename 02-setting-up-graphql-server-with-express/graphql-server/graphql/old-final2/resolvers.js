const fs = require("fs");
const dataFile = "graphql-server/data/countries.json";

const loadData = () => JSON.parse(fs.readFileSync(dataFile, "utf-8"));

const resolvers = {
  countries: () => loadData(),
  country: ({ code }) => loadData().find(c => c.code === code),
  addCountry: ({ code, name }) => {
    let data = loadData();
    const newCountry = { code, name };
    data.push(newCountry);
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    return newCountry;
  },
  editCountry: ({ code, name }) => {
    let data = loadData();
    let country = data.find(c => c.code === code);
    if (!country) return null;
    country.name = name;
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    return country;
  },
  deleteCountry: ({ code }) => {
    let data = loadData().filter(c => c.code !== code);
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    return "Country deleted.";
  }
};

module.exports = resolvers;
