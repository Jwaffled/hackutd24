import prisma from "../prisma.js";

const dropdownController = {
    async getModelDropdown (request, reply) {
        const make = request.query.make
        if(!make) {
            reply.code(400).send({error: "Missing query parameter make"})
            return
        }

        const year = parseInt(request.query.year)
        let res : {model: string, vehicle_id: number}[];

        if(!isNaN(year)) {
            res = await prisma.vehicle.findMany({
                select: {
                    model: true,
                    vehicle_id: true
                },
                where: {
                    make: make,
                    year: year
                }
            })
        } else {
            res = await prisma.vehicle.findMany({
                select: {
                    model: true,
                    vehicle_id: true
                },
                where: {
                    make: make
                },
                distinct: ['model']
            })
        }
        const models = res.map(obj => { return { vehicle_id: obj.vehicle_id, model: obj.model } });
        reply.code(200).send(models)
        return
    }, 
    async getMakeDropdown (request, reply) {
        const year = parseInt(request.query.year)
        let res : {make: string}[];

        if(!isNaN(year)) {
            res = await prisma.vehicle.findMany({
                select: {
                    make: true
                },
                where: {
                    year: year
                },
                distinct: ['make']
            })
        } else {
            res = await prisma.vehicle.findMany({
                select: {
                    make: true
                },
                distinct: ['make']
            })
        }
        const makes = res.map((obj: {make: string}) => obj.make)
        reply.code(200).send(makes)
        return
    },
    async getYearDropdown (request, reply) {
        const model = request.query.model
        const make = request.query.make
        
        let res : {year: number}[];

        if(model && make) {
            res = await prisma.vehicle.findMany({
                select: {
                    year: true
                },
                where: {
                    model: model,
                    make: make
                },
                distinct: ['year']
            })
        } else if(model){
            res = await prisma.vehicle.findMany({
                select: {
                    year: true
                },
                where: {
                    model: model
                },
                distinct: ['year']
            })
        } else if(make) {
            res = await prisma.vehicle.findMany({
                select: {
                    year: true
                },
                where: {
                    make: make
                },
                distinct: ['year']
            })
        } else {
            res = await prisma.vehicle.findMany({
                select: {
                    year: true
                },
                distinct: ['year']
            })
        }

        const years = res.map((obj: {year: number}) => obj.year);
        reply.code(200).send(years)
        return
    },

}

export default dropdownController