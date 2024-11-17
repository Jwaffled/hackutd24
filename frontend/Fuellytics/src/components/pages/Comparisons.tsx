import React, { useEffect, useState } from 'react';

import { ScatterChart } from '@mantine/charts';
import { Button, Card, Container, Grid, Paper, Select } from '@mantine/core';
import { fetchYears, fetchMakes, fetchEntriesByYear, fetchModels, IEntriesResponse } from '../../utils';

type DataItem = {
  value: string;
  label: string;
};

type ModelType = {
  [key: string]: DataItem[];
};

// Mock data and fetch functions
const mockYears: DataItem[] = Array.from({ length: 10 }, (_, i) => ({
  value: String(2024 - i),
  label: String(2024 - i)
}));

const mockMakes: DataItem[] = [
  { value: 'toyota', label: 'Toyota' },
  { value: 'honda', label: 'Honda' },
  { value: 'ford', label: 'Ford' },
  { value: 'chevrolet', label: 'Chevrolet' },
  { value: 'bmw', label: 'BMW' }
];

const mockModels: ModelType = {
  toyota: [
    { value: 'camry', label: 'Camry' },
    { value: 'corolla', label: 'Corolla' },
    { value: 'rav4', label: 'RAV4' }
  ],
  honda: [
    { value: 'civic', label: 'Civic' },
    { value: 'accord', label: 'Accord' },
    { value: 'crv', label: 'CR-V' }
  ],
  ford: [
    { value: 'f150', label: 'F-150' },
    { value: 'mustang', label: 'Mustang' },
    { value: 'escape', label: 'Escape' }
  ]
};

// Scatter plot data
const scatterData = [
  {
    color: 'blue.5',
    name: 'Vehicle 1',
    data: [
      { MPG: 25, BMI: 20 },
      { MPG: 30, BMI: 22 },
      { MPG: 35, BMI: 18 },
      { MPG: 40, BMI: 25 },
      { MPG: 45, BMI: 30 },
    ],
  },
  {
    color: 'red.5',
    name: 'Vehicle 2',
    data: [
      { MPG: 26, BMI: 21 },
      { MPG: 31, BMI: 24 },
      { MPG: 37, BMI: 19 },
      { MPG: 42, BMI: 27 },
      { MPG: 29, BMI: 32 },
    ],
  },
];

function calculateProbabilityDensity (x: number, mean: number, stdDev: number) {
  // Calculate the normal distribution PDF at point x
  const exponent = Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
  const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
  return coefficient * Math.exp(-exponent);
}

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

