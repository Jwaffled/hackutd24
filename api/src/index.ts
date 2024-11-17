import Fastify from 'fastify'
import vehicleRoutes from './routes/vehicleRoutes.js'
import dropdownRoutes from './routes/dropdownRoutes.js'
import { parseScrapedData } from './scraper/scraper.js';

const fastify = Fastify({ logger: true });

const PORT = 3000;

fastify.register(vehicleRoutes, {prefix: '/vehicle'})
fastify.register(dropdownRoutes, {prefix: '/dropdowns'})

// fastify.get('/', (request, reply) => {
//   reply.send({ hello: 'world' });
// });

const start = async () => {
    try {
      await fastify.listen({ port: PORT })
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
}
start()