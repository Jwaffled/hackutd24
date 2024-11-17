import fastify, { FastifyInstance } from "fastify";
import vehiclesController from '../controllers/vehiclesController.js'

async function routes (fastify: FastifyInstance, options) {
    fastify.get('/entries', vehiclesController.getEntriesById);
    fastify.get('/entries/GetByName', vehiclesController.getEntriesByName);
    fastify.get('/aggregate', vehiclesController.aggregate);
}

export default routes