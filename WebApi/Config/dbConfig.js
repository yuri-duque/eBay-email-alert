module.exports = {
  url: process.env.mongoUrl || "mongodb://localhost:27017/",
  dbName: process.env.dbName || "ebayAlerts",
  collection: process.env.collection || "alerts"
};
