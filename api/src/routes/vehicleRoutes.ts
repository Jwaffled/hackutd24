import fastify, { FastifyInstance } from "fastify";
import vehiclesController from '../controllers/vehiclesController.js'

async function routes (fastify: FastifyInstance, options) {
    fastify.get('/entries', vehiclesController.getEntriesById);
}

export default routes