import fastify from "fastify";
import vehicleController from '../controllers/vehicleController.js'

async function routes (fastify, options) {
    fastify.get('/', vehicleController.getAllVehicles)
    fastify.get('/:id', vehicleController.getVehicleById)
}

export default routes