const boom = require("boom");
const Exchange = require("../models/Exchange");

exports.convertExchange = async (req, reply) => {
  try {
    const BASE = await Exchange.find({ "symbol" : "KHR" }, { rate: 1, _id: 0});
    const BASE_USD_KHR = BASE[0].rate;
    const BASE_USD_EUR = 0.89;

    const from_symbol = req.params.from;
    const to_symbol = req.params.to;
    const amount = parseFloat(req.params.amount);
    //const exchangeFrom = await Exchange.find({ "symbol": from_symbol }, { symbol: 1, rate: 1 , _id: 0 });
    const exchangeTo = await Exchange.find({ "symbol": to_symbol }, { symbol: 1, rate: 1 , _id: 0 });

    let VALUE = 0;
    switch (from_symbol) {
      case 'USD':
        VALUE = amount * exchangeTo[0].rate;
      break;
      case 'KHR':
        VALUE = amount / BASE_USD_KHR;
      break;
      case 'EUR':
        VALUE = amount / BASE_USD_EUR;
    }

    const res = {
      "from": from_symbol,
      "to": exchangeTo[0].symbol,
      "rate": {
        "amount": amount,
        "value": VALUE
      }
    };
    return res;
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.emptyReq = async(req, reply) => {
  return 0;
}

exports.getExchanges = async (req, reply) => {
  try {
    const exchange = await Exchange.find();
    return exchange;
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.getSingleExchange = async (req, reply) => {
  try {
    const id = req.params.id;
    const exchange = await Exchange.findById(id);
    return exchange;
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.addExchange = async (req, reply) => {
  try {
    const exchange = new Exchange(req.body);
    return exchange.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.updateExchange = async (req, reply) => {
  try {
    const id = req.params.id;
    const exchange = req.body;
    const { ...updateData } = exchange;
    const update = await Exchange.findByIdAndUpdate(id, updateData, {
      new: true
    });
    return update;
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.deleteExchange = async (req, reply) => {
  try {
    const id = req.params.id;
    const exchange = await Exchange.findByIdAndRemove(id);
    return exchange;
  } catch (err) {
    throw boom.boomify(err);
  }
};
