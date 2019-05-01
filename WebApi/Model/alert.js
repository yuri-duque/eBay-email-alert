const mongoose = require("mongoose");

const AlertSchema = mongoose.Schema({
  searchTerm: String,
  email: String,
  timeInterval: Number
});

module.exports = mongoose.model("Alert", AlertSchema);
