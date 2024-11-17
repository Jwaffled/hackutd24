import fastify from "fastify";
import dropdownController from '../controllers/dropdownController.js'

async function routes (fastify, options) {
    fastify.get('/model', dropdownController.getModelDropdown)
    fastify.get('/make', dropdownController.getMakeDropdown)
    fastify.get('/year', dropdownController.getYearDropdown)
}

export default routes