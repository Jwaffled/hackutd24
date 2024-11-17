import { Box, Card, Center, Container, Flex, Select, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { ScatterChart, ScatterChartSeries } from "@mantine/charts";
import { Button } from "@mantine/core";

const AggregatePage: React.FC = () => {
    
    const [makeData, setMakeData] = useState<string[]>([]);
    const [modelSelectDisabled, setModelSelectDisabled] = useState(true);
    const [makeValue, setMakeValue] = useState<string | null>(null);
    const [modelData, setModelData] = useState<string[]>([]);
    const [modelValue, setModelValue] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<number>();
    const [endDate, setEndDate] = useState<number>();
    const [startDateData, setStartDateData] = useState<number[]>([]);
    const [endDateData, setEndDateData] = useState<number[]>([]);
    const [xAxisValue, setXAxisValue] = useState<string>("year");
    const [yAxisValue, setYAxisValue] = useState<string>("avg_comb_mpg");
    const [aggregateData, setAggregateData] = useState<object[]>([])
    

    const defaultGraphData: ScatterChartSeries[] = [
        {
            name: 'Group 1',
            color: 'blue.5',
            data: [{[xAxisValue]: 1, [yAxisValue]: 2}]
        }
    ];

    const [graphData, setGraphData] = useState<ScatterChartSeries[]>(defaultGraphData)
    

    useEffect(() => {
        const fetchMakeData = async () => {
            const res = await fetch("http://localhost:3000/dropdowns/make");
            const data = await res.json()
            data.sort()
            setMakeData(data)
        }
        
        fetchMakeData()
    }, [])

    useEffect(() => {
        const fetchModelData = async () => {
            const res = await fetch(`http://localhost:3000/dropdowns/model?make=${makeValue}`);
            const data = await res.json()
            data.sort()
            setModelData(data)
        }
        fetchModelData()
    }, [makeValue])
    
    useEffect(() => {
        const fetchStartDateData = async () => {
            const res = await fetch(`http://localhost:3000/dropdowns/year?make=${makeValue}&model=${modelValue}`);
            const data: number[] = await res.json()
            let filteredData = data;
            if(endDate) {
                filteredData = data.filter(date => date <= endDate)
            }
            filteredData.sort()
            setStartDateData(filteredData)
        }
        fetchStartDateData()
    }, [makeValue, modelValue, endDate])

    useEffect(() => {
        const fetchEndDateData = async () => {
            const res = await fetch(`http://localhost:3000/dropdowns/year?make=${makeValue}&model=${modelValue}`);
            const data: number[] = await res.json()
            let filteredData = data;
            if(startDate) {
                filteredData = data.filter(date => date >= startDate)
            }
            filteredData.sort()
            setEndDateData(filteredData)
        }
        fetchEndDateData()
    }, [makeValue, modelValue, startDate])

    useEffect(() => {
        const graphInnerData = aggregateData.map((object: any, index: number) => {
            let coordinatePair: any = {};
            if(object.hasOwnProperty(xAxisValue)) {
                coordinatePair[xAxisValue] = object[xAxisValue]
            }
            if(object.hasOwnProperty(yAxisValue)) {
                coordinatePair[yAxisValue] = object[yAxisValue]
            }
            return coordinatePair;
        })
        const graphInnerDataWrapper: ScatterChartSeries[] = [
            {
                color: 'blue.5',
                name:"Group1",
                data: graphInnerData
            }
        ]
        
        setGraphData(graphInnerDataWrapper)

        console.log(graphData)
    }, [xAxisValue, yAxisValue])

    const generateGraph = async () => {
        if(!makeValue) {
            return
        }

        const res = await fetch(`http://localhost:3000/vehicles/aggregate?make=${makeValue}&model=${modelValue}&startYear=${startDate}&endYear=${endDate}`)
        const data = await res.json()
        setAggregateData(data)
        console.log(data)
        const graphInnerData = data.map((object: any, index: number) => {
            let coordinatePair: any = {};
            if(object.hasOwnProperty(xAxisValue)) {
                coordinatePair[xAxisValue] = object[xAxisValue]
            }
            if(object.hasOwnProperty(yAxisValue)) {
                coordinatePair[yAxisValue] = object[yAxisValue]
            }
            return coordinatePair;
        })
        const graphInnerDataWrapper: ScatterChartSeries[] = [
            {
                color: 'blue.5',
                name:"Group1",
                data: graphInnerData
            }
        ]

        setGraphData(graphInnerDataWrapper)

        console.log(graphData)
        
    }

    const getGreatest = (arr: any, property: string) => {
        if(arr.length === 0) {
            return 1
        }
        
        let greatest = arr[0][property]
        arr.forEach((obj: any) => {
            if(obj[property] > greatest) {
                greatest = obj[property]
            }
        })
        return greatest
    }

    const getLowest = (arr: any, property: string) => {
        if(arr.length === 0) {
            return 0
        }
        let lowest = arr[0][property]
        arr.forEach((obj: any) => {
            if(obj[property] < lowest) {
                lowest = obj[property]
            }
        })
        return lowest
    }


    return (
        <Container py="md" h="100%">
            <Center h="100%">
                <Flex direction="row" gap="xl" align="center" justify="center">
                    <Flex direction="column" gap="md">
                        <Flex direction="row" gap="md">
                            <Select 
                                placeholder="Select Make"
                                data={makeData} 
                                searchable
                                onChange={(value, option) => { setMakeValue(value); value != null ? setModelSelectDisabled(false) : setModelSelectDisabled(true) }}
                                />
                            <Select 
                                disabled={modelSelectDisabled} 
                                placeholder="Select Model" 
                                data={modelData} 
                                searchable
                                onChange={(value, option) => { setModelValue(value); }}
                                />
                            <Select 
                                placeholder="Start Date" 
                                data={(startDateData.map((value, index) => {return String(value)}))} 
                                searchable
                                onChange={(value, option) => { setStartDate(value ? parseInt(value) : 0); }}
                                />
                            <Select 
                                placeholder="End Date" 
                                data={(endDateData.map((value, index) => {return String(value)}))} 
                                searchable
                                onChange={(value, option) => { setEndDate(value ? parseInt(value) : 0); }}
                                />
                            <Button onClick={generateGraph}>Generate</Button>
                        </Flex>
                        <ScatterChart
                                w="full"
                                h="550"
                                data={graphData}
                                dataKey={{ x: xAxisValue, y: yAxisValue }}
                                xAxisProps={{ domain: [getLowest(graphData[0].data, xAxisValue), getGreatest(graphData[0].data, xAxisValue)] }}
                                xAxisLabel={xAxisValue}
                                yAxisLabel={yAxisValue}
                        />
                    </Flex>
                    <Flex direction="column" gap="md">
                        <Text>Hello, more data!</Text>
                        <Text>More data!</Text>
                    </Flex>
                </Flex>
            </Center>
        </Container>
    )
}

export default AggregatePage