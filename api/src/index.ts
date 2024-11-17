import Fastify from 'fastify'
import vehicleRoutes from './routes/vehicleRoutes.js'
import { parseScrapedData } from './scraper/scraper.js';

const fastify = Fastify({ logger: true });

const PORT = 3000;

fastify.register(vehicleRoutes, {prefix: '/vehicle'})

// fastify.get('/', (request, reply) => {
//   reply.send({ hello: 'world' });
// });

const start = async () => {
    parseScrapedData();
    try {
      await fastify.listen({ port: PORT })
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
}
start()