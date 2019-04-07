const exchangeController = require("../controllers/exchangeController");

const routes = [
  {
    method: "OPTIONS",
    url: "/api/exchanges",
    handler: exchangeController.emptyReq
  },
  {
    method: "GET",
    url: "/api/exchange/:from/:to/:amount",
    handler: exchangeController.convertExchange
  },
  {
    method: "GET",
    url: "/api/exchanges",
    handler: exchangeController.getExchanges
  },
  {
    method: "GET",
    url: "/api/exchange/:id",
    handler: exchangeController.getSingleExchange
  },
  {
    method: "POST",
    url: "/api/exchange",
    handler: exchangeController.addExchange
  },
  {
    method: "PUT",
    url: "/api/exchange/:id",
    handler: exchangeController.updateExchange
  },
  {
    method: "DELETE",
    url: "/api/exchange/:id",
    handler: exchangeController.deleteExchange
  }
];

module.exports = routes;
