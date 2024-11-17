import React, { useEffect, useState } from 'react';
import { ScatterChart } from '@mantine/charts';
import { Paper, Container, Select, Space, Text, Button, Card, Grid } from '@mantine/core';
import { fetchEntries, fetchEntriesByYear, fetchMakes, fetchModels, fetchYears, IEntriesResponse } from '../../utils';
import { LineChart, ResponsiveContainer } from 'recharts';

// Data for the scatter plot
interface GraphData {
    name: string,
    color: string,
    data: Array<{
      mpg: number,
      cylinders: number,
      displacement: number,
      probability: number,
      year: number,
    }>
}

function calculateProbabilityDensity (x: number, mean: number, stdDev: number) {
  // Calculate the normal distribution PDF at point x
  const exponent = Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
  const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
  return coefficient * Math.exp(-exponent);
}


function ModelPage() {
  const [yearData, setYearData] = useState<Array<{ value: string, label: string }> | null>(null);
  const [yearValue, setYearValue] = useState<string | null>('');
  const [makeData, setMakeData] = useState<Array<{ value: string, label: string }> | null>(null);
  const [makeValue, setMakeValue] = useState<string | null>('');
  const [modelData, setModelData] = useState<Array<{ value: string, label: string }> | null>(null);
  const [modelValue, setModelValue] = useState<string | null>('');
  const [graphData, setGraphData] = useState<Array<GraphData>| null>(null);
  const [generatedVehicleData, setGeneratedVehicleData] = useState<IEntriesResponse | null>(null);
  const [averageMpg, setAverageMpg] = useState<number>(0);
  const [stdDevMpg, setStdDevMpg] = useState<number>(0);
  

  useEffect(() => {
    const fetchData = async () => {
      const yearData = await fetchYears(makeValue, modelValue);
      setYearData(yearData);
    }
    fetchData();
  }, [makeValue, modelValue]);

  useEffect(() => {
    const fetchData = async () => {
      const makeData = await fetchMakes(yearValue);
      setMakeData(makeData);
    }
    fetchData();
  }, [yearValue]);

  const generateGraph = async () => {
    if (!yearValue || !makeValue || !modelValue) {
      return;
    }
    const entryData = await fetchEntriesByYear(yearValue, makeValue, modelValue);
    setGeneratedVehicleData(entryData);
    const total = entryData.data?.length;
    if (total == 0) {
      return;
    }
    const average = entryData.data?.reduce((accumulator, entry) => accumulator + parseFloat(entry.mpg.toString()), 0) / total;
    setAverageMpg(average);
    const stdDev = Math.sqrt(entryData.data?.map(x => Math.pow(parseFloat(x.mpg.toString()) - average, 2)).reduce((a, b) => a + b, 0) / total);
    console.log(stdDev);
    setStdDevMpg(stdDev);
    const formatted = entryData.data?.map((entry, index) => {
      const pdf = calculateProbabilityDensity(entry.mpg, average, stdDev);
      const probability = pdf * 100;
      return { 
        mpg: entry.mpg,
        cylinders: entryData.cylinders,
        displacement: entryData.displacement,
        probability: probability,
        year: entryData.year,
      };
    });
    
    const graphData: GraphData = {
      name: "Group 1",
      color: "blue.5",
      data: formatted
    }

    setGraphData([graphData]);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (makeValue) {
        const modelData = await fetchModels(makeValue, yearValue);
        setModelData(modelData);
      }
    }
    fetchData();
  }, [makeValue, yearValue]);

  const StatItem = ({ label, value }: { label: string; value: string }) => (
    <Paper p="md" radius="md" withBorder>
      <Text size="sm" c="dimmed">{label}</Text>
      <Text fw={500} size="lg">{value}</Text>
    </Paper>
  );

  return (
    <Container w="100%" py="xl">
      <Card p="lg">
        <Text size="xl" fw={700} mb="lg">Vehicle MPG Analysis</Text>
        <Grid mb="xl">
          <Grid.Col span={{ base: 12, md: 3}}>
            <Select
              searchable
              label="Year"
              onChange={setYearValue}
              data={yearData ?? []}
              placeholder="Select year"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 3}}>
            <Select
              searchable
              label="Make"
              onChange={(value, options) => { setMakeValue(value); setModelValue(""); }}
              data={makeData ?? []}
              placeholder="Select brand"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 3}}>
            <Select
              searchable
              label="Model"
              onChange={(value, options) => setModelValue(options.value)}
              data={modelData ?? []}
              placeholder="Select make"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 3}}>
            <Button onClick={generateGraph}>
              Generate Graph
            </Button>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={{ base: 12, md: 6}}>
            <Card>
              <Text size="lg" fw={600} mb="md">MPG Distribution</Text>
              <div style={{ height: 300 }}>
                <ScatterChart
                  h="100%"  // Smaller height for the graph
                  data={graphData ?? [{name: "", data: [], color: ""}]}
                  dataKey={{ y: 'probability', x: 'mpg' }}
                  xAxisLabel="MPG"
                  yAxisLabel="Percentage"
                />
              </div>
              <Button fullWidth mt="md">
                Compare with another model
              </Button>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6}}>
            <Card>
              <Text size="lg" fw={600} mb="md">Vehicle Details</Text>
              <Grid>
                <Grid.Col span={12}>
                  <StatItem label="Vehicle" value={generatedVehicleData?.year ? `${generatedVehicleData?.year} ${generatedVehicleData?.make} ${generatedVehicleData?.model}` : "Select a model"} />
                </Grid.Col>
                <Grid.Col span={12}>
                  <StatItem label="Engine" value={generatedVehicleData?.cylinders ? `${generatedVehicleData?.cylinders} cyl ${generatedVehicleData?.displacement} L` : "Select a model"} />
                </Grid.Col>
                <Grid.Col span={12}>
                  <StatItem label="Average MPG" value={averageMpg !== 0 ? `${averageMpg.toFixed(2)} Miles per Gallon` : "Select a model"} />
                </Grid.Col>
                <Grid.Col span={12}>
                  <StatItem label="Sample Size" value={`${generatedVehicleData?.recordsReturned ?? 0} records`} />
                </Grid.Col>
                <Grid.Col span={12}>
                  <StatItem label="Standard Deviation" value={stdDevMpg !== 0 || generatedVehicleData?.recordsReturned == 1 ? `${stdDevMpg.toFixed(2)} Miles per Gallon` : "Select a model"} />
                </Grid.Col>
                <Grid.Col span={12}>
                  <StatItem label="Variance" value={stdDevMpg !== 0 || generatedVehicleData?.recordsReturned == 1 ? `${Math.pow(stdDevMpg, 2).toFixed(2)} Miles^2 per Gallon^2` : "Select a model"} />
                </Grid.Col>
              </Grid>
            </Card>
          </Grid.Col>
        </Grid>
      </Card>
    </Container>
  );
}

export default ModelPage;
