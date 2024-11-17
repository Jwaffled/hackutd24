import React, { useEffect, useState } from 'react';
import { ScatterChart } from '@mantine/charts';
import { Paper, Container, Select, Space, Text, Button } from '@mantine/core';
import { fetchEntries, fetchMakes, fetchModels, fetchYears, IEntriesResponse } from '../../utils';

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
  const [modelValue, setModelValue] = useState<{vehicle_id: string, model: string} | null>(null);
  const [graphData, setGraphData] = useState<Array<GraphData>| null>(null);
  
  const [isModelDisabled, setModelDisabled] = useState(true);
  

  useEffect(() => {
    const fetchData = async () => {
      const yearData = await fetchYears(makeValue, modelValue?.model);
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
    const vehicleId = parseInt(modelValue?.vehicle_id ?? "");
    if (isNaN(vehicleId)) {
      return;
    }
    const entryData = await fetchEntries(vehicleId);
    const total = entryData.data?.length;
    const average = entryData.data?.reduce((accumulator, entry) => accumulator + parseFloat(entry.mpg.toString()), 0) / total;
    const stdDev = Math.sqrt(entryData.data?.map(x => Math.pow(parseFloat(x.mpg.toString()) - average, 2)).reduce((a, b) => a + b, 0) / total);
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

  return (
    <Container size="lg" py="xl">
      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
        <Select
          searchable
          label="Year"
          onChange={setYearValue}
          data={yearData ?? []}
          placeholder="Select year"
          style={{ width: '150px' }}
        />
        <Select
          searchable
          label="Make"
          onChange={setMakeValue}
          data={makeData ?? []}
          placeholder="Select brand"
          style={{ width: '150px' }}
        />
        <Select
          searchable
          label="Model"
          onChange={(value, options) => setModelValue({model: options?.label, vehicle_id: options?.value})}
          data={modelData ?? []}
          placeholder="Select make"
          style={{ width: '150px' }}
        />
        <Button onClick={generateGraph}>
          Generate Graph
        </Button>
      </div>

      {/* Layout for the chart and text */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '40px' }}>
        {/* Scatter Plot */}
        <div style={{ flex: 1 }}>
          <ScatterChart
            h={250}  // Smaller height for the graph
            data={graphData ?? [{name: "", data: [], color: ""}]}
            dataKey={{ y: 'probability', x: 'mpg' }}
            xAxisLabel="MPG"
            yAxisLabel="Percentage"
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
