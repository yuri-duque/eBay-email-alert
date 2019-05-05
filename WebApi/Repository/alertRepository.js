const { ObjectId } = require("mongodb");
const dbExport = require("../Service/mongoService");
const dbConfig = require("../Config/dbConfig");

class AlertRepository {
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

  async findAlert(searchTerm, email) {
    if (dbExport) {
      return new Promise((resolve, reject) => {
        dbExport
          .then(db => {
            const collection = db.collection(dbConfig.collection);
            collection
              // eslint-disable-next-line object-shorthand
              .find({ searchTerm: searchTerm, email: email })
              .toArray((err, alerts) => {
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

      const resultfind = await this.findAlert(
        newAlert.searchTerm,
        newAlert.email
      );

      if (resultfind.length !== 0) {
        return { sucess: false, alertExist: true };
      }

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
    const id = new ObjectId(alert.id);

    // Usado Promise para que só retorna valor quando terminar a execução da consulta no banco
    return new Promise((resolve, reject) => {
      dbExport
        .then(db => {
          const collection = db.collection(dbConfig.collection);
          collection
            .updateOne({ _id: id }, { $set: alert })
            .then(result => {
              if (result.modifiedCount > 0) {
                resolve({ ...alert, _id: id.toHexString() });
              } else {
                reject();
              }
            })
            .catch(reject);
        })
        .catch(reject);
    });
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
    const uniqueId =
      Math.random()
        .toString(36)
        .substring(2) + new Date().getTime().toString(36);

    return uniqueId;
  }
}

module.exports = AlertRepository;
