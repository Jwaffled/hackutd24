import React, { useEffect, useState } from 'react';
import { ScatterChart } from '@mantine/charts';
import { Paper, Container, Select, Space, Text, Button } from '@mantine/core';
import { fetchMakes, fetchModels, fetchYears } from '../../utils';

// Data for the scatter plot
const data = [
  {
    color: 'blue.5',
    name: 'Group 1',
    data: [
      { MPG: 25, BMI: 20 },
      { MPG: 30, BMI: 22 },
      { MPG: 35, BMI: 18 },
      { MPG: 40, BMI: 25 },
      { MPG: 45, BMI: 30 },
      { MPG: 28, BMI: 15 },
      { MPG: 22, BMI: 12 },
      { MPG: 50, BMI: 28 },
      { MPG: 32, BMI: 19 },
      { MPG: 48, BMI: 31 },
      { MPG: 26, BMI: 24 },
    ],
  },
];


function ModelPage() {
  const [yearData, setYearData] = useState<Array<{ value: string, label: string }> | null>(null);
  const [yearValue, setYearValue] = useState<string | null>(null);
  const [makeData, setMakeData] = useState<Array<{ value: string, label: string }> | null>(null);
  const [makeValue, setMakeValue] = useState<string | null>(null);
  const [modelData, setModelData] = useState<Array<{ value: string, label: string }> | null>(null);
  const [modelValue, setModelValue] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchData = async () => {
      if (makeValue) {
        const modelData = await fetchModels(makeValue, yearValue);
        setModelData(modelData);
      }
    }
    fetchData();
  }, [makeValue, yearValue]);

  return (
    <Container size="lg" py="xl">
      {/* Dropdowns for Year, Brand, and Make */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
        <Select
          label="Year"
          onChange={setYearValue}
          data={yearData ?? []}
          placeholder="Select year"
          style={{ width: '150px' }}
        />
        <Select
          label="Make"
          onChange={setMakeValue}
          data={makeData ?? []}
          placeholder="Select brand"
          style={{ width: '150px' }}
        />
        <Select
          label="Model"
          onChange={setModelValue}
          data={modelData ?? []}
          placeholder="Select make"
          style={{ width: '150px' }}
        />
      </div>

      {/* Layout for the chart and text */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '40px' }}>
        {/* Scatter Plot */}
        <div style={{ flex: 1 }}>
          <ScatterChart
            h={250}  // Smaller height for the graph
            data={data}
            dataKey={{ x: 'MPG', y: 'BMI' }}
            xAxisLabel="MPG"
            yAxisLabel="Population Percentage"
          />
          {/* "Compare with" Button */}
          <Button style={{ marginTop: '20px' }} fullWidth>
            Compare with
          </Button>
        </div>

        {/* 7 Lines of Text */}
        <div style={{ flex: 1, paddingTop: '20px' }}>
          <Text>2016 Toyota Camry</Text>
          <Text>4 cyl - 1.8 cyl Engine</Text>
          <Text>32.2 avg mpg</Text>
          <Text>653 records found</Text>
          <Text>2.7 std dev</Text>
          <Text>1.5 variance</Text>
          <Text>34 median mpg</Text>
        </div>
      </div>
    </Container>
  );
}

export default ModelPage;
