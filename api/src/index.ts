import Fastify from 'fastify'
import vehicleRoutes from './routes/vehicleRoutes.js'
import dropdownRoutes from './routes/dropdownRoutes.js'
import { parseScrapedData } from './scraper/scraper.js';
import cors from '@fastify/cors';

const fastify = Fastify({ logger: true });

const PORT = 3000;

fastify.register(dropdownRoutes, {prefix: '/dropdowns'})
fastify.register(vehicleRoutes, {prefix: '/vehicles'})
fastify.register(cors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
})

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