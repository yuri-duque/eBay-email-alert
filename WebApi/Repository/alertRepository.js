const dbExport = require("../Service/MongoService");
const dbConfig = require("../Config/dbConfig");

class AlertRepository {
  async findById(alertId) {
    if (dbExport && alertId) {
      return new Promise((resolve, reject) => {
        dbExport
          .then(db => {
            const collection = db.collection(dbConfig.collection);
            collection.find({ id: alertId }).toArray((err, alerts) => {
              if (err) reject(err);
              resolve(alerts); // retorna o array caso consiga buscar com sucesso
            });
          })
          .catch(err => {
            reject(err);
          });
      });
    }

    return { sucess: false };
  }

  async list() {
    if (dbExport) {
      return new Promise((resolve, reject) => {
        dbExport
          .then(db => {
            const collection = db.collection(dbConfig.collection);
            collection.find({}).toArray((err, alerts) => {
              if (err) reject(err);
              resolve(alerts); // retorna o array caso consiga buscar com sucesso
            });
          })
          .catch(err => {
            reject(err);
          });
      });
    }

    return { sucess: false };
  }

  async create(alert) {
    if (alert && dbExport) {
      const newAlert = { id: this.uniqueId(), ...alert };
      // Usado Promise para que só retorna valor quando terminar a execução da consulta no banco
      return new Promise((resolve, reject) => {
        dbExport
          .then(db => {
            const collection = db.collection(dbConfig.collection);
            collection.insertOne(newAlert);
            resolve(newAlert);
          })
          .catch(err => {
            reject(err);
          });
      });
    }

    return { sucess: false };
  }

  async update(alert) {
    if (alert && dbExport) {
      // Usado Promise para que só retorna valor quando terminar a execução da consulta no banco
      const findAlert = this.findById(alert.id);

      if (findAlert) {
        return new Promise((resolve, reject) => {
          dbExport
            .then(db => {
              const collection = db.collection(dbConfig.collection);
              collection.updateOne(alert);
              resolve(alert);
            })
            .catch(err => {
              reject(err);
            });
        });
      }
    }

    return { sucess: false, alert: "Invalid alert" };
  }

  async delete(alert) {
    if (alert) {
      return new Promise((resolve, reject) => {
        dbExport
          .then(db => {
            const collection = db.collection(dbConfig.collection);
            collection
              .deleteOne(alert.id)
              .then(result => {
                if (result.deletedCount && result.deletedCount > 0) {
                  resolve(alert);
                } else {
                  reject();
                }
              })
              .catch(reject);
            resolve(alert);
          })
          .catch(err => {
            reject(err);
          });
      });
    }

    return { sucess: false, alert: "Invalid alert" };
  }

  uniqueId() {
    let uniqueId =
      Math.random()
        .toString(36)
        .substring(2) + new Date().getTime().toString(36);

    return uniqueId;
  }
}

module.exports = AlertRepository;
