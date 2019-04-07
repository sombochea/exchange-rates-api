const mongoose = require("mongoose");

const exchangeSchema = new mongoose.Schema({
  symbol: String,
  rate: Number
});

module.exports = mongoose.model("Exchanges", exchangeSchema);
