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

        const points: Array<any> = (await req.json())?.yourMpgDriverVehicle ?? [];

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
            displacement: vehicleInfo.engine_displacement.toNumber(),
            recordsReturned: points.length,
            data: points,
            fallbackStats: points.length == 0 ? undefined : {
                avgCityMpg: vehicleInfo.avg_city_mpg.toNumber(),
                avgHwyMpg: vehicleInfo.avg_hwy_mpg.toNumber(),
                avgCombMpg: vehicleInfo.avg_comb_mpg.toNumber()
            }
        }

        reply.code(200).send(data);
    }
}

export default vehiclesController