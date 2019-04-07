const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/webapi")
  .then(() => console.log("MongoDB connected…"))
  .catch(err => console.log(err));

const routes = require("./routes");

const fastify = require("fastify")({
  logger: true
});
const fastifyStatic = require('fastify-static')
const path = require('path')

fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../', 'public'),
  prefix: '/'
});

routes.forEach((route, index) => {
  fastify.route(route);
});

const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
