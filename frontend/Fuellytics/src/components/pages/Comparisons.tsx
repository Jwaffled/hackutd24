import React, { useEffect, useState } from 'react';

import { ScatterChart } from '@mantine/charts';
import { Card, Container, Grid, Paper, Select } from '@mantine/core';

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

// Mock fetch functions
const fetchYears = async (): Promise<DataItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockYears;
};

const fetchMakes = async (): Promise<DataItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockMakes;
};

const fetchModels = async (make: string): Promise<DataItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockModels[make] || [];
};

function ComparisonPage() {
  // State for Vehicle 1
  const [year1Data, setYear1Data] = useState<DataItem[]>([]);
  const [year1Value, setYear1Value] = useState<string>('');
  const [make1Data, setMake1Data] = useState<DataItem[]>([]);
  const [make1Value, setMake1Value] = useState<string>('');
  const [model1Data, setModel1Data] = useState<DataItem[]>([]);
  const [model1Value, setModel1Value] = useState<string>('');

  // State for Vehicle 2
  const [year2Data, setYear2Data] = useState<DataItem[]>([]);
  const [year2Value, setYear2Value] = useState<string>('');
  const [make2Data, setMake2Data] = useState<DataItem[]>([]);
  const [make2Value, setMake2Value] = useState<string>('');
  const [model2Data, setModel2Data] = useState<DataItem[]>([]);
  const [model2Value, setModel2Value] = useState<string>('');

  // Load initial data
  useEffect(() => {
    const loadYears = async () => {
      const years = await fetchYears();
      setYear1Data(years);
      setYear2Data(years);
    };
    loadYears();
  }, []);

  // Load makes when year is selected
  useEffect(() => {
    const loadMakes = async () => {
      const makes = await fetchMakes();
      setMake1Data(makes);
      setMake2Data(makes);
    };
    if (year1Value) loadMakes();
  }, [year1Value]);

  // Load models when make is selected
  useEffect(() => {
    const loadModels = async () => {
      if (make1Value) {
        const models = await fetchModels(make1Value);
        setModel1Data(models);
      }
      if (make2Value) {
        const models = await fetchModels(make2Value);
        setModel2Data(models);
      }
    };
    loadModels();
  }, [make1Value, make2Value]);

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
                  label="Year"
                  placeholder="Select year"
                  data={year1Data}
                  value={year1Value}
                  onChange={setYear1Value}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  label="Make"
                  placeholder="Select make"
                  data={make1Data}
                  value={make1Value}
                  onChange={setMake1Value}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
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
                  label="Year"
                  placeholder="Select year"
                  data={year2Data}
                  value={year2Value}
                  onChange={setYear2Value}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  label="Make"
                  placeholder="Select make"
                  data={make2Data}
                  value={make2Value}
                  onChange={setMake2Value}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
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
                  data={scatterData}
                  dataKey={{ x: 'MPG', y: 'BMI' }}
                  xAxisLabel="MPG"
                  yAxisLabel="Population Percentage"
                />
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
                      <StatItem label="Vehicle" value="2016 Toyota Camry" />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <StatItem label="Engine" value="4 cyl - 1.8L" />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <StatItem label="Average MPG" value="32.2 mpg" />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <StatItem label="Sample Size" value="653 records" />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <StatItem label="Standard Deviation" value="2.7" />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <StatItem label="Variance" value="1.5" />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <StatItem label="Median MPG" value="34 mpg" />
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
                      <StatItem label="Vehicle" value="2016 Toyota RAV4" />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <StatItem label="Engine" value="4 cyl - 2.0L" />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <StatItem label="Average MPG" value="28.0 mpg" />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <StatItem label="Sample Size" value="450 records" />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <StatItem label="Standard Deviation" value="2.3" />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <StatItem label="Variance" value="1.1" />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <StatItem label="Median MPG" value="29 mpg" />
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