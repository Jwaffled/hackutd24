import { MantineProvider } from '@mantine/core';
import React from 'react';
import HomePage from './components/pages/HomePage';
import ScatterChartDemo from './ScatterChartDemo';

const App: React.FC = () => {
  return (
    <div id="root">
      <HomePage/>
    </div>
  );
};

export default App;