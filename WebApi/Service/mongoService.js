const { MongoClient } = require("mongodb");
const dbConfig = require("../Config/dbConfig");

const client = new MongoClient(dbConfig.url);

const dbExport = new Promise((resolve, reject) => {
  client.connect(err => {
    if (err) {
      reject(err); // Se der erro ao conectar, rejeita com o erro
    }
    const db = client.db(dbConfig.dbName);
    resolve(db); // Se não der erro ao conectar, retorna o db
  });
});

module.exports = dbExport;