function ComparisonPage() {
  // State for Vehicle 1
  const [year1Data, setYear1Data] = useState<DataItem[]>([]);
  const [year1Value, setYear1Value] = useState<string>('');
  const [make1Data, setMake1Data] = useState<DataItem[]>([]);
  const [make1Value, setMake1Value] = useState<string>('');
  const [model1Data, setModel1Data] = useState<DataItem[]>([]);
  const [model1Value, setModel1Value] = useState<string>('');
  const [generatedVehicle1Data, setGeneratedVehicle1Data] = useState<IEntriesResponse | null>(null);
  const [average1Mpg, setAverage1Mpg] = useState<number>(0);
  const [stdDev1Mpg, setStdDev1Mpg] = useState<number>(0);

  // State for Vehicle 2
  const [year2Data, setYear2Data] = useState<DataItem[]>([]);
  const [year2Value, setYear2Value] = useState<string>('');
  const [make2Data, setMake2Data] = useState<DataItem[]>([]);
  const [make2Value, setMake2Value] = useState<string>('');
  const [model2Data, setModel2Data] = useState<DataItem[]>([]);
  const [model2Value, setModel2Value] = useState<string>('');
  const [average2Mpg, setAverage2Mpg] = useState<number>(0);
  const [stdDev2Mpg, setStdDev2Mpg] = useState<number>(0);
  const [generatedVehicle2Data, setGeneratedVehicle2Data] = useState<IEntriesResponse | null>(null);

  // Load initial data

  const [graphData, setGraphData] = useState<Array<GraphData>| null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const yearData = await fetchYears(make1Value, model1Value);
      setYear1Data(yearData);
    }
    fetchData();
  }, [make1Value, model1Value]);

  useEffect(() => {
    const fetchData = async () => {
      const makeData = await fetchMakes(year1Value);
      setMake1Data(makeData);
    }
    fetchData();
  }, [year1Value]);

  useEffect(() => {
    const fetchData = async () => {
      if (make1Value) {
        const modelData = await fetchModels(make1Value, year1Value);
        setModel1Data(modelData);
      }
    }
    fetchData();
  }, [make1Value, year1Value]);

    useEffect(() => {
    const fetchData = async () => {
      const yearData = await fetchYears(make2Value, model2Value);
      setYear2Data(yearData);
    }
    fetchData();
  }, [make2Value, model2Value]);

  useEffect(() => {
    const fetchData = async () => {
      const makeData = await fetchMakes(year2Value);
      setMake2Data(makeData);
    }
    fetchData();
  }, [year2Value]);

  useEffect(() => {
    const fetchData = async () => {
      if (make2Value) {
        const modelData = await fetchModels(make2Value, year2Value);
        setModel2Data(modelData);
      }
    }
    fetchData();
  }, [make2Value, year2Value]);

  const generateGraph = async () => {
    let addGraph1 = true;
    let addGraph2 = true;
    let graphData1;
    let graphData2;
    if (!year1Value || !make1Value || !model1Value) {
      addGraph1 = false;
    } else {
      const entryData1 = await fetchEntriesByYear(year1Value, make1Value, model1Value);
      setGeneratedVehicle1Data(entryData1);
      const total = entryData1.data?.length;
      if (total == 0) {
        addGraph1 = false;
      } else {

      }
      const average1 = entryData1.data?.reduce((accumulator, entry) => accumulator + parseFloat(entry.mpg.toString()), 0) / total;
      setAverage1Mpg(average1);
      const stdDev = Math.sqrt(entryData1.data?.map(x => Math.pow(parseFloat(x.mpg.toString()) - average1, 2)).reduce((a, b) => a + b, 0) / total);
      console.log(stdDev);
      setStdDev1Mpg(stdDev);
      const formatted = entryData1.data?.map((entry, index) => {
        const pdf = calculateProbabilityDensity(entry.mpg, average1, stdDev);
        const probability = pdf * 100;
        return { 
          mpg: entry.mpg,
          cylinders: entryData1.cylinders,
          displacement: entryData1.displacement,
          probability: probability,
          year: entryData1.year,
        };
      });
      graphData1 = {
        name: "Group 1",
        color: "blue.5",
        data: formatted
      };
    }

    if (!year2Value || !make2Value || !model2Value) {
      addGraph2 = false;
    } else {
      const entryData2 = await fetchEntriesByYear(year2Value, make2Value, model2Value);
      setGeneratedVehicle2Data(entryData2);
      const total2 = entryData2.data?.length;
      if (total2 == 0) {
        addGraph2 = false;
      }
      const average2 = entryData2.data?.reduce((accumulator, entry) => accumulator + parseFloat(entry.mpg.toString()), 0) / total2;
      setAverage2Mpg(average2);
      const stdDev2 = Math.sqrt(entryData2.data?.map(x => Math.pow(parseFloat(x.mpg.toString()) - average2, 2)).reduce((a, b) => a + b, 0) / total2);
      
      setStdDev2Mpg(stdDev2);
      const formatted2 = entryData2.data?.map((entry, index) => {
        const pdf = calculateProbabilityDensity(entry.mpg, average2, stdDev2);
        const probability = pdf * 100;
        return { 
          mpg: entry.mpg,
          cylinders: entryData2.cylinders,
          displacement: entryData2.displacement,
          probability: probability,
          year: entryData2.year,
        };
      });
      graphData2 = {
        name: "Group 2",
        color: "red.5",
        data: formatted2
      }
    }

    if (addGraph1 && addGraph2) {
      setGraphData([graphData1!, graphData2!]);
    } else if (addGraph1) {
      setGraphData([graphData1!])
    } else if (addGraph2) {
      setGraphData([graphData2!]);
    }
  }

  const StatItem = ({ label, value }: { label: string; value: string }) => (
    <Paper className="p-4 rounded-md border">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-medium">{value}</p>
    </Paper>
  );

  return (
    <Container className="py-8 max-w-7xl">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Vehicle Comparison</h1>

        {/* Filters Section */}
        <Grid className="mb-8">
          {/* Vehicle 1 Filters */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <h2 className="text-lg font-semibold mb-4">Vehicle 1</h2>
            <Grid>
              <Grid.Col span={4}>
                <Select
                  searchable
                  label="Year"
                  placeholder="Select year"
                  data={year1Data}
                  value={year1Value}
                  onChange={setYear1Value}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  searchable
                  label="Make"
                  placeholder="Select make"
                  data={make1Data}
                  value={make1Value}
                  onChange={setMake1Value}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  searchable
                  label="Model"
                  placeholder="Select model"
                  data={model1Data}
                  value={model1Value}
                  onChange={setModel1Value}
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          {/* Vehicle 2 Filters */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <h2 className="text-lg font-semibold mb-4">Vehicle 2</h2>
            <Grid>
              <Grid.Col span={4}>
                <Select
                  searchable
                  label="Year"
                  placeholder="Select year"
                  data={year2Data}
                  value={year2Value}
                  onChange={setYear2Value}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  searchable
                  label="Make"
                  placeholder="Select make"
                  data={make2Data}
                  value={make2Value}
                  onChange={setMake2Value}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  searchable
                  label="Model"
                  placeholder="Select model"
                  data={model2Data}
                  value={model2Value}
                  onChange={setModel2Value}
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>

        {/* Main Content */}
        <Grid>
          {/* Chart Section */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card>
              <h2 className="text-lg font-semibold mb-4">MPG Comparison</h2>
              <div className="h-[300px]">
                <ScatterChart
                  h={250}
                  data={graphData ?? [{name: "", data: [], color: ""}]}
                  dataKey={{ x: 'mpg', y: 'probability' }}
                  xAxisLabel="MPG"
                  yAxisLabel="Percentage"
                />
                <Button 
                  fullWidth
                  onClick={generateGraph}>
                  Generate Graphs
                </Button>
              </div>
            </Card>
          </Grid.Col>

          {/* Stats Section */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Grid>
              {/* Vehicle 1 Stats */}
              <Grid.Col span={6}>
                <Card>
                  <h2 className="text-lg font-semibold mb-4">Vehicle 1 Details</h2>
                  <Grid>
                    <Grid.Col span={12}>
                      <StatItem label="Vehicle" value={generatedVehicle1Data?.year ? `${generatedVehicle1Data?.year} ${generatedVehicle1Data?.make} ${generatedVehicle1Data?.model}` : "Select a model"} />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <StatItem label="Engine" value={generatedVehicle1Data?.cylinders ? `${generatedVehicle1Data?.cylinders} cyl ${generatedVehicle1Data?.displacement} L` : "Select a model"} />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <StatItem label="Average MPG" value={average1Mpg !== 0 ? `${average1Mpg.toFixed(2)} Miles per Gallon` : "Select a model"} />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <StatItem label="Sample Size" value={`${generatedVehicle1Data?.recordsReturned ?? 0} records`} />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <StatItem label="Standard Deviation" value={stdDev1Mpg !== 0 || generatedVehicle1Data?.recordsReturned == 1 ? `${stdDev1Mpg.toFixed(2)} Miles per Gallon` : "Select a model"} />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <StatItem label="Variance" value={stdDev1Mpg !== 0 || generatedVehicle1Data?.recordsReturned == 1 ? `${Math.pow(stdDev1Mpg, 2).toFixed(2)} Miles^2 per Gallon^2` : "Select a model"} />
                    </Grid.Col>
                  </Grid>
                </Card>
              </Grid.Col>

              {/* Vehicle 2 Stats */}
              <Grid.Col span={6}>
                <Card>
                  <h2 className="text-lg font-semibold mb-4">Vehicle 2 Details</h2>
                  <Grid>
                    <Grid.Col span={12}>
                      <StatItem label="Vehicle" value={generatedVehicle2Data?.year ? `${generatedVehicle2Data?.year} ${generatedVehicle2Data?.make} ${generatedVehicle2Data?.model}` : "Select a model"} />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <StatItem label="Engine" value={generatedVehicle2Data?.cylinders ? `${generatedVehicle2Data?.cylinders} cyl ${generatedVehicle2Data?.displacement} L` : "Select a model"} />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <StatItem label="Average MPG" value={average2Mpg !== 0 ? `${average2Mpg.toFixed(2)} Miles per Gallon` : "Select a model"} />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <StatItem label="Sample Size" value={`${generatedVehicle2Data?.recordsReturned ?? 0} records`} />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <StatItem label="Standard Deviation" value={stdDev2Mpg !== 0 || generatedVehicle2Data?.recordsReturned == 1 ? `${stdDev2Mpg.toFixed(2)} Miles per Gallon` : "Select a model"} />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <StatItem label="Variance" value={stdDev2Mpg !== 0 || generatedVehicle2Data?.recordsReturned == 1 ? `${Math.pow(stdDev2Mpg, 2).toFixed(2)} Miles^2 per Gallon^2` : "Select a model"} />
                    </Grid.Col>
                  </Grid>
                </Card>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </Card>
    </Container>
  );
}

export default ComparisonPage;