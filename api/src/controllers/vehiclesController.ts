import { FastifyRequest } from "fastify";
import prisma from "../prisma.js";

interface IEntriesResponse {
    year: number,
    make: string,
    model: string,
    cylinders: number,
    displacement: number,
    recordsReturned: number,
    data: Array<{
        cityPercent: number,
        highwayPercent: number,
        mpg: number,
        state: string,
        lastDate: Date
    }>,
    fallbackStats?: {
        avgCityMpg: number,
        avgHwyMpg: number,
        avgCombMpg: number,
    }
}

interface IAggregateWhereQuery {
    make: string,
    year?: {
        gte?: number,
        lte?: number
    },
    model?: string
}

const vehiclesController = {
    async getEntriesById(request, reply) {
        const vehicleId = parseInt(request.query['vehicleId']);
        if (isNaN(vehicleId)) {
            reply.code(400).send({ error: "Missing query parameter vehicleId" });
            return;
        }

        const req = await fetch(`https://www.fueleconomy.gov/ws/rest/ympg/shared/ympgDriverVehicle/${vehicleId}`, {
            headers: {
                'Accept': 'application/json'
            }
        });

        let points = (await req.json())?.yourMpgDriverVehicle ?? [];
        if (!Array.isArray(points)) {
            points = [points];
        }
        const vehicleInfo = await prisma.vehicle.findFirst({
            select: {
                year: true,
                make: true,
                model: true,
                cylinders: true,
                engine_displacement: true,
                avg_city_mpg: true,
                avg_hwy_mpg: true,
                avg_comb_mpg: true,
            },
            where: {
                vehicle_id: vehicleId
            }
        });
        
        const data: IEntriesResponse = {
            year: vehicleInfo.year,
            make: vehicleInfo.make,
            model: vehicleInfo.model,
            cylinders: vehicleInfo.cylinders,
            displacement: vehicleInfo.engine_displacement?.toNumber(),
            recordsReturned: points.length,
            data: points,
            fallbackStats: points.length == 0 ? undefined : {
                avgCityMpg: vehicleInfo.avg_city_mpg.toNumber(),
                avgHwyMpg: vehicleInfo.avg_hwy_mpg.toNumber(),
                avgCombMpg: vehicleInfo.avg_comb_mpg.toNumber()
            }
        }

        reply.code(200).send(data);
    },

    async aggregate(request, reply) {
        const make = request.query.make;

        if(!make) {
            reply.code(400).send({error: "Missing query parameter make"})
            return
        }

        const startYear = parseInt(request.query.startYear)
        const endYear = parseInt(request.query.endYear)

        if(!isNaN(startYear) && !isNaN(endYear) && endYear < startYear) {
            reply.code(400).send({error: "Illegal: Query parameter endYear is less than startYear"})
            return
        }

        const model = request.query.model

        let res : any;

        if(!isNaN(startYear) && !isNaN(endYear)) {
            const whereQuery: IAggregateWhereQuery = {
                make: make,
                year: {
                    gte: startYear,
                    lte: endYear
                }
            }

            if(model) {
                whereQuery.model = model
            }

            res = await prisma.vehicle.findMany({
                where: whereQuery
            })
        } else if(!isNaN(startYear)) {
            const whereQuery: IAggregateWhereQuery = {
                make: make,
                year: {
                    gte: startYear
                }
            }

            if(model) {
                whereQuery.model = model
            }

            res = await prisma.vehicle.findMany({
                where: whereQuery
            })

        } else if(!isNaN(endYear)) {
            const whereQuery: IAggregateWhereQuery = {
                make: make,
                year: {
                    lte: endYear
                }
            }

            if(model) {
                whereQuery.model = model
            }

            res = await prisma.vehicle.findMany({
                where: whereQuery
            })
        } else {
            const whereQuery: IAggregateWhereQuery = {
                make: make
            }

            if(model) {
                whereQuery.model = model
            }
            res = await prisma.vehicle.findMany({
                where: whereQuery
            })
        }

        reply.code(200).send(res);

    }
}

export default vehiclesController