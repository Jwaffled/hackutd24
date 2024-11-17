import { Decimal } from "@prisma/client/runtime/library";
import prisma from "../prisma.js";

const dropdownController = {
    async getModelDropdown (request, reply) {
        const make = request.query.make
        if(!make) {
            reply.code(400).send({error: "Missing query parameter make"})
            return
        }

        const year = parseInt(request.query.year)
        let res : {model: string, engine_displacement: Decimal, cylinders: number, vehicle_id: number}[];

        if(!isNaN(year)) {
            res = await prisma.vehicle.findMany({
                select: {
                    model: true,
                    vehicle_id: true,
                    engine_displacement: true,
                    cylinders: true,
                },
                where: {
                    make: make,
                    year: year
                },
                distinct: ['model']
            })
        } else {
            res = await prisma.vehicle.findMany({
                select: {
                    model: true,
                    vehicle_id: true,
                    engine_displacement: true,
                    cylinders: true,
                },
                where: {
                    make: make
                },
                distinct: ['model']
            })
        }
        const models = res.map((obj) => { return {model: obj.model, display: `${obj.model} ${ !obj.engine_displacement ? "" : `(${obj.cylinders} cyl ${obj.engine_displacement.toFixed(1)} L)`}`}});
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