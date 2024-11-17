import { Box, Card, Center, Container, Flex, Select, Text } from "@mantine/core";
import React, { useState } from "react";
import { ScatterChart } from "@mantine/charts";

const AggregatePage: React.FC = () => {
    const data = [
        {
            name: 'Group 1',
            color: 'blue.5',
            data: [
                { mpg: 15, displacement: 6.5 },
                { mpg: 16, displacement: 6.2 },
                { mpg: 19, displacement: 4.3 },
                { mpg: 26, displacement: 3.8 },
                { mpg: 27, displacement: 3.2 },
                { mpg: 18, displacement: 2.8 },
                { mpg: 31, displacement: 2.4 },
                { mpg: 35, displacement: 1.6 },
            ]
        }
    ];
    const [modelSelectDisabled, setModelSelectDisabled] = useState(true);
    const [makeValue, setMakeValue] = useState<string | null>(null);
    return (
        <Container py="md" h="100%">
            <Center h="100%">
                <Flex direction="row" gap="xl" align="center" justify="center">
                    <Flex direction="column" gap="md">
                        <Flex direction="row" gap="md">
                            <Select 
                                placeholder="Select Make"
                                data={['Test', 'Test 2']} 
                                searchable
                                onChange={(value, option) => { setMakeValue(value); value != null ? setModelSelectDisabled(false) : setModelSelectDisabled(true) }}/>
                            <Select disabled={modelSelectDisabled} placeholder="Select Model" data={['Test', 'Test 2']} searchable/>
                            <Select placeholder="Start Date" data={['Test', 'Test 2']} searchable/>
                            <Select placeholder="End Date" data={['Test', 'Test 2']} searchable/>
                        </Flex>
                        <ScatterChart
                                w="full"
                                h="550"
                                data={data}
                                dataKey={{ x: 'displacement', y: 'mpg' }}
                                xAxisLabel="Displacement"
                                yAxisLabel="MPG"
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