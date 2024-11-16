import prisma from "../prisma.js";

const vehicleController = {
    async getAllVehicles (request, reply) {
        return { hello: 'world' }
    }, 
    async getVehicleById (request, reply) {
        const {id} = request.params
        return { id: id }
    }
}

export default vehicleController