const db = [];

class AlertRepository {
  async findIndexById(alertId) {
    return db.findIndex(x => x.id === alertId);
  }

  async list(searchTerm) {
    if (searchTerm) {
      return {
        sucess: true,
        alerts: db.find(x => x.searchTerm === searchTerm)
      };
    }

    return { sucess: true, alerts: db };
  }

  async create(alert) {
    if (alert) {
      const newAlert = { id: db.length, ...alert };
      db.push(newAlert);

      return { sucess: true, newAlert };
    }

    return { sucess: false, alert: "Invalid alert" };
  }

  async update(alert) {
    if (alert) {
      const index = this.findIndexById(alert.id);

      if (index !== -1) {
        db[index] = alert;
      }

      return { sucess: true, alert };
    }

    return { sucess: false, alert: "Invalid alert" };
  }

  async delete(alertId) {
    if (alertId) {
      const index = this.findIndexById(alertId);

      if (index !== -1) {
        db.splice(index, 1);
      }

      return { sucess: true };
    }

    return { sucess: false, alert: "Invalid alert" };
  }
}

module.exports = AlertRepository;
