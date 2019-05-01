const { MongoClient } = require("mongodb");
const dbConfig = require("../Config/dbConfig");

const client = new MongoClient(dbConfig.url);

const dbExport = new Promise((resolve, reject) => {
  client.connect(err => {
    if (err) {
      reject(err); // Se der erro, rejeita com o erro
    }
    const db = client.db(dbConfig.dbName);
    resolve(db); // Se não der erro(não cair no if acima), retorna o db
  });
});

module.exports = dbExport;
