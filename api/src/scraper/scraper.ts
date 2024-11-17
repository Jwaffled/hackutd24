import { Prisma } from '@prisma/client';
import * as fs from 'fs';
import path from 'path';
import sax from 'sax';
import prisma from '../prisma';

// https://www.fueleconomy.gov/feg/ws/index.shtml
interface RawVehicleData {
    id: number,
    battery: string,
    atvType: string,
    barrels08: number,
    barrelsA08: number,
    charge120: number,
    charge240: number,
    city08: number,
    city08U: number,
    cityA08: number,
    cityA08U: number,
    cityCD: number,
    cityE: number,
    cityMpk: number,
    cityUmpk: number,
    cityUF: number,
    co2: number,
    co2A: number,
    co2TailpipeAGpm: number,
    co2TailpipeGpm: number,
    comb08: number,
    comb08U: number,
    combA08U: number,
    combE: number,
    combMpk: number,
    combUmpk: number,
    combinedCD: number,
    combinedUF: number,
    cylinders: number,
    displ: number,
    drive: string,
    emissionsList: Array<Emissions>,
    engId: number,
    eng_dscr: string,
    evMotor: number,
    feScore: number,
    fuelCost08: number,
    fuelCostA08: number,
    fuelType: string,
    fuelType1: string,
    fuelType2: string,
    ghgScore: number,
    ghgScoreA: number,
    guzzler: string,
    highway08: number,
    highway08U: number,
    highwayA08: number,
    highwayA08U: number,
    highwayCD: number,
    highwayE: number,
    highwayMpk: number,
    highwayUmpk: number,
    highwayUF: number,
    hlv: number,
    hpv: number,
    lv2: number,
    lv4: number,
    make: string,
    mfrCode: string,
    model: string,
    mpgData: 'Y' | 'N',
    phevBlended: boolean,
    pv2: number,
    pv4: number,
    rangeA: number,
    rangeCityA: number,
    rangeHwyA: number,
    trans_dscr: string,
    trany: string,
    UCity: number,
    UCityA: number,
    UHighway: number,
    UHighwayA: number,
    VClass: string,
    year: number,
    youSaveSpend: number,
    sCharger: string,
    tCharger: string,
    c240Dscr: string,
    charge240b: number,
    c240bDscr: string,
    createdOn: Date,
    modifiedOn: Date,
    startStop: 'Y' | 'N' | '',
    phevCity: number,
    phevHwy: number,
    phevComb: number,
    basemodel: string,
}

interface Emissions {
    efid: number,
    id: number,
    salesArea: number,
    score: number,
    scoreAlt: number,
    smartwayScore: number,
    standard: string,
    stdText: string,
}

interface FuelPrices {
    midgrade: number,
    premium: number,
    regular: number,
    cng: number,
    diesel: number,
    e85: number,
    electric: number,
    lpg: number
}

interface YourMpgVehicle {
    avgMpg: number,
    cityPercent: number,
    highwayPercent: number,
    maxMpg: number,
    minMpg: number,
    recordCount: number,
    vehicleId: number
}

interface YourMpgDriverVehicle {
    cityPercent: number,
    highwayPercent: number,
    lastDate: Date,
    mpg: number,
    state: string,
    vehicleId: number
}

export function parseScrapedData() {
    const filePath = path.resolve(__dirname, '../../data/vehicles.xml');
    const stream = fs.createReadStream(filePath, { encoding: 'utf-8' });
    const streamParser = sax.createStream(true);

    const uniqueTags = new Set();
    const fuelTypeValues = new Set();
    
    let currentTag: string = null;
    let currentVehicle: Partial<RawVehicleData> = null;
    const vehicleData = [];
    let tagStack = [];

    streamParser.on('opentag', (node) => {
        if (node.name !== 'vehicles' && node.name !== 'vehicle') {
            tagStack.push(node.name);
            uniqueTags.add(node.name);
        }
        if (node.name === 'vehicle') {
            currentVehicle = {};
        } else if (currentVehicle) {
            currentTag = tagStack.join('.');
        }
    });

    streamParser.on('text', (text) => {
        if (currentTag && currentVehicle) {
            if (currentTag.endsWith('cylinders')) {
                fuelTypeValues.add(text);
            }
            const keys = currentTag.split('.');
            let target = currentVehicle;
            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                target[key] = target[key] || {};
                target = target[key];
            }
            if (!isNaN(parseFloat(text.trim()))) {
                target[keys[keys.length - 1]] = parseFloat(text.trim());
            } else {
                target[keys[keys.length - 1]] = text.trim();
            }
            
        }
    });

    streamParser.on('closetag', (tagName) => {
        if (tagName !== 'vehicles' && tagName !== 'vehicle') {
            tagStack.pop();
        }
        if (tagName === 'vehicle' && currentVehicle) {
            // if (test) console.log("VEHICLE: " + JSON.stringify(currentVehicle));
            // test = false;
            vehicleData.push(currentVehicle as RawVehicleData);
            currentVehicle = null;
        }

        if (currentTag && currentTag.endsWith(tagName)) {
            currentTag = null;
        }
    });

    streamParser.on('end', async () => {
        console.log("Finished with data");
        // console.log(vehicleData);
        console.log(fuelTypeValues);
        await uploadToDatabase(vehicleData);
    });

    stream.pipe(streamParser);
}

async function uploadToDatabase(data: Array<RawVehicleData>) {
    const modifiedData: Array<Prisma.VehicleCreateManyInput> = [];
    for (let item of data) {
        let isGas = (item.fuelType1.includes("Gasoline") || item.fuelType1.includes("Diesel")) && !item.fuelType2;
        let isHydrogen = item.fuelType === "Hydrogen";
        let isElectric = item.fuelType === "Electricity";
        let isHybrid = !isGas && !isElectric && !isHydrogen;
        let obj: Prisma.VehicleCreateInput = {
            vehicle_id: item.id,
            make: item.make?.toString() ?? "",
            model: item.model?.toString() ?? "",
            year: item.year,
            avg_city_mpg: item.city08U || item.city08,
            avg_hwy_mpg: item.highway08U || item.highway08,
            avg_comb_mpg: item.comb08U || item.comb08,
            engine_displacement: item.displ?.toString() === "NA" ? 0 : item.displ,
            cylinders: item.cylinders?.toString() === "NA" ? 0 : item.cylinders,
            drive_type: item.drive?.toString() ?? "",
            is_gas: isGas,
            is_hydrogen: isHydrogen,
            is_electric: isElectric,
            is_hybrid: isHybrid,
            is_turbocharged: item.tCharger === 'T',
            is_supercharged: item.sCharger === 'S'
        };
        modifiedData.push(obj);
    }

    await prisma.vehicle.createMany({
        data: modifiedData
    });
    
}